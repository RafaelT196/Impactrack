import { API_BASE } from './config';

export interface CompanyResponse {
  id: number;
  name: string;
  description: string;
  logo: string | null;
  esgScore: number;
  environmental: number;
  social: number;
  governance: number;
  category: string;
  highlighted: boolean;
  criteria?: Record<string, string> | null;
  alerts?: string[] | null;
}

export interface CompanyRequest {
  name: string;
  category: string;
  description: string;
  logo?: string;
  environmental: number;
  social: number;
  governance: number;
  highlighted?: boolean;
  criteria?: {
    emissions?: string;
    renewable?: string;
    diversity?: string;
    labor?: string;
    transparency?: string;
  };
  alerts?: string[];
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  if (res.status === 204 || res.headers.get('content-length') === '0') return undefined as T;
  return res.json();
}

export async function fetchCompanies(): Promise<CompanyResponse[]> {
  const res = await fetch(`${API_BASE}/api/companies`);
  return handleResponse<CompanyResponse[]>(res);
}

export async function createCompany(body: CompanyRequest): Promise<CompanyResponse> {
  const res = await fetch(`${API_BASE}/api/companies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleResponse<CompanyResponse>(res);
}

export async function toggleDestaque(id: number): Promise<CompanyResponse> {
  const res = await fetch(`${API_BASE}/api/companies/${id}/destaque`, {
    method: 'PATCH',
  });
  return handleResponse<CompanyResponse>(res);
}

export async function deleteCompany(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/companies/${id}`, {
    method: 'DELETE',
  });
  await handleResponse<void>(res);
}
