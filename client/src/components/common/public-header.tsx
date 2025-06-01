"use client"
import { Disclosure, Menu } from "@headlessui/react"
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { ModeToggle } from "../theme-toggle"
import { Award, Shield, FileCheck, Users, LogIn, UserPlus, LayoutDashboard } from "lucide-react"

export default function PublicHeader() {
  const [isPending, setIsPending] = useState<boolean>(false)
  const { loading, auth } = useAuth()

  const navigation = [
    { name: "About", href: "/about" },
    { name: "Features", href: "#features" },
    { name: "Verify Certificate", href: "/verify" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-800">
      <Disclosure as="nav">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
                  <Award className="h-6 w-6" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold">
                    <span className="text-blue-600">CHAIN</span>
                    <span className="text-gray-900 dark:text-white ml-1">CERTS</span>
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Blockchain Certificates</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {!auth ? (
                <>
                  <Link href="/auth/register">
                    <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                </>
              ) : (
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Users className="h-4 w-4" />
                    </div>
                    <span>Account</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard"
                            className={`flex items-center px-4 py-2 text-sm ${
                              active
                                ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            <LayoutDashboard className="h-4 w-4 mr-3" />
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={`flex items-center px-4 py-2 text-sm ${
                              active
                                ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            <Users className="h-4 w-4 mr-3" />
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/api/account/logout"
                            className={`flex items-center px-4 py-2 text-sm ${
                              active
                                ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            <LogIn className="h-4 w-4 mr-3" />
                            Sign Out
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              )}

              <ModeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ModeToggle />
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-colors">
                {({ open }) => (
                  <>
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </>
                )}
              </Disclosure.Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <Disclosure.Panel className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            {/* Mobile Navigation Links */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              {!auth ? (
                <div className="space-y-3">
                  <Link href="/auth/register" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Create Account
                    </Button>
                  </Link>
                  <Link href="/auth/login" className="block">
                    <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
                  >
                    <LayoutDashboard className="h-5 w-5 mr-3" />
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
                  >
                    <Users className="h-5 w-5 mr-3" />
                    Profile
                  </Link>
                  <Link
                    href="/api/account/logout"
                    className="flex items-center rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
                  >
                    <LogIn className="h-5 w-5 mr-3" />
                    Sign Out
                  </Link>
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Shield className="h-3 w-3 mr-1" />
                  Secure
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  <FileCheck className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}
