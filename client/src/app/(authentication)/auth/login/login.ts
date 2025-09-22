"use server"


import { API_URL } from "@/common/constants/api";
import { getErrorMessage } from "@/lib/errors";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginSchema } from "@/lib/schema";
import { z } from "zod";
import { AUTHENTICATION_COOKIE, AUTHENTICATION_REFRESH_COOKIE } from "@/common/constants/auth-cookie";

export const login = async (data: z.infer<typeof LoginSchema>) => {

    const res = await fetch(`${API_URL}/auth/login/`, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    // const textResponse = await res.text()
    // console.log("Text response: ", textResponse)
    const parsedRes = await res.json();
    console.log("debug: ", parsedRes)
    if(res.status === 400){
        return {error: parsedRes}
    }
    if(!res.ok){
        return {error: getErrorMessage(parsedRes)}
    }
    setAuthCookie(parsedRes);
    redirect("/dashboard")

    return {error: ""}

}


const setAuthCookie = async ({refresh, access}: {refresh: string, access: string}) => {
    const isProduction = process.env.NODE_ENV === 'production';

    if (access) {
        const cookieStore = await cookies(); // Use 'await' to resolve the Promise
        const accessTokenExp = jwtDecode(access).exp!;
        cookieStore.set({
            name: AUTHENTICATION_COOKIE,
            value: access,
            secure: isProduction, // Only secure in production
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(accessTokenExp * 1000),
            path: '/',
        });
    }
    
    if (refresh) {
        const cookieStore = await cookies(); // Use 'await' to resolve the Promise
        const refreshTokenExp = jwtDecode(refresh).exp!;
        cookieStore.set({
            name: AUTHENTICATION_REFRESH_COOKIE,
            value: refresh,
            secure: isProduction, // Only secure in production
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(refreshTokenExp * 1000),
            path: '/',
        });
    }

}