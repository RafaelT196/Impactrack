import { useState } from 'react';
import { useCompanies } from './context/CompaniesContext';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { SearchResultScreen } from './components/SearchResultScreen';
import { CompanyDetailScreen } from './components/CompanyDetailScreen';
import { ValuesProfileScreen } from './components/ValuesProfileScreen';
import { RecommendationsScreen } from './components/RecommendationsScreen';

export type Screen =
  | 'splash'
  | 'home'
  | 'explore'
  | 'search'
  | 'detail'
  | 'profile'
  | 'recommendations';

export interface Company {
  id: number;
  name: string;
  description: string;
  logo: string;
  esgScore: number;
  environmental: number;
  social: number;
  governance: number;
  category: string;
  /** Se true, aparece na página inicial (destaques); se false, só em Explorar */
  highlighted?: boolean;
  alerts?: string[];
  criteria: {
    emissions: string;
    renewable: string;
    diversity: string;
    labor: string;
    transparency: string;
  };
}

export interface UserValues {
  environmental: number;
  humanRights: number;
  diversity: number;
  governance: number;
}

export default function App() {
  const { companies } = useCompanies();
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [userValues, setUserValues] = useState<UserValues>({
    environmental: 70,
    humanRights: 80,
    diversity: 75,
    governance: 65,
  });

  const navigateTo = (screen: Screen, company?: Company) => {
    if (company) {
      setSelectedCompany(company);
    }
    setCurrentScreen(screen);
  };

  const highlightedCompanies = companies.filter((c) => c.highlighted);
  const exploreCompanies = companies.filter((c) => !c.highlighted);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full h-screen bg-white md:bg-gray-100 overflow-hidden">
        {currentScreen === 'splash' && <SplashScreen onNavigate={navigateTo} />}
        {currentScreen === 'home' && (
          <HomeScreen companies={highlightedCompanies} onNavigate={navigateTo} />
        )}
        {currentScreen === 'explore' && (
          <ExploreScreen companies={exploreCompanies} onNavigate={navigateTo} />
        )}
        {currentScreen === 'search' && (
          <SearchResultScreen onNavigate={navigateTo} company={selectedCompany} />
        )}
        {currentScreen === 'detail' && (
          <CompanyDetailScreen onNavigate={navigateTo} company={selectedCompany} />
        )}
        {currentScreen === 'profile' && (
          <ValuesProfileScreen
            onNavigate={navigateTo}
            userValues={userValues}
            setUserValues={setUserValues}
          />
        )}
        {currentScreen === 'recommendations' && (
          <RecommendationsScreen onNavigate={navigateTo} userValues={userValues} />
        )}
      </div>
    </div>
  );
}