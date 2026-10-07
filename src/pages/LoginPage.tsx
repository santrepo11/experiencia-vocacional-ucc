import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAppStore((state) => state.setAuth);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get('username') || '');
    const password = String(form.get('password') || '');

    if (!username || !password) {
      alert('Por favor ingresa tus credenciales.');
      return;
    }

    setAuth({ name: username, email: `${username}@ucc.edu.co` });
    navigate('/app/inicio');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_35%,_#eff6ff_100%)] p-6">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft lg:grid-cols-2"
      >
        <div className="relative flex flex-col justify-between bg-ucc-blue p-8 text-white md:p-10">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-ucc-green">UCC</p>
            <h1 className="max-w-sm text-4xl font-black leading-tight md:text-5xl">
              ¿Cómo te ves en tu futuro?
            </h1>
            <p className="mt-6 max-w-md text-base text-slate-200">
              Explora la carrera que te inspira y visualiza el profesional que puedes llegar a ser.
            </p>
          </div>

          <div className="mt-10 rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-2xl font-black">14+</div>
                <div className="mt-1 text-xs text-slate-200">Programas</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-2xl font-black">12k</div>
                <div className="mt-1 text-xs text-slate-200">Aspirantes</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-2xl font-black">96%</div>
                <div className="mt-1 text-xs text-slate-200">Satisfacción</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ucc-blue/60">Acceso</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">Iniciar sesión</h2>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Usuario</label>
              <input
                type="text"
                name="username"
                defaultValue="aspirante"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-ucc-blue focus:bg-white"
                placeholder="usuario@ucc.edu.co"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Contraseña</label>
              <input
                type="password"
                name="password"
                defaultValue="123456"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-ucc-blue focus:bg-white"
                placeholder="••••••••••"
              />
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-ucc-blue" />
                Recordarme
              </label>
              <button type="button" className="font-medium text-ucc-blue hover:text-ucc-navy">
                Recuperar contraseña
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-ucc-blue px-4 py-3 text-base font-bold text-white transition hover:bg-ucc-navy"
            >
              Ingresar
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
