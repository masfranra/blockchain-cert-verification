import { User } from "@/interface/user.interface";
import { get } from "./fetch"

export const getUserConfig = async <T>() => {
    try{
        const response = await get("auth/get-user-config/");
        console.log("getUserConfig response:", response);
        
        if (response.error) {
            console.error("getUserConfig error:", response.error);
            return null;
        }
        
        return response.data as T
    } catch(error){
        console.error("getUserConfig exception:", error);
        return null
    }
    
}

