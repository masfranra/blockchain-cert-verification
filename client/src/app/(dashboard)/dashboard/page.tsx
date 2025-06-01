import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/interface/user.interface"
import { getUserConfig } from "@/lib/account"
import { formatCurrency } from "@/lib/utils"
import {
  Award,
  BarChart3,
  CheckCheck,
  Clock10Icon,
  Download,
  EllipsisVertical,
  FileCheck,
  FileText,
  PlusCircle,
  Search,
  Shield,
  Users,
} from "lucide-react"
import Link from "next/link"
import DesktopSidebar from "./_components/desktop-sidebar"
import RightHeader from "./_components/right-header"

// Mock data for certificates
const recentCertificates = [
  {
    id: "cert-1234",
    recipient: "John Doe",
    course: "Advanced Web Development",
    issueDate: "2025-05-28T10:30:00",
    status: "verified",
    ipfsCid: "bafybei...",
  },
  {
    id: "cert-1235",
    recipient: "Jane Smith",
    course: "Data Science Fundamentals",
    issueDate: "2025-05-27T14:15:00",
    status: "pending",
    ipfsCid: "bafybei...",
  },
  {
    id: "cert-1236",
    recipient: "Michael Johnson",
    course: "Blockchain Essentials",
    issueDate: "2025-05-26T09:45:00",
    status: "verified",
    ipfsCid: "bafybei...",
  },
  {
    id: "cert-1237",
    recipient: "Emily Williams",
    course: "UI/UX Design",
    issueDate: "2025-05-25T16:20:00",
    status: "verified",
    ipfsCid: "bafybei...",
  },
  {
    id: "cert-1238",
    recipient: "Robert Brown",
    course: "Cybersecurity Fundamentals",
    issueDate: "2025-05-24T11:10:00",
    status: "pending",
    ipfsCid: "bafybei...",
  },
]

export default async function Dashboard() {
  const userConfig = await getUserConfig<User>()
  const app_host = process.env.APP_URL as string
  const formatter = formatCurrency(userConfig?.wallet?.currency! ?? "USD")
  

  if (!userConfig) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Session Expired</h2>
          <p className="text-gray-600 mb-4">Please refresh the browser to continue</p>
          <Button>Refresh</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {!!userConfig && <DesktopSidebar />}
      <div className="flex flex-col">
        <RightHeader />
        <main className="flex flex-1 flex-col gap-6 p-4 lg:gap-8 lg:p-6 bg-gray-50/50">
          {/* Welcome Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Certificate Dashboard</h1>
            <p className="text-gray-500">Manage and track your certificates in one place</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <CardDescription>Total Certificates</CardDescription>
                    <CardTitle className="text-3xl">1,247</CardTitle>
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </div>
                  <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                    <FileText className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <CardDescription>Verified Certificates</CardDescription>
                    <CardTitle className="text-3xl">986</CardTitle>
                    <p className="text-xs text-green-600">98.5% verification rate</p>
                  </div>
                  <div className="rounded-full bg-green-100 p-3 text-green-600">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <CardDescription>Recipients</CardDescription>
                    <CardTitle className="text-3xl">892</CardTitle>
                    <p className="text-xs text-blue-600">Across 24 courses</p>
                  </div>
                  <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <CardDescription>This Month</CardDescription>
                    <CardTitle className="text-3xl">156</CardTitle>
                    <p className="text-xs text-green-600">+23% from last month</p>
                  </div>
                  <div className="rounded-full bg-orange-100 p-3 text-orange-600">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                    <PlusCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">Create Certificate</h3>
                    <p className="text-sm text-gray-500">Issue new certificates</p>
                  </div>
                  <Link href="/dashboard/certificate/gen-cert">
                    <Button className="w-full">Create New</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-full bg-green-100 p-3 text-green-600">
                    <Search className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">Verify Certificate</h3>
                    <p className="text-sm text-gray-500">Check certificate authenticity</p>
                  </div>
                  <Link href="/dashboard/verify">
                    <Button variant="outline" className="w-full">
                      Verify
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                    <FileCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">Manage Templates</h3>
                    <p className="text-sm text-gray-500">Design certificate templates</p>
                  </div>
                  <Link href="/dashboard/templates">
                    <Button variant="outline" className="w-full">
                      Templates
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-full bg-orange-100 p-3 text-orange-600">
                    <Download className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">Export Data</h3>
                    <p className="text-sm text-gray-500">Download certificate reports</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Certificates Table */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Recent Certificates</CardTitle>
                  <CardDescription>Manage and track your latest certificates</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Link href="/dashboard/certificates">
                    <Button size="sm">View All</Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate ID</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCertificates.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell className="font-mono text-xs">{cert.id}</TableCell>
                      <TableCell>{cert.recipient}</TableCell>
                      <TableCell>{cert.course}</TableCell>
                      <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {cert.status === "verified" ? (
                          <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-100">
                            <CheckCheck className="mr-1 h-3 w-3" /> Verified
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            <Clock10Icon className="mr-1 h-3 w-3" /> Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <EllipsisVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Download Certificate</DropdownMenuItem>
                            <DropdownMenuItem>Verify on Blockchain</DropdownMenuItem>
                            <DropdownMenuItem>Revoke Certificate</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Analytics Overview */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Certificate Distribution</CardTitle>
                <CardDescription>Certificates by course category</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[200px] flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="h-16 w-16 mx-auto mb-2 text-gray-300" />
                    <p>Analytics chart will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Latest system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { icon: Award, text: "New certificate issued to Emily Williams", time: "10 minutes ago" },
                    { icon: Shield, text: "Certificate #cert-1237 verified on blockchain", time: "1 hour ago" },
                    { icon: FileText, text: "New template 'Professional Course' created", time: "3 hours ago" },
                    { icon: Users, text: "Bulk import: 24 recipients added", time: "Yesterday" },
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="rounded-full bg-blue-50 p-1.5 text-blue-600">
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm">{activity.text}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
