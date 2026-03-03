import { Leaf } from 'lucide-react';
import type { Screen } from '../App';

interface SplashScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function SplashScreen({ onNavigate }: SplashScreenProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-white p-8 md:p-16">
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto">
        <div className="bg-emerald-500 p-6 md:p-10 rounded-3xl mb-6 md:mb-8 shadow-lg">
          <Leaf className="w-16 h-16 md:w-24 md:h-24 text-white" strokeWidth={2} />
        </div>
        
        <h1 className="text-emerald-900 mb-3 md:mb-4 text-center text-4xl md:text-6xl">
          ImpactTrack
        </h1>
        
        <p className="text-gray-600 text-center max-w-xs md:max-w-md text-lg md:text-2xl">
          Seu dinheiro, seus valores
        </p>
      </div>

      <button
        onClick={() => onNavigate('login')}
        className="w-full max-w-md bg-emerald-500 text-white py-4 md:py-5 rounded-2xl hover:bg-emerald-600 transition-colors shadow-md text-lg md:text-xl"
      >
        Começar
      </button>
    </div>
  );
}