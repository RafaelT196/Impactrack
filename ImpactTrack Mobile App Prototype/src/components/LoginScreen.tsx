import { useState } from 'react';
import { Leaf } from 'lucide-react';
import type { Screen } from '../App';

interface LoginScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('home');
  };

  return (
    <div className="h-full flex flex-col bg-white p-8 md:p-16 md:justify-center">
      <div className="max-w-md mx-auto w-full">
        <div className="flex items-center justify-center mb-12 mt-8 md:mt-0">
          <div className="bg-emerald-500 p-4 md:p-5 rounded-2xl mr-3">
            <Leaf className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2} />
          </div>
          <h2 className="text-emerald-900 text-3xl md:text-4xl">ImpactTrack</h2>
        </div>

        <h3 className="text-gray-900 mb-8 text-center text-2xl md:text-3xl">Bem-vindo de volta</h3>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2 text-base md:text-lg">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base md:text-lg"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 text-base md:text-lg">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-base md:text-lg"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-4 md:py-5 rounded-xl hover:bg-emerald-600 transition-colors shadow-md mt-8 text-base md:text-lg"
          >
            Entrar
          </button>
        </form>

        <div className="text-center mt-6">
          <button className="text-emerald-600 hover:text-emerald-700 text-base md:text-lg">
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}