import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { generateAvatarApi } from '../services/api';

const steps = ['Foto recibida', 'Preparando fotografía', 'Generando estilo profesional', 'Avatar finalizado'];

export default function GenerationPage() {
  const navigate = useNavigate();
  const lead = useAppStore((state) => state.lead);
  const setAvatarResult = useAppStore((state) => state.setAvatarResult);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!lead) {
      navigate('/app/registro');
      return;
    }

    const timer = setInterval(() => {
      setCurrentStep((step) => {
        if (step >= steps.length - 1) {
          clearInterval(timer);
          return step;
        }
        return step + 1;
      });
    }, 1400);

    const load = async () => {
      const result = await generateAvatarApi({
        nombre: lead.fullName,
        correo: lead.email,
        telefono: lead.phone,
        programa: lead.program,
        campus: lead.campus,
        imagen: lead.photo,
      });
      setAvatarResult(result);
      setTimeout(() => navigate('/app/resultado'), 800);
    };

    load();

    return () => clearInterval(timer);
  }, [lead, navigate, setAvatarResult]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-3xl rounded-[30px] bg-white p-8 shadow-soft ring-1 ring-slate-200">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ucc-blue/70">Generación</p>
          <h1 className="mt-3 text-3xl font-black text-slate-900">Estamos preparando tu avatar</h1>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => {
            const active = currentStep >= index;
            return (
              <div key={step} className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${
                    active
                      ? 'border-ucc-green bg-ucc-green text-white'
                      : 'border-slate-200 bg-slate-100 text-slate-500'
                  }`}
                >
                  {active ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        active ? 'bg-ucc-green' : 'bg-slate-200'
                      }`}
                      style={{ width: active ? '100%' : '0%' }}
                    />
                  </div>
                </div>
                <div className="w-44 text-right text-sm font-medium text-slate-600">{step}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
