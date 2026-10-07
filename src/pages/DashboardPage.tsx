import { useQuery } from '@tanstack/react-query';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getDashboardStatsApi } from '../services/api';

const colorPalette = ['#003B70', '#8CC63E', '#4F46E5', '#F59E0B', '#EC4899'];

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStatsApi,
  });

  if (isLoading || !data) {
    return <div className="text-slate-500">Cargando dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[30px] bg-white p-7 shadow-soft ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ucc-blue/70">Administrativo</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">Dashboard de registros</h1>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total de registros', value: data.totalRegistros.toLocaleString() },
          { label: 'Sede líder', value: data.sedeLider },
          { label: 'Carrera líder', value: data.carreraLider },
          { label: 'Camión líder', value: data.camionLider },
        ].map((item) => (
          <div key={item.label} className="rounded-[24px] bg-white p-6 shadow-soft ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-[30px] bg-white p-6 shadow-soft ring-1 ring-slate-200">
          <h2 className="mb-5 text-xl font-black text-slate-900">Registros por fecha</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.registrosPorFecha}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#003B70" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[30px] bg-white p-6 shadow-soft ring-1 ring-slate-200">
          <h2 className="mb-5 text-xl font-black text-slate-900">Distribución por camión</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.distribucionCamion}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                  {data.distribucionCamion.map((entry, index) => (
                    <Cell key={entry.name} fill={colorPalette[index % colorPalette.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[30px] bg-white p-6 shadow-soft ring-1 ring-slate-200">
          <h2 className="mb-5 text-xl font-black text-slate-900">Registros por sede</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.registrosPorSede} layout="vertical" margin={{ left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="sede" type="category" stroke="#64748b" width={90} />
                <Tooltip />
                <Bar dataKey="total" fill="#8CC63E" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[30px] bg-white p-6 shadow-soft ring-1 ring-slate-200">
          <h2 className="mb-5 text-xl font-black text-slate-900">Carreras con mayor interés</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.carrerasInteres}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="total" radius={[8, 8, 0, 0]} fill="#003B70" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
