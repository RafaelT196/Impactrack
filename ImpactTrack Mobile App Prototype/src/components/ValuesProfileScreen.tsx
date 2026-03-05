import { ArrowLeft, Home, Compass } from 'lucide-react';
import type { Screen, UserValues } from '../App';

interface ValuesProfileScreenProps {
  onNavigate: (screen: Screen) => void;
  userValues: UserValues;
  setUserValues: (values: UserValues) => void;
}

export function ValuesProfileScreen({ onNavigate, userValues, setUserValues }: ValuesProfileScreenProps) {
  const handleSliderChange = (key: keyof UserValues, value: number) => {
    setUserValues({
      ...userValues,
      [key]: value,
    });
  };

  const handleSave = () => {
    onNavigate('recommendations');
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 md:px-8 py-4 md:py-6 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => onNavigate('home')}
              className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
            </button>
            <h3 className="text-gray-900 text-xl md:text-2xl">Perfil de Valores</h3>
            <div className="w-10 md:w-12" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 mb-6 md:mb-8 text-center text-base md:text-lg">
            Ajuste suas preferências para receber recomendações personalizadas
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Environmental */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <label className="text-gray-900 text-base md:text-lg">
                  Sustentabilidade Ambiental
                </label>
                <span className="text-emerald-600 min-w-[3rem] text-right text-lg md:text-xl">
                  {userValues.environmental}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={userValues.environmental}
                onChange={(e) => handleSliderChange('environmental', parseInt(e.target.value))}
                className="w-full h-2 md:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${userValues.environmental}%, #e5e7eb ${userValues.environmental}%, #e5e7eb 100%)`
                }}
              />
            </div>

            {/* Human Rights */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <label className="text-gray-900 text-base md:text-lg">
                  Direitos Humanos
                </label>
                <span className="text-emerald-600 min-w-[3rem] text-right text-lg md:text-xl">
                  {userValues.humanRights}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={userValues.humanRights}
                onChange={(e) => handleSliderChange('humanRights', parseInt(e.target.value))}
                className="w-full h-2 md:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${userValues.humanRights}%, #e5e7eb ${userValues.humanRights}%, #e5e7eb 100%)`
                }}
              />
            </div>

            {/* Diversity */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <label className="text-gray-900 text-base md:text-lg">
                  Diversidade
                </label>
                <span className="text-emerald-600 min-w-[3rem] text-right text-lg md:text-xl">
                  {userValues.diversity}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={userValues.diversity}
                onChange={(e) => handleSliderChange('diversity', parseInt(e.target.value))}
                className="w-full h-2 md:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${userValues.diversity}%, #e5e7eb ${userValues.diversity}%, #e5e7eb 100%)`
                }}
              />
            </div>

            {/* Governance */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <label className="text-gray-900 text-base md:text-lg">
                  Governança
                </label>
                <span className="text-emerald-600 min-w-[3rem] text-right text-lg md:text-xl">
                  {userValues.governance}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={userValues.governance}
                onChange={(e) => handleSliderChange('governance', parseInt(e.target.value))}
                className="w-full h-2 md:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${userValues.governance}%, #e5e7eb ${userValues.governance}%, #e5e7eb 100%)`
                }}
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-emerald-500 text-white py-4 md:py-5 rounded-xl hover:bg-emerald-600 transition-colors shadow-md mt-6 md:mt-8 text-base md:text-lg"
          >
            Salvar preferências
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 px-6 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-around md:justify-center md:gap-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center text-emerald-500"
          >
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