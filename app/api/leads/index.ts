import { apiClient } from "../client";
import { LeadsResponse } from "./types";

export const leadsApi = {
  getLeads: () => apiClient.get<LeadsResponse>(`/leads`),
};
