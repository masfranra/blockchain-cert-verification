"use client"
import {
  ArrowUpRight,
    Bell,
    Forward,
    Home,
    LineChart,
    Package,
    Package2,
    PlusCircleIcon,
    ShoppingCart,
    Users
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import logo from "@/assets/images/logo.jpg";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { User } from "@/interface/user.interface";
import { Skeleton } from "@/components/ui/skeleton";

export default function DesktopSidebar(){
    const pathname = usePathname()
    // const {user, loading} = useAccount()

    // if (loading){
    //   return <Skeleton />
    // }

    return <div className="hidden border-r bg-muted/40 md:block">
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src={logo} width={40} height={400} className="w-18 auto" alt="Reload Mobile" />
          <span className="">CHAIN CERTS</span>
        </Link>
        
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link
            href="/dashboard"
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", {"bg-muted text-primary": pathname === "/dashboard"})}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/certificate/gen-cert"
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", {"bg-muted text-primary": pathname === "/dashboard/deposit"})}
          >
            <PlusCircleIcon className="h-4 w-4" />
            Create a certificate
            
          </Link>
          <Link
            href="/certificate/verify"
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", {"bg-muted text-primary": pathname === "/dashboard/withdraw"})}
          >
            <ArrowUpRight className="h-4 w-4" />
            Verify certificate
          </Link>
          {/* <Link
            href="/dashboard/buy-airtime"
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", {"bg-muted text-primary": pathname === "/dashboard/buy-airtime"})}
          >
            <LineChart className="h-4 w-4" />
            Buy airtime &amp; data
          </Link> */}
          {/* {loading ? <Skeleton /> : <>
          {user?.package !== "NONE" && <Link
            href={`/dashboard/network/${user?.id}`}
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", {"bg-muted text-primary": pathname === "/dashboard/network"})}
          >
            <Users className="h-4 w-4" />
            My team
          </Link>}
          </>} */}
          {/* <Link
            href={`/dashboard/transfer`}
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", {"bg-muted text-primary": pathname === "/dashboard/network"})}
          >
            <Forward className="h-4 w-4" />
            Transfer
          </Link>
           */}
        </nav>
      </div>
      
    </div>
  </div>
}