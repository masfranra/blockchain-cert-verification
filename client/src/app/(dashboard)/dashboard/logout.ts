"use server"
import { AUTHENTICATION_COOKIE, AUTHENTICATION_REFRESH_COOKIE } from "@/common/constants/auth-cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const staticLogout = async () => {
    (await cookies()).delete(AUTHENTICATION_COOKIE)
}


export default async function logout(){
    const cookieStore = await cookies();
    cookieStore.delete(AUTHENTICATION_COOKIE);
    cookieStore.delete(AUTHENTICATION_REFRESH_COOKIE);
    redirect("/auth/login");
}