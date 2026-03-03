import { ArrowLeft, GitCompare, Bookmark } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import type { Screen, Company } from '../App';

interface SearchResultScreenProps {
  onNavigate: (screen: Screen, company?: Company) => void;
  company: Company | null;
}

export function SearchResultScreen({ onNavigate, company }: SearchResultScreenProps) {
  if (!company) return null;

  const chartData = [
    { category: 'Ambiental', value: company.environmental },
    { category: 'Social', value: company.social },
    { category: 'Governança', value: company.governance },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 md:px-8 py-4 md:py-6 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => onNavigate('home')}
              className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
            <h3 className="text-gray-900 text-xl md:text-2xl">Resultado da Busca</h3>
            <div className="w-10 md:w-12" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div className="flex items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-white text-xl md:text-2xl">{company.name.charAt(0)}</span>
                </div>
                <div>
                  <h2 className="text-gray-900 mb-1 text-xl md:text-3xl">{company.name}</h2>
                  <p className="text-gray-500 text-base md:text-lg">{company.category}</p>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600 mb-2 text-base md:text-lg">Score de Impacto ESG</p>
              <div className={`inline-block px-6 md:px-8 py-3 md:py-4 rounded-2xl ${getScoreBg(company.esgScore)}`}>
                <span className={`text-4xl md:text-6xl ${getScoreColor(company.esgScore)}`}>
                  {company.esgScore}
                </span>
                <span className="text-gray-500 text-xl md:text-3xl">/100</span>
              </div>
            </div>

            <div className="h-64 md:h-80 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                  <PolarGrid stroke="#d1d5db" />
                  <PolarAngleAxis 
                    dataKey="category" 
                    tick={{ fill: '#6b7280', fontSize: 14 }}
                  />
                  <Radar
                    dataKey="value"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
              <div className="bg-emerald-50 rounded-xl p-3 md:p-4 text-center">
                <p className="text-xs md:text-sm text-gray-600 mb-1">Ambiental</p>
                <p className="text-emerald-600 text-lg md:text-2xl">{company.environmental}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 md:p-4 text-center">
                <p className="text-xs md:text-sm text-gray-600 mb-1">Social</p>
                <p className="text-emerald-600 text-lg md:text-2xl">{company.social}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 md:p-4 text-center">
                <p className="text-xs md:text-sm text-gray-600 mb-1">Governança</p>
                <p className="text-emerald-600 text-lg md:text-2xl">{company.governance}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <button
              onClick={() => onNavigate('detail', company)}
              className="w-full bg-emerald-500 text-white py-4 md:py-5 rounded-xl hover:bg-emerald-600 transition-colors shadow-md text-base md:text-lg"
            >
              Ver detalhes
            </button>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <button className="bg-white text-gray-700 py-4 md:py-5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-base md:text-lg">
                <GitCompare className="w-5 h-5 md:w-6 md:h-6" />
                Comparar
              </button>
              <button className="bg-white text-gray-700 py-4 md:py-5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-base md:text-lg">
                <Bookmark className="w-5 h-5 md:w-6 md:h-6" />
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}