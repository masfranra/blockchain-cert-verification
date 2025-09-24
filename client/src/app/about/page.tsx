import { Metadata } from "next"
import PublicHeader from "@/components/common/public-header"
import PublicFooter from "@/components/common/public-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Award,
  Shield,
  Users,
  Globe,
  Zap,
  Lock,
  FileCheck,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Target,
  Heart,
  Lightbulb,
  TrendingUp,
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Chain Certs - Blockchain Certificate Platform",
  description: "Learn about Chain Certs, the leading blockchain-based certificate platform that provides secure, verifiable, and tamper-proof digital certificates for organizations worldwide.",
  keywords: "blockchain certificates, digital credentials, certificate verification, secure certificates, Chain Certs",
}

export default function AboutPage() {
  return (
    <>
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mb-6">
              About Chain Certs
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Revolutionizing Digital
              <span className="text-blue-600"> Certificates</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We're building the future of credential verification through blockchain technology, 
              ensuring every certificate is secure, verifiable, and trusted worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/features">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                To eliminate certificate fraud and build trust in digital credentials through 
                cutting-edge blockchain technology and user-friendly verification systems.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    A world where every digital certificate is instantly verifiable, 
                    tamper-proof, and universally trusted.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Our Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Security, transparency, and accessibility are at the core of 
                    everything we build and every decision we make.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We continuously push the boundaries of what's possible in 
                    digital credential verification and blockchain technology.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-6 text-gray-600">
                  <p>
                    Chain Certs was born from a simple observation: traditional certificates are 
                    easily forged, difficult to verify, and lack the security needed in our 
                    digital world. We saw the potential of blockchain technology to solve these 
                    fundamental problems.
                  </p>
                  <p>
                    Founded by a team of blockchain experts, educators, and security professionals, 
                    we set out to create a platform that would make digital certificates as 
                    trustworthy as physical ones, but with the convenience and accessibility 
                    of digital technology.
                  </p>
                  <p>
                    Today, we're proud to serve thousands of organizations worldwide, from 
                    educational institutions to corporate training programs, helping them 
                    issue credentials that recipients can trust and employers can verify instantly.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">50K+</div>
                        <div className="text-blue-100">Certificates Issued</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <Globe className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">500+</div>
                        <div className="text-blue-100">Organizations</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <Shield className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">98.9%</div>
                        <div className="text-blue-100">Verification Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Built on Cutting-Edge Technology</h2>
              <p className="text-xl text-gray-600">
                Our platform leverages the latest in blockchain, IPFS, and web technologies 
                to ensure maximum security and reliability.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Lock className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Blockchain Security</CardTitle>
                  <CardDescription>
                    Every certificate is permanently recorded on the blockchain, 
                    making it impossible to forge or tamper with.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>IPFS Storage</CardTitle>
                  <CardDescription>
                    Certificate data is stored on the InterPlanetary File System 
                    for decentralized, permanent access.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Instant Verification</CardTitle>
                  <CardDescription>
                    Verify any certificate in seconds using QR codes or 
                    certificate ID lookup.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Mobile-First Design</CardTitle>
                  <CardDescription>
                    Fully responsive platform that works perfectly on 
                    all devices and screen sizes.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <FileCheck className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle>Custom Templates</CardTitle>
                  <CardDescription>
                    Professional, customizable certificate templates 
                    that reflect your brand identity.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle>Bulk Operations</CardTitle>
                  <CardDescription>
                    Issue hundreds of certificates at once with our 
                    efficient bulk import and generation tools.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
              <p className="text-xl text-gray-600">
                We're a diverse team of blockchain experts, security professionals, 
                and user experience designers working together to build the future of digital credentials.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle>Blockchain Engineers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Experts in smart contracts, IPFS, and distributed systems 
                    ensuring maximum security and reliability.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle>Security Specialists</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Cybersecurity professionals focused on protecting 
                    your data and ensuring platform integrity.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle>UX Designers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    User experience experts making complex blockchain 
                    technology simple and intuitive for everyone.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Join the Future of Digital Certificates?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start issuing secure, verifiable certificates today and join thousands of 
              organizations worldwide who trust Chain Certs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  )
}
