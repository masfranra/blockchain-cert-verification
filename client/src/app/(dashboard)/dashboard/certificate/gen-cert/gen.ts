"use server"


import { API_URL } from "@/common/constants/api";
import { getErrorMessage } from "@/lib/errors";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { certificateUpLoadSchema } from "@/lib/schema";
import { z } from "zod";
import { getHeaders } from "@/lib/fetch";


export const createCertificate = async (data: any) => {
    const formData = new FormData();

    formData.append("recipient_name", data.recipient_name);
    formData.append("course_name", data.course_name);
    formData.append("issued_by", data.issued_by);
    formData.append("duration_valid", data.duration_valid);

    if (data.imageFile && data.imageFile) {
        formData.append("imageFile", data.imageFile); // Ensure it's a File object
    } else {
        console.error("No valid image file selected");
        return {error: "No valid image file selected"};
    }

    const res = await fetch(`${API_URL}/documents/create-certificate/`, {
        method: "POST",
        headers: await getHeaders(), // Do NOT set "Content-Type", browser will handle it
        body: formData
    });
    
    // const textResponse = await res.text()
    console.log("Data passed: : ", data);
    // const parsedRes = await res.json();
    const parsedRes = await res.blob();
    console.log("debug: ", parsedRes)

    if(res.status === 400){
        return {error: parsedRes}
    }
  
    if(!res.ok){
        return {error: getErrorMessage(parsedRes)}
    }
   

    return parsedRes;

}

