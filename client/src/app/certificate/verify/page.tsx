"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { DBfetch } from "./verify"
import PublicHeader from "@/components/common/public-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, ExternalLink, Shield, User, BookOpen, Calendar, Hash } from "lucide-react"
import { handleRetrieveHash } from "@/app/(dashboard)/dashboard/certificate/blockchainUpload"

interface CertificateData {
  recipient: string
  course: string
  issued_by: string
  blockchain_verified: boolean
  ipfs_cid: string
  cert_id: string
  ipfsUrl: string
  message: string
}

const VerifyCertificate = () => {
  const searchParams = useSearchParams()
  const [verifying, setVerifying] = useState(true)
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const code = searchParams.get("code")

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!code) {
        setError("No verification code provided")
        setVerifying(false)
        return
      }

      try {
        setVerifying(true)
        const result = await DBfetch(code)
        console.log("Result", result)
        // if(result.ok){
        //   const blockchainverify = handleRetrieveHash(result.cert_id)
        //   console.log("blockchain: ",blockchainverify)
        // }

        if (result.error) {
          setError(result.error)
        } else {
          setCertificateData(result)
        }
      } catch (err) {
        setError("Failed to verify certificate")
        console.error("Verification error:", err)
      } finally {
        setVerifying(false)
      }
    }

    fetchCertificate()
  }, [code])

  const openIPFS = () => {
    if (certificateData?.ipfsUrl) {
      window.open(certificateData.ipfsUrl, "_blank")
    }
  }

  const printCertificate = () => {
    if (certificateData?.ipfsUrl) {
      // Open IPFS URL in a new window and trigger print
      const printWindow = window.open(certificateData.ipfsUrl, "_blank")
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print()
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate Verification</h1>
          <p className="text-gray-600">Verify the authenticity of your certificate</p>
        </div>

        {verifying && (
          <Card className="w-full">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Verifying certificate...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {error && !verifying && (
          <Card className="w-full border-red-200">
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-red-700 mb-2">Verification Failed</h2>
                <p className="text-red-600">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {certificateData && !verifying && !error && (
          <div className="space-y-6">
            {/* Verification Status */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="flex items-center justify-center py-6">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                  <h2 className="text-xl font-semibold text-green-800">Certificate Verified</h2>
                  <p className="text-green-700">{certificateData.message}</p>
                </div>
              </CardContent>
            </Card>

            {/* Certificate Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Certificate Details
                </CardTitle>
                <CardDescription>Official certificate information and verification status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Recipient Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Recipient</p>
                        <p className="text-lg font-semibold text-gray-900 capitalize">{certificateData.recipient}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Course</p>
                        <p className="text-lg font-semibold text-gray-900 capitalize">{certificateData.course}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Issued By</p>
                        <p className="text-lg font-semibold text-gray-900">{certificateData.issued_by}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">Blockchain Status</p>
                      <Badge
                        variant={certificateData.blockchain_verified ? "default" : "secondary"}
                        className="text-sm"
                      >
                        {certificateData.blockchain_verified ? "Blockchain Verified" : "Database Verified"}
                      </Badge>
                    </div>

                    <div className="flex items-start gap-3">
                      <Hash className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Certificate ID</p>
                        <p className="text-sm font-mono text-gray-700 break-all">{certificateData.cert_id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* IPFS Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">IPFS Storage</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">IPFS CID</p>
                        <p className="text-sm font-mono text-gray-700 break-all">{certificateData.ipfs_cid}</p>
                      </div>

                      <Button onClick={openIPFS} variant="outline" className="w-full sm:w-auto">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on IPFS
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Complete</CardTitle>
                <CardDescription>This certificate has been successfully verified and is authentic.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={printCertificate} variant="outline">
                    Print Certificate
                  </Button>
                  <Button
                    onClick={() =>
                      navigator.share?.({
                        title: "Certificate Verification",
                        url: window.location.href,
                      })
                    }
                    variant="outline"
                  >
                    Share Verification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyCertificate
