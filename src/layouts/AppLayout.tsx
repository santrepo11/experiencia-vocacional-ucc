import { Outlet, NavLink } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const navigation = [
  { label: 'Inicio', to: '/app/inicio' },
  { label: 'Registro', to: '/app/registro' },
  { label: 'Generación', to: '/app/generacion' },
  { label: 'Resultado', to: '/app/resultado' },
  { label: 'Dashboard', to: '/app/dashboard' },
];

export default function AppLayout() {
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-200 bg-white/90 p-6 shadow-soft backdrop-blur md:block">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ucc-blue text-lg font-bold text-white">
              UCC
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ucc-blue/70">Universidad</p>
              <h2 className="text-lg font-black text-ucc-blue">Cooperativa</h2>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive ? 'bg-ucc-blue text-white shadow-soft' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-10 rounded-2xl bg-ucc-light p-4 text-sm text-slate-700">
          <p className="font-semibold text-ucc-blue">Usuario activo</p>
          <p className="mt-2 font-medium">{user?.name || 'Aspirante'}</p>
          <p className="text-slate-500">{user?.email || 'usuario@ucc.edu.co'}</p>
        </div>

        <button
          type="button"
          onClick={() => {
            logout();
            window.location.href = '/login';
          }}
          className="mt-8 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Cerrar sesión
        </button>
      </aside>

      <main className="md:ml-72">
        <div className="mx-auto max-w-7xl p-5 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
