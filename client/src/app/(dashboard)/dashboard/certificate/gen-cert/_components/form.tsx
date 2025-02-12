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
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import { useSearchParams } from "next/navigation";
import CardWrapper from "@/components/common/card-wrapper";
import Link from "next/link";
import { ipfs_upload } from "../../ipfsupload";
import { createCertificate } from "../gen";
import { uploadToBackend } from "../../uploadtobackend";
import { handleStoreHash } from "../../blockchainUpload";



export default function CreateForm() {

      const searchParams = useSearchParams();
      const [error, setError] = useState<string | undefined>("");
      const [success, setSuccess] = useState("");
      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof certificateUpLoadSchema>>({
          resolver: zodResolver(certificateUpLoadSchema),
          defaultValues: {
            recipient_name: "",
            course_name: "",
            issued_by: "",
            duration_valid: ""
          },
      });


      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof certificateUpLoadSchema>) {
        setError("");
        setSuccess("");
        console.log("posting form data: ", values)
        startTransition( async () => {
          
          // call the certificate create function
          try {
            // Step 1: Call API to generate the certificate
            const certificateBlob = await createCertificate(values);
            
            // Handle errors if certificate creation fails
            if ("error" in certificateBlob) {
              console.error("Error:", certificateBlob.error);
              setError("Failed to generate certificate. Please try again.");
              return;
            }
          
            // Step 2: Simulate IPFS upload and generate an IPFS CID
            const ipfs_cid = "fjwhjfkjwfhwefffef"; // Replace with actual IPFS CID logic
          
            // Step 3: Prepare the updated values with IPFS CID
            const updatedValues = {
              ...values,
              ipfs_cid
            };
          
            // Step 4: Upload to Backend
            const documentResponse = await uploadToBackend(updatedValues);
           
            if (documentResponse.error) {
    
              setError(documentResponse.error['error']);
              return; // Exit the process if there is an error
            }
          
            // Step 5: Handle Blockchain interaction (store the hash)
            const blockchainResponse = await handleStoreHash(documentResponse["documentId"], ipfs_cid);
            console.log("Blockchain Response: ", blockchainResponse);
          
            // Step 6: If all steps succeed, initiate the download
            
            // Convert the certificate blob to a downloadable URL
            const url = window.URL.createObjectURL(certificateBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `certificate.pdf`; // Set the filename
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            
          
          } catch (error) {
            console.error("Download error:", error);
            setError("An error occurred while processing the certificate. Please try again.");
          }
          

         

          

        })
      }


   

    return (
      <>
          <CardWrapper title="Create a Certificate">
          
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            
        
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


                </>

                <FormError message={error} />

                <FormSuccess message={success} />

                <div>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full text-white dark:text-gray-900 bg-teal-800 dark:bg-white"
                  >
                   Create
                  </Button>
                </div>
              </form>
              </Form>
  
              
         
           
          </CardWrapper>
          {/* <SignIn /> */}
      </>
    )
  }
  