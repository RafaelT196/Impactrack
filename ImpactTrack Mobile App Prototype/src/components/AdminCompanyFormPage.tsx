import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf, Star } from 'lucide-react';
import { useCompanies } from '../context/CompaniesContext';

const defaultCriteria = {
  emissions: '',
  renewable: '',
  diversity: '',
  labor: '',
  transparency: '',
};

export function AdminCompanyFormPage() {
  const navigate = useNavigate();
  const { addCompany } = useCompanies();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      await addCompany({
        name: form.name,
        category: form.category,
        description: form.description,
        logo: '',
        esgScore: Math.round(
          (form.environmental + form.social + form.governance) / 3
        ),
        environmental: form.environmental,
        social: form.social,
        governance: form.governance,
        criteria: form.criteria,
        highlighted: form.highlighted,
        alerts: form.alerts
          ? form.alerts.split('\n').map((s) => s.trim()).filter(Boolean)
          : undefined,
      });
      navigate('/admin');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erro ao cadastrar empresa');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-xl">
              <Leaf className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="text-emerald-900 font-semibold">Nova empresa</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {submitError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {submitError}
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">Nome da empresa</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Ex: GreenTech Solutions"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">Ramo da empresa</label>
            <input
              required
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Ex: Tecnologia, Moda, Energia"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
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
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">Descrição da empresa</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Texto sobre a empresa e seu compromisso ESG..."
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Critérios ESG</p>
            <div className="space-y-3">
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
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                    placeholder="Breve descrição..."
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">
              Controvérsias / alertas (opcional, uma por linha)
            </label>
            <textarea
              rows={3}
              value={form.alerts}
              onChange={(e) => setForm((f) => ({ ...f, alerts: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              placeholder="Cada linha vira um item na seção de controvérsias"
            />
          </div>

          <div className="flex items-center gap-2 p-4 rounded-xl border border-gray-200 bg-white">
            <button
              type="button"
              role="checkbox"
              aria-checked={form.highlighted}
              onClick={() => setForm((f) => ({ ...f, highlighted: !f.highlighted }))}
              className="flex items-center gap-2"
            >
              <Star
                className={`w-6 h-6 transition-colors ${
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
            <Link
              to="/admin"
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-center font-medium"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 font-medium"
            >
              {submitting ? 'Salvando...' : 'Cadastrar empresa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
