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
  Download,
  Upload,
  QrCode,
  Search,
  BarChart3,
  Settings,
  Clock,
  Star,
  Eye,
  Database,
  Cloud,
  Key,
  Smartphone as Mobile,
  Monitor,
  Tablet,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Features - Chain Certs | Blockchain Certificate Platform",
  description: "Discover all the powerful features of Chain Certs - from blockchain security and instant verification to custom templates and bulk operations. See why thousands trust our platform.",
  keywords: "certificate features, blockchain security, digital credentials, verification, templates, bulk operations",
}

export default function FeaturesPage() {
  return (
    <>
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mb-6">
              Platform Features
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Powerful Features for
              <span className="text-blue-600"> Modern Certificates</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Everything you need to create, manage, and verify digital certificates with 
              enterprise-grade security and user-friendly tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Core Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built with cutting-edge technology to ensure your certificates are secure, 
                verifiable, and trusted worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <Lock className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Blockchain Security</CardTitle>
                  <CardDescription>
                    Every certificate is permanently recorded on the blockchain, making it 
                    impossible to forge or tamper with. Your credentials are protected by 
                    the same technology that secures cryptocurrencies.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Immutable record keeping
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Cryptographic verification
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Decentralized storage
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Instant Verification</CardTitle>
                  <CardDescription>
                    Verify any certificate in seconds using QR codes, certificate IDs, 
                    or our verification API. No complex processes or waiting times.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      QR code scanning
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      ID lookup
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      API integration
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <FileCheck className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Custom Templates</CardTitle>
                  <CardDescription>
                    Choose from professional templates or create your own branded 
                    certificate designs. Full customization control over colors, fonts, 
                    and layouts.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Professional templates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Brand customization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Logo integration
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                    <Globe className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>IPFS Storage</CardTitle>
                  <CardDescription>
                    Certificate data is stored on the InterPlanetary File System for 
                    decentralized, permanent access. Your certificates will always be 
                    available, even if our servers are down.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Decentralized storage
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Permanent availability
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Content addressing
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                    <Smartphone className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle>Mobile Responsive</CardTitle>
                  <CardDescription>
                    Fully responsive design that works perfectly on all devices and 
                    screen sizes. Recipients can view and share certificates from 
                    anywhere, on any device.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Mobile optimized
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Cross-platform
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Touch-friendly
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle>Bulk Operations</CardTitle>
                  <CardDescription>
                    Issue hundreds of certificates at once with our efficient bulk 
                    import and generation tools. Perfect for large organizations 
                    and educational institutions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      CSV import
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Batch processing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Progress tracking
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Advanced Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional-grade tools and integrations for enterprise users and 
                organizations with complex certificate management needs.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle>Analytics Dashboard</CardTitle>
                        <CardDescription>Track certificate performance and engagement</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Get detailed insights into your certificate program with comprehensive 
                      analytics including verification rates, recipient engagement, and 
                      geographic distribution.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Real-time statistics
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Export reports
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Custom metrics
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Settings className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle>API Integration</CardTitle>
                        <CardDescription>Seamlessly integrate with your existing systems</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Powerful REST API allows you to integrate certificate management 
                      into your existing workflows, learning management systems, or 
                      HR platforms.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        RESTful API
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Webhook support
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        SDK libraries
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Key className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle>Advanced Security</CardTitle>
                        <CardDescription>Enterprise-grade security features</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Multi-layer security including encryption, access controls, 
                      audit logs, and compliance features to meet enterprise requirements.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        End-to-end encryption
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Role-based access
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Audit trails
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <CardTitle>Automated Workflows</CardTitle>
                        <CardDescription>Streamline your certificate processes</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Set up automated workflows for certificate issuance, renewal 
                      notifications, and verification processes to save time and 
                      reduce manual work.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Auto-issuance
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Email notifications
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Renewal reminders
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Compatibility Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Works Everywhere</h2>
              <p className="text-xl text-gray-600">
                Your certificates look perfect and function flawlessly on all devices 
                and platforms.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Monitor className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Desktop</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Full-featured experience on Windows, Mac, and Linux with 
                    all advanced features available.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mobile className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Mobile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Optimized for iOS and Android with touch-friendly interface 
                    and mobile-specific features.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Tablet className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Tablet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Perfect balance of desktop power and mobile convenience 
                    for iPad and Android tablets.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose the plan that fits your needs. All plans include core features 
              with no hidden fees or setup costs.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">$0<span className="text-lg text-gray-500">/month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      10 certificates/month
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Basic templates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      QR code verification
                    </li>
                  </ul>
                  <Link href="/auth/register">
                    <Button variant="outline" className="w-full">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg ring-2 ring-blue-600">
                <CardHeader>
                  <CardTitle>Professional</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">$29<span className="text-lg text-gray-500">/month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      500 certificates/month
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Custom templates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Analytics dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      API access
                    </li>
                  </ul>
                  <Link href="/auth/register">
                    <Button className="w-full">Start Free Trial</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="text-3xl font-bold text-blue-600">Custom</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Unlimited certificates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      White-label solution
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Priority support
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Custom integrations
                    </li>
                  </ul>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">Contact Sales</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
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
