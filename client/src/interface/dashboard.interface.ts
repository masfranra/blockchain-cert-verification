export interface DashboardStats {
  total_certificates: number;
  verified_certificates: number;
  unique_recipients: number;
  this_month_certificates: number;
  this_month_growth: number;
  verification_rate: number;
  unique_courses: number;
}

export interface Certificate {
  id: string;
  recipient: string;
  course: string;
  issued_by: string;
  issue_date: string;
  status: 'verified' | 'pending';
  ipfs_cid: string;
  ipfs_url?: string;
}

export interface RecentCertificatesResponse {
  certificates: Certificate[];
  total_count: number;
}