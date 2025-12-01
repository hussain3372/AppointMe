export interface Lead {
  id: string;
  tenantId: string;
  campaignId: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  phone: string;
  website: string;
  score: number;
  status: string;
  tags: string[];
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface LeadsResponse {
  leads: Lead[];
  pagination: Pagination;
}
