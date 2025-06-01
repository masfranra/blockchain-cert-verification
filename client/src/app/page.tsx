"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import PublicFooter from "@/components/common/public-footer"
import PublicHeader from "@/components/common/public-header"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import {
  Award,
  Shield,
  CheckCircle,
  Users,
  Globe,
  Zap,
  ArrowRight,
  Play,
  Star,
  Lock,
  FileCheck,
  Smartphone,
} from "lucide-react"

export default function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })])

  return (
    <>
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  🚀 Blockchain-Verified Certificates
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900">
                  Issue & Verify
                  <span className="text-blue-600"> Digital Certificates</span>
                  <br />
                  with Confidence
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Create tamper-proof, blockchain-verified certificates that recipients can share with pride. Our
                  platform ensures authenticity and builds trust in your credentials.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Create Certificate
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="auth/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Shield className="mr-2 h-4 w-4" />
                    Verify Certificate
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">Blockchain Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">IPFS Storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">Instant Verification</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="embla" ref={emblaRef}>
                <div className="embla__container h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <div className="embla__slide h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <Award className="h-24 w-24 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Professional Certificates</h3>
                      <p className="text-blue-100">Beautiful, customizable certificate templates</p>
                    </div>
                  </div>
                  <div className="embla__slide h-full bg-gradient-to-br from-green-600 to-teal-700 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <Shield className="h-24 w-24 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Blockchain Security</h3>
                      <p className="text-green-100">Tamper-proof verification on the blockchain</p>
                    </div>
                  </div>
                  <div className="embla__slide h-full bg-gradient-to-br from-purple-600 to-pink-700 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <Users className="h-24 w-24 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Trusted by Thousands</h3>
                      <p className="text-purple-100">Join organizations worldwide using our platform</p>
                    </div>
                  </div>
                  <div className="embla__slide h-full bg-gradient-to-br from-orange-600 to-red-700 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <Zap className="h-24 w-24 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Instant Verification</h3>
                      <p className="text-orange-100">Verify certificates in seconds with QR codes</p>
                    </div>
                  </div>
                  <div className="embla__slide h-full bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <Globe className="h-24 w-24 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Global Recognition</h3>
                      <p className="text-indigo-100">Certificates recognized worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Certificates Issued</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">98.9%</div>
              <div className="text-gray-600">Verification Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Organizations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Certificate Platform?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technology to ensure your certificates are secure, verifiable, and trusted
              worldwide.
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
                  Every certificate is secured on the blockchain, making it impossible to forge or tamper with.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Instant Verification</CardTitle>
                <CardDescription>
                  Verify any certificate in seconds using our QR code system or certificate ID lookup.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Custom Templates</CardTitle>
                <CardDescription>
                  Choose from professional templates or create your own branded certificate designs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Global Access</CardTitle>
                <CardDescription>
                  Recipients can access and share their certificates from anywhere in the world.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Mobile Friendly</CardTitle>
                <CardDescription>
                  Fully responsive design works perfectly on all devices and screen sizes.
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
                  Issue hundreds of certificates at once with our bulk import and generation tools.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Issuing Secure Certificates?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of organizations worldwide who trust our platform for their certification needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Trusted by Leading Organizations</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Education Director",
                company: "TechEdu Institute",
                content:
                  "This platform has revolutionized how we issue and verify certificates. The blockchain security gives us and our students complete confidence.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "HR Manager",
                company: "Global Corp",
                content:
                  "We've issued over 10,000 certificates through this platform. The verification process is seamless and builds trust with our employees.",
                rating: 5,
              },
              {
                name: "Dr. Emily Rodriguez",
                role: "Dean of Studies",
                company: "University of Excellence",
                content:
                  "The professional templates and easy customization make our certificates look amazing. Students love sharing them on social media.",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <Card key={i} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </>
  )
}
