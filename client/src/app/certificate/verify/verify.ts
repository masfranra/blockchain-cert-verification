"use server"


import { API_URL } from "@/common/constants/api";
import { getErrorMessage } from "@/lib/errors";


export const DBfetch = async (data: any) => {

    const res = await fetch(`${API_URL}/documents/verify-certificate?code=${data}`, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
    
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
   

    return parsedRes

}


