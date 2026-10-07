import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

export default function ResultPage() {
  const lead = useAppStore((state) => state.lead);
  const avatarResult = useAppStore((state) => state.avatarResult);

  if (!lead || !avatarResult) {
    return <div className="text-slate-500">No hay resultado disponible.</div>;
  }

  const shareText = encodeURIComponent(`Hola, aquí está mi historia en la UCC. ${lead.fullName} • ${lead.program}`);
  const whatsappUrl = `https://wa.me/?text=${shareText}&app_absent=1`;

  const openWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = avatarResult.avatarUrl;
    link.download = 'avatar-ucc.png';
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <section className="rounded-[30px] bg-white p-7 shadow-soft ring-1 ring-slate-200">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-ucc-green">Resultado</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Tu avatar está listo</h1>
          </div>
          <div className="rounded-full bg-ucc-light px-4 py-2 text-sm font-semibold text-ucc-blue">
            {lead.campus}
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[30px] bg-white p-6 shadow-soft ring-1 ring-slate-200">
          <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">
            <img src={avatarResult.avatarUrl} alt="Avatar profesional" className="h-[480px] w-full object-cover" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[30px] bg-white p-6 shadow-soft ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Perfil</p>
            <h2 className="mt-4 text-2xl font-black text-slate-900">{lead.fullName}</h2>
            <div className="mt-4 space-y-3 text-slate-600">
              <p><span className="font-semibold text-slate-800">Carrera:</span> {lead.program}</p>
              <p><span className="font-semibold text-slate-800">Sede:</span> {lead.campus}</p>
              <p><span className="font-semibold text-slate-800">Correo:</span> {lead.email}</p>
            </div>
          </div>

          <div className="rounded-[30px] bg-gradient-to-br from-ucc-blue to-sky-800 p-6 text-white shadow-soft">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Motivación</p>
            <h3 className="mt-3 text-2xl font-black">Inspira a alguien más.</h3>
            <p className="mt-3 text-sky-100">
              Comparte tu creación y motiva a otros a construir su propio futuro.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={openWhatsApp} className="rounded-2xl bg-ucc-green px-5 py-3 font-bold text-white transition hover:brightness-105">
                Compartir por WhatsApp
              </button>
              <button onClick={handleDownload} className="rounded-2xl border border-white/40 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/20">
                Descargar imagen
              </button>
            </div>
          </div>

          <button
            onClick={() => (window.location.href = '/app/registro')}
            className="w-full rounded-[20px] border border-slate-200 bg-slate-50 px-5 py-3 text-base font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Crear otro avatar
          </button>
        </div>
      </section>
    </motion.div>
  );
}
