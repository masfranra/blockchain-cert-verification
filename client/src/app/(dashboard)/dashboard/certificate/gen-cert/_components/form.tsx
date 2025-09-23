"use client"
import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {  useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { certificateUpLoadSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { NotificationModal } from "@/components/common/notification-modal";
import { useSearchParams } from "next/navigation";
import CardWrapper from "@/components/common/card-wrapper";
import { ipfs_upload } from "../../ipfsupload";
import { createCertificate } from "../gen";
import { uploadToBackend } from "../../uploadtobackend";
import { handleStoreHash } from "../../blockchainUpload";
import { Loader2, CheckCircle, Upload, Database, Link as LinkIcon, Download } from "lucide-react";



export default function CreateForm() {

      const searchParams = useSearchParams();
      const [isPending, startTransition] = useTransition();
      const [imageFile, setImageFile] = useState<File>();
      const [currentStep, setCurrentStep] = useState<string>("");
      const [progress, setProgress] = useState(0);
      const [modal, setModal] = useState<{
        isOpen: boolean;
        type: "success" | "error" | "warning" | "info";
        title: string;
        message: string;
      }>({
        isOpen: false,
        type: "info",
        title: "",
        message: "",
      });

      const form = useForm<z.infer<typeof certificateUpLoadSchema>>({
          resolver: zodResolver(certificateUpLoadSchema),
          defaultValues: {
            recipient_name: "",
            course_name: "",
            issued_by: "",
            duration_valid: ""
          },
      });


       // Handle Image File Selection
      const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setImageFile(file);
      };

      // Helper function to show modal
      const showModal = (type: "success" | "error" | "warning" | "info", title: string, message: string) => {
        setModal({
          isOpen: true,
          type,
          title,
          message,
        });
      };

      // Helper function to close modal
      const closeModal = () => {
        setModal(prev => ({ ...prev, isOpen: false }));
      };


      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof certificateUpLoadSchema>) {
        setProgress(0);
        setCurrentStep("");
        startTransition( async () => {
          
          // call the certificate create function

          try {
            if(!imageFile) {
              showModal("error", "Image Required", "Please select an image file to continue.");
              return;
            }
            
            const createValues = {
              ...values,
              imageFile
            }
            
            // Step 1: Generate Certificate
            setCurrentStep("Generating certificate...");
            setProgress(20);
            const { blob: certificateBlob, certId } = await createCertificate(createValues);
            const cert_id = certId
            
            // Handle errors if certificate creation fails
            if (!certificateBlob) {
              showModal("error", "Certificate Generation Failed", "Failed to generate certificate. Please try again.");
              return;
            }
          
            // Step 2: Upload to IPFS
            setCurrentStep("Uploading to IPFS...");
            setProgress(40);
            const file = new File([certificateBlob], "certificate.pdf", { type: "application/pdf", lastModified: Date.now() });
            const ipfsResponse = await ipfs_upload(file);
            
            const ipfs_cid = ipfsResponse?.upload.IpfsHash ?? ""
            const ipfsUrl =  ipfsResponse?.ipfsUrl ?? ""

            if (!ipfs_cid && !ipfsUrl){
              showModal("error", "IPFS Upload Failed", "Failed to upload certificate to IPFS. Please try again.");
              return;
            }

            const updatedValues = {
              ...values,
              ipfs_cid,
              ipfsUrl,
              cert_id
            };
          
            // Step 3: Upload to Backend
            setCurrentStep("Saving to database...");
            setProgress(60);
            const documentResponse = await uploadToBackend(updatedValues);
           
            if (documentResponse.error) {
              showModal("error", "Database Error", documentResponse.error['error'] || "Failed to save certificate to database.");
              return; // Exit the process if there is an error
            }
          
            // Step 4: Store on Blockchain
            setCurrentStep("Storing on blockchain...");
            setProgress(80);
            const blockchainResponse = await handleStoreHash(documentResponse["documentId"], ipfs_cid);
          
            // Step 5: Prepare Download
            setCurrentStep("Preparing download...");
            setProgress(90);
            
            // Convert the certificate blob to a downloadable URL
            const url = window.URL.createObjectURL(certificateBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `certificate.pdf`; // Set the filename
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            
            // Step 6: Complete
            setCurrentStep("Certificate created successfully!");
            setProgress(100);
            showModal("success", "Certificate Created!", "Your certificate has been created and downloaded successfully!");
            
            // Reset after a delay
            setTimeout(() => {
              setCurrentStep("");
              setProgress(0);
            }, 2000);
          
          } catch (error) {
            showModal("error", "Processing Error", "An error occurred while processing the certificate. Please try again.");
            setCurrentStep("");
            setProgress(0);
          }
        })
      }


   

    return (
      <>
          <CardWrapper title="Create a Certificate">
          
            {/* Overlay Loader */}
            {isPending && (
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <Loader2 className="h-12 w-12 animate-spin text-teal-600 mx-auto" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-8 w-8 bg-teal-100 dark:bg-teal-900 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Creating Certificate
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {currentStep || "Please wait while we process your request..."}
                    </p>
                    <div className="w-48 mx-auto">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <div 
                          className="bg-teal-600 h-1 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative">

            
        
              <>
                  <div className="mt-1">

                  <FormField
                        control={form.control}
                        name="recipient_name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Recipient Name</FormLabel>
                            <FormControl>
                                <Input disabled={isPending}
                                  type="text" autoComplete="text" placeholder="" {...field} />
                            </FormControl>
                            
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                   
                  </div>
  
                  <div className="mt-1">
                    <FormField
                          control={form.control}
                          name="course_name"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Course Name</FormLabel>
                              <FormControl>
                                  <Input disabled={isPending}  type="text" autoComplete="text" placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                    
                    </div>
                    <div className="mt-1">
                    <FormField
                          control={form.control}
                          name="issued_by"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Issued By</FormLabel>
                              <FormControl>
                                  <Input disabled={isPending}  type="text" autoComplete="text" placeholder="" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                    
                    </div>
                    <div className="mt-1">
                    <FormField
                          control={form.control}
                          name="duration_valid"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel>Duration Valid</FormLabel>
                              <FormControl>
                                  <Input disabled={isPending}  type="text" autoComplete="text" placeholder="2 years" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />
                    
                    </div>
                    <div className="mt-4">
                  <FormLabel>Upload Image</FormLabel>
                  <Input type="file" accept="" disabled={isPending} onChange={handleImageChange} />
                </div>


                </>

                {/* Progress Indicator */}
                {isPending && (
                  <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {currentStep}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-teal-600 h-2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    
                    {/* Step Icons */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className={`flex items-center space-x-1 ${progress >= 20 ? 'text-teal-600' : ''}`}>
                        <Database className="h-3 w-3" />
                        <span>Generate</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${progress >= 40 ? 'text-teal-600' : ''}`}>
                        <Upload className="h-3 w-3" />
                        <span>IPFS</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${progress >= 60 ? 'text-teal-600' : ''}`}>
                        <Database className="h-3 w-3" />
                        <span>Database</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${progress >= 80 ? 'text-teal-600' : ''}`}>
                        <LinkIcon className="h-3 w-3" />
                        <span>Blockchain</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${progress >= 100 ? 'text-teal-600' : ''}`}>
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal for notifications */}
                <NotificationModal
                  isOpen={modal.isOpen}
                  onClose={closeModal}
                  type={modal.type}
                  title={modal.title}
                  message={modal.message}
                  autoClose={modal.type === "success"}
                  autoCloseDelay={3000}
                />

                <div>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full text-white dark:text-gray-900 bg-teal-800 dark:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{currentStep || "Processing..."}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Create Certificate</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
              </Form>
  
              
         
           
          </CardWrapper>
          {/* <SignIn /> */}
      </>
    )
  }
  