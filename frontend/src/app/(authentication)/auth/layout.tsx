import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google"
import PublicHeader from "@/components/common/public-header";
import authenticated from "@/lib/authenticated";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Chain Certs",
  description: "Immutability",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isAuth = await authenticated()

  if(isAuth){
    redirect("/dashboard")
  }

  return (
      <>
      <PublicHeader />
        {children}
      {/* <PublicFooter /> */}
    </>
              
             
  );
}