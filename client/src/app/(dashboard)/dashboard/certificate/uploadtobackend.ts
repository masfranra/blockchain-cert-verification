"use server"


import { API_URL } from "@/common/constants/api";
import { getErrorMessage } from "@/lib/errors";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { certificateUpLoadSchema } from "@/lib/schema";
import { z } from "zod";
import { getHeaders } from "@/lib/fetch";


export const uploadToBackend = async (data: z.infer<typeof certificateUpLoadSchema>) => {

    const res = await fetch(`${API_URL}/documents/upload/`, {
        method: "POST",
        headers: {"Content-Type": "application/json", ...(await getHeaders()) },
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
   

    return parsedRes;

}

