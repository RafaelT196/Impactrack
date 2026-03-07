import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Plus, Star, LogOut, Trash2 } from 'lucide-react';
import { useCompanies } from '../context/CompaniesContext';

const STORAGE_KEY = 'impactrack_admin_logged_in';

/** Único admin permitido (para produção, mover para backend com hash de senha) */
const ADMIN_CREDENTIALS = {
  email: 'brunobrendhan.g@gmail.com',
  password: '123456',
};

function getStoredAdminLoggedIn(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function AdminPage() {
  const { companies, loading, error, toggleHighlight, deleteCompany } = useCompanies();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(getStoredAdminLoggedIn);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const emailTrim = email.trim().toLowerCase();
    const isAllowed =
      emailTrim === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password;
    if (!isAllowed) {
      setSubmitError('E-mail ou senha inválidos. Acesso restrito ao administrador.');
      return;
    }
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setIsAdminLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAdminLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const handleToggleHighlight = async (id: number) => {
    setSubmitError(null);
    setTogglingId(id);
    try {
      await toggleHighlight(id);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro ao atualizar destaque');
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Excluir a empresa "${name}"? Esta ação não pode ser desfeita.`)) return;
    setSubmitError(null);
    setDeletingId(id);
    try {
      await deleteCompany(id);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro ao excluir empresa');
    } finally {
      setDeletingId(null);
    }
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
          {submitError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {submitError}
            </div>
          )}
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
          <Link
            to="/admin/nova-empresa"
            className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Cadastrar nova empresa
          </Link>
        </div>

        {(error || submitError) && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {submitError ?? error}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
            Carregando empresas...
          </div>
        ) : (
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
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleToggleHighlight(company.id)}
                    disabled={togglingId === company.id}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
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
                  <button
                    type="button"
                    onClick={() => handleDelete(company.id, company.name)}
                    disabled={deletingId === company.id}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                    title="Excluir empresa"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>
    </div>
  );
}
