import { DashboardStats, RecentCertificatesResponse } from "@/interface/dashboard.interface";
import { get } from "./fetch";

export const getDashboardStats = async (): Promise<DashboardStats | null> => {
    try {
        const response = await get<DashboardStats>("documents/dashboard-stats/");
        console.log("getDashboardStats response:", response);
        
        if (response.error) {
            console.error("getDashboardStats error:", response.error);
            return null;
        }
        
        return response.data;
    } catch (error) {
        console.error("getDashboardStats exception:", error);
        return null;
    }
};

export const getRecentCertificates = async (limit: number = 5): Promise<RecentCertificatesResponse | null> => {
    try {
        const response = await get<RecentCertificatesResponse>(`documents/recent-certificates/?limit=${limit}`);
        console.log("getRecentCertificates response:", response);
        
        if (response.error) {
            console.error("getRecentCertificates error:", response.error);
            return null;
        }
        
        return response.data;
    } catch (error) {
        console.error("getRecentCertificates exception:", error);
        return null;
    }
};