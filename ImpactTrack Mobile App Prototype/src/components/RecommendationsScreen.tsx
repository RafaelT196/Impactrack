import { ArrowLeft, Heart } from 'lucide-react';
import type { Screen, UserValues } from '../App';
import { mockCompanies } from './mockData';

interface RecommendationsScreenProps {
  onNavigate: (screen: Screen) => void;
  userValues: UserValues;
}

export function RecommendationsScreen({ onNavigate, userValues }: RecommendationsScreenProps) {
  // Calculate compatibility score based on user values
  const getCompatibilityScore = (company: typeof mockCompanies[0]) => {
    const envWeight = userValues.environmental / 100;
    const socialWeight = (userValues.humanRights + userValues.diversity) / 200;
    const govWeight = userValues.governance / 100;

    const score = Math.round(
      company.environmental * envWeight * 0.4 +
      company.social * socialWeight * 0.4 +
      company.governance * govWeight * 0.2
    );

    return Math.min(100, score);
  };

  const recommendations = mockCompanies
    .map(company => ({
      ...company,
      compatibility: getCompatibilityScore(company)
    }))
    .sort((a, b) => b.compatibility - a.compatibility);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 md:px-8 py-4 md:py-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onNavigate('profile')}
              className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
            <h3 className="text-gray-900 text-xl md:text-2xl">Recomendações</h3>
            <div className="w-10 md:w-12" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 mb-6 md:mb-8 text-center text-base md:text-lg">
            Empresas ordenadas por compatibilidade com seus valores
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {recommendations.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center flex-1">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-lg md:text-xl">{company.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 mb-1 text-base md:text-lg">{company.name}</h4>
                      <p className="text-gray-500 text-sm">{company.category}</p>
                    </div>
                  </div>
                  <button className="ml-3 text-gray-400 hover:text-emerald-500 transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 text-sm md:text-base">Compatibilidade</span>
                    <span className="text-emerald-600 text-base md:text-lg">{company.compatibility}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${company.compatibility}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-gray-50 rounded-lg px-2 py-2 text-center">
                    <p className="text-xs text-gray-500 mb-1">ESG</p>
                    <p className="text-emerald-600 text-sm md:text-base">{company.esgScore}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-2 py-2 text-center">
                    <p className="text-xs text-gray-500 mb-1">Ambiental</p>
                    <p className="text-emerald-600 text-sm md:text-base">{company.environmental}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg px-2 py-2 text-center">
                    <p className="text-xs text-gray-500 mb-1">Social</p>
                    <p className="text-emerald-600 text-sm md:text-base">{company.social}</p>
                  </div>
                </div>

                <button className="w-full bg-emerald-500 text-white py-3 md:py-4 rounded-xl hover:bg-emerald-600 transition-colors text-sm md:text-base">
                  Favoritar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}