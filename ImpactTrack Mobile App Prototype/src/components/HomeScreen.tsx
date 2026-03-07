import { Search, Home, Compass, Leaf } from 'lucide-react';
import type { Screen, Company } from '../App';

interface HomeScreenProps {
  companies: Company[];
  loading?: boolean;
  error?: string | null;
  onNavigate: (screen: Screen, company?: Company) => void;
}

export function HomeScreen({ companies, loading, error, onNavigate }: HomeScreenProps) {
  const handleCompanyClick = (company: Company) => {
    onNavigate('search', company);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 md:px-8 pt-6 pb-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-4">
            <div className="bg-emerald-500 p-2 md:p-3 rounded-xl mr-2 md:mr-3">
              <Leaf className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2} />
            </div>
            <span className="text-emerald-900 text-xl md:text-2xl">ImpactTrack</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar empresa ou produto"
              className="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-gray-900 mb-4 md:mb-6 text-xl md:text-2xl">Empresas em Destaque</h3>

          {loading ? (
            <p className="text-gray-500 text-center py-8">Carregando...</p>
          ) : error ? (
            <p className="text-red-600 text-center py-8">{error}</p>
          ) : companies.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhuma empresa em destaque no momento. Use <strong>Explorar</strong> para ver todas.
            </p>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {companies.map((company) => (
              <div
                key={company.id}
                onClick={() => handleCompanyClick(company)}
                className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                      <span className="text-white text-lg md:text-xl">{company.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="text-gray-900 text-base md:text-lg">{company.name}</h4>
                      <p className="text-gray-500 text-sm md:text-base">{company.category}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 md:px-4 md:py-2 rounded-lg ${getScoreColor(company.esgScore)}`}>
                    <span className="text-sm md:text-base">{company.esgScore}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-500 mb-1">Ambiental</p>
                    <p className="text-emerald-600 text-sm md:text-base">{company.environmental}</p>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-500 mb-1">Social</p>
                    <p className="text-emerald-600 text-sm md:text-base">{company.social}</p>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-500 mb-1">Governança</p>
                    <p className="text-emerald-600 text-sm md:text-base">{company.governance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-6 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-around md:justify-center md:gap-16">
          <button className="flex flex-col items-center text-emerald-500">
            <Home className="w-6 h-6 md:w-7 md:h-7 mb-1" />
            <span className="text-xs md:text-sm">Home</span>
          </button>
          <button
            onClick={() => onNavigate('explore')}
            className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Compass className="w-6 h-6 md:w-7 md:h-7 mb-1" />
            <span className="text-xs md:text-sm">Explorar</span>
          </button>
        </div>
      </div>
    </div>
  );
}