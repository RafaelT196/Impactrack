import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { Company } from '../App';
import * as companiesApi from '../api/companies';

const defaultCriteria = {
  emissions: '',
  renewable: '',
  diversity: '',
  labor: '',
  transparency: '',
};

function mapResponseToCompany(r: companiesApi.CompanyResponse): Company {
  const criteria = r.criteria ?? {};
  return {
    id: r.id,
    name: r.name,
    description: r.description ?? '',
    logo: r.logo ?? '',
    esgScore: r.esgScore,
    environmental: r.environmental,
    social: r.social,
    governance: r.governance,
    category: r.category,
    highlighted: r.highlighted ?? false,
    alerts: r.alerts ?? undefined,
    criteria: {
      emissions: criteria.emissions ?? defaultCriteria.emissions,
      renewable: criteria.renewable ?? defaultCriteria.renewable,
      diversity: criteria.diversity ?? defaultCriteria.diversity,
      labor: criteria.labor ?? defaultCriteria.labor,
      transparency: criteria.transparency ?? defaultCriteria.transparency,
    },
  };
}

type CompaniesContextValue = {
  companies: Company[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addCompany: (company: Omit<Company, 'id'>) => Promise<void>;
  deleteCompany: (id: number) => Promise<void>;
  toggleHighlight: (id: number) => Promise<void>;
};

const CompaniesContext = createContext<CompaniesContextValue | null>(null);

export function CompaniesProvider({ children }: { children: ReactNode }) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await companiesApi.fetchCompanies();
      setCompanies(list.map(mapResponseToCompany));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar empresas');
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const addCompany = useCallback(
    async (company: Omit<Company, 'id'>) => {
      setError(null);
      const body: companiesApi.CompanyRequest = {
        name: company.name,
        category: company.category,
        description: company.description,
        logo: company.logo || undefined,
        environmental: company.environmental,
        social: company.social,
        governance: company.governance,
        highlighted: company.highlighted ?? false,
        criteria: company.criteria,
        alerts: company.alerts,
      };
      const created = await companiesApi.createCompany(body);
      setCompanies((prev) => [...prev, mapResponseToCompany(created)]);
    },
    []
  );

  const deleteCompany = useCallback(async (id: number) => {
    setError(null);
    await companiesApi.deleteCompany(id);
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const toggleHighlight = useCallback(async (id: number) => {
    setError(null);
    const updated = await companiesApi.toggleDestaque(id);
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? mapResponseToCompany(updated) : c))
    );
  }, []);

  return (
    <CompaniesContext.Provider
      value={{
        companies,
        loading,
        error,
        refetch,
        addCompany,
        deleteCompany,
        toggleHighlight,
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
}

export function useCompanies() {
  const ctx = useContext(CompaniesContext);
  if (!ctx) throw new Error('useCompanies must be used within CompaniesProvider');
  return ctx;
}
