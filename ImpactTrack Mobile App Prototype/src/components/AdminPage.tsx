import { useState } from 'react';
import { Leaf, Plus, Star, LogOut } from 'lucide-react';
import { useCompanies } from '../context/CompaniesContext';

const defaultCriteria = {
  emissions: '',
  renewable: '',
  diversity: '',
  labor: '',
  transparency: '',
};

export function AdminPage() {
  const { companies, addCompany, toggleHighlight } = useCompanies();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: '',
    description: '',
    environmental: 0,
    social: 0,
    governance: 0,
    criteria: { ...defaultCriteria },
    alerts: '' as string,
    highlighted: false,
  });

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const handleSubmitCompany = (e: React.FormEvent) => {
    e.preventDefault();
    const esgScore = Math.round(
      (form.environmental + form.social + form.governance) / 3
    );
    addCompany({
      name: form.name,
      category: form.category,
      description: form.description,
      logo: '',
      esgScore,
      environmental: form.environmental,
      social: form.social,
      governance: form.governance,
      criteria: form.criteria,
      highlighted: form.highlighted,
      alerts: form.alerts
        ? form.alerts.split('\n').map((s) => s.trim()).filter(Boolean)
        : undefined,
    });
    setForm({
      name: '',
      category: '',
      description: '',
      environmental: 0,
      social: 0,
      governance: 0,
      criteria: { ...defaultCriteria },
      alerts: '',
      highlighted: false,
    });
    setShowForm(false);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-white p-8 md:p-16 md:justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="flex items-center justify-center mb-12 mt-8 md:mt-0">
            <div className="bg-emerald-500 p-4 md:p-5 rounded-2xl mr-3">
              <Leaf className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2} />
            </div>
            <h2 className="text-emerald-900 text-3xl md:text-4xl">ImpactTrack Admin</h2>
          </div>
          <h3 className="text-gray-900 mb-8 text-center text-2xl md:text-3xl">
            Acesso administrativo
          </h3>
          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2 text-base md:text-lg">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg"
                placeholder="admin@impactrack.com"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-base md:text-lg">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 md:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base md:text-lg"
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
          <p className="text-center mt-6 text-gray-500 text-sm">
            Acesso apenas para administradores. <br />
            <a href="/" className="text-emerald-600 hover:underline">
              Voltar ao app
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-xl">
              <Leaf className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <span className="text-emerald-900 text-xl font-semibold">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              Ver app
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
              title="Sair"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-gray-900">Empresas cadastradas</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Cadastrar nova empresa
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {companies.map((company) => (
              <li
                key={company.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900">{company.name}</p>
                  <p className="text-sm text-gray-500">{company.category}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleHighlight(company.id)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title={company.highlighted ? 'Remover dos destaques' : 'Adicionar empresa aos destaques'}
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      company.highlighted
                        ? 'fill-amber-400 text-amber-500'
                        : 'fill-transparent text-gray-300 hover:text-amber-300'
                    }`}
                    strokeWidth={company.highlighted ? 2 : 1.5}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal formulário */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Nova empresa</h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmitCompany} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">Nome da empresa</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ex: GreenTech Solutions"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">Ramo da empresa</label>
                <input
                  required
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ex: Tecnologia, Moda, Energia"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1 text-sm font-medium">Score ambiental (0-100)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    required
                    value={form.environmental || ''}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, environmental: Number(e.target.value) || 0 }))
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 text-sm font-medium">Score social (0-100)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    required
                    value={form.social || ''}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, social: Number(e.target.value) || 0 }))
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 text-sm font-medium">Score governança (0-100)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    required
                    value={form.governance || ''}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, governance: Number(e.target.value) || 0 }))
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">Descrição da empresa (parágrafo)</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Texto sobre a empresa e seu compromisso ESG..."
                />
              </div>
              <p className="text-sm font-medium text-gray-700">Critérios ESG</p>
              {(
                ['emissions', 'renewable', 'diversity', 'labor', 'transparency'] as const
              ).map((key) => (
                <div key={key}>
                  <label className="block text-gray-600 mb-1 text-xs">
                    {key === 'emissions' && 'Emissões'}
                    {key === 'renewable' && 'Energia renovável'}
                    {key === 'diversity' && 'Diversidade'}
                    {key === 'labor' && 'Práticas trabalhistas'}
                    {key === 'transparency' && 'Transparência'}
                  </label>
                  <input
                    value={form.criteria[key]}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        criteria: { ...f.criteria, [key]: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    placeholder="Breve descrição..."
                  />
                </div>
              ))}
              <div>
                <label className="block text-gray-700 mb-1 text-sm font-medium">
                  Controvérsias / alertas (opcional, uma por linha)
                </label>
                <textarea
                  rows={2}
                  value={form.alerts}
                  onChange={(e) => setForm((f) => ({ ...f, alerts: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  placeholder="Cada linha vira um item na seção de controvérsias"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={form.highlighted}
                  onClick={() => setForm((f) => ({ ...f, highlighted: !f.highlighted }))}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                >
                  <Star
                    className={`w-5 h-5 transition-colors ${
                      form.highlighted
                        ? 'fill-amber-400 text-amber-500'
                        : 'fill-transparent text-gray-300'
                    }`}
                    strokeWidth={form.highlighted ? 2 : 1.5}
                  />
                  <span className="text-sm">Adicionar empresa aos destaques (página inicial)</span>
                </button>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  Cadastrar empresa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
