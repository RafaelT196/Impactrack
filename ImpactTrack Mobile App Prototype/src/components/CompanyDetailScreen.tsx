import { ArrowLeft, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { Screen, Company } from '../App';

interface CompanyDetailScreenProps {
  onNavigate: (screen: Screen) => void;
  company: Company | null;
}

export function CompanyDetailScreen({ onNavigate, company }: CompanyDetailScreenProps) {
  if (!company) return null;

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
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onNavigate('search', company)}
              className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
            <h3 className="text-gray-900 text-xl md:text-2xl">Detalhes</h3>
            <div className="w-10 md:w-12" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 md:py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Score Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm md:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                <div className="flex items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mr-3 md:mr-4">
                    <span className="text-white text-lg md:text-2xl">{company.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h2 className="text-gray-900 text-xl md:text-3xl">{company.name}</h2>
                    <p className="text-gray-500 text-sm md:text-base">{company.category}</p>
                  </div>
                </div>
                <div className={`px-4 md:px-6 py-2 md:py-3 rounded-xl ${getScoreBg(company.esgScore)} self-start md:self-auto`}>
                  <span className={`text-2xl md:text-4xl ${getScoreColor(company.esgScore)}`}>
                    {company.esgScore}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {company.description}
              </p>
            </div>

            {/* ESG Criteria */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="text-gray-900 mb-4 md:mb-6 text-lg md:text-xl">Critérios ESG</h3>
              
              <div className="space-y-4 md:space-y-5">
                <div>
                  <div className="flex items-center mb-2">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-500 mr-2" />
                    <p className="text-gray-700 text-sm md:text-base">Emissões de Carbono</p>
                  </div>
                  <p className="text-gray-600 text-sm ml-7 md:ml-8">{company.criteria.emissions}</p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-500 mr-2" />
                    <p className="text-gray-700 text-sm md:text-base">Energia Renovável</p>
                  </div>
                  <p className="text-gray-600 text-sm ml-7 md:ml-8">{company.criteria.renewable}</p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-500 mr-2" />
                    <p className="text-gray-700 text-sm md:text-base">Diversidade e Inclusão</p>
                  </div>
                  <p className="text-gray-600 text-sm ml-7 md:ml-8">{company.criteria.diversity}</p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-500 mr-2" />
                    <p className="text-gray-700 text-sm md:text-base">Práticas Trabalhistas</p>
                  </div>
                  <p className="text-gray-600 text-sm ml-7 md:ml-8">{company.criteria.labor}</p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-emerald-500 mr-2" />
                    <p className="text-gray-700 text-sm md:text-base">Transparência</p>
                  </div>
                  <p className="text-gray-600 text-sm ml-7 md:ml-8">{company.criteria.transparency}</p>
                </div>
              </div>
            </div>

            {/* Alerts */}
            {company.alerts && company.alerts.length > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex items-center mb-3 md:mb-4">
                  <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-orange-600 mr-2" />
                  <h3 className="text-orange-900 text-lg md:text-xl">Controvérsias</h3>
                </div>
                <div className="space-y-2 md:space-y-3">
                  {company.alerts.map((alert, index) => (
                    <p key={index} className="text-orange-800 text-sm md:text-base">• {alert}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}