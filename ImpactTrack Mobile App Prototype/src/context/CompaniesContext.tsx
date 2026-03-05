import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Company } from '../App';
import { mockCompanies } from '../components/mockData';

type CompaniesContextValue = {
  companies: Company[];
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
  addCompany: (company: Omit<Company, 'id'>) => void;
  toggleHighlight: (id: number) => void;
};

const CompaniesContext = createContext<CompaniesContextValue | null>(null);

export function CompaniesProvider({ children }: { children: ReactNode }) {
  const [companies, setCompanies] = useState<Company[]>(() =>
    mockCompanies.map((c) => ({ ...c, highlighted: c.highlighted ?? false }))
  );

  const addCompany = useCallback((company: Omit<Company, 'id'>) => {
    setCompanies((prev) => {
      const nextId = Math.max(0, ...prev.map((c) => c.id)) + 1;
      return [...prev, { ...company, id: nextId, highlighted: company.highlighted ?? false }];
    });
  }, []);

  const toggleHighlight = useCallback((id: number) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, highlighted: !c.highlighted } : c))
    );
  }, []);

  return (
    <CompaniesContext.Provider
      value={{ companies, setCompanies, addCompany, toggleHighlight }}
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
