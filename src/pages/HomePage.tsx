import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { programOptions } from '../services/api';

const sampleCards = programOptions.slice(0, 4);

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[26px] bg-gradient-to-r from-ucc-blue via-sky-800 to-ucc-blue p-8 text-white shadow-soft"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-ucc-green">Bienvenido</p>
            <h1 className="mt-2 text-3xl font-black md:text-5xl">Descubre tu futuro profesional</h1>
          </div>

          <button
            onClick={() => navigate('/app/registro')}
            className="rounded-2xl bg-white px-6 py-3 text-base font-bold text-ucc-blue transition hover:bg-slate-100"
          >
            Crear nuevo avatar
          </button>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {sampleCards.map((program, index) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-soft"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black text-white" style={{ background: program.color }}>
              {program.name.charAt(0)}
            </div>
            <h3 className="text-lg font-bold text-slate-900">{program.name}</h3>
            <p className="mt-2 text-sm text-slate-600">{program.description}</p>
            <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500">
              <span>{program.campus}</span>
              <span>{program.modalidad}</span>
            </div>
          </motion.div>
        ))}
      </section>

      <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft">
        <h2 className="text-2xl font-black text-slate-900">Tu recorrido vocacional</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            'Registra tus datos y sube tu foto',
            'Genera un avatar con estilo profesional',
            'Comparte tu historia y descubre tu futuro',
          ].map((step, index) => (
            <div key={step} className="rounded-2xl bg-ucc-light p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-ucc-blue font-bold text-white">
                {index + 1}
              </div>
              <p className="text-base font-semibold text-slate-800">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
