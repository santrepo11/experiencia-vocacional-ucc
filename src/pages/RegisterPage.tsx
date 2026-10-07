import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLeadApi, getProgramById, programOptions } from '../services/api';
import { useAppStore } from '../store/useAppStore';

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  program: programOptions[0].id,
  campus: programOptions[0].campus,
  photo: '',
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const setLead = useAppStore((state) => state.setLead);
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedProgram = useMemo(() => getProgramById(form.program) || programOptions[0], [form.program]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === 'program' ? { campus: getProgramById(value)?.campus || current.campus } : {}),
    }));

    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handlePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValidFormat = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
    const isValidSize = file.size <= 10 * 1024 * 1024;

    if (!isValidFormat) {
      setErrors((current) => ({ ...current, photo: 'Solo se admiten JPG, PNG y WEBP.' }));
      return;
    }

    if (!isValidSize) {
      setErrors((current) => ({ ...current, photo: 'La imagen debe ser menor a 10MB.' }));
      return;
    }

    const photoUrl = URL.createObjectURL(file);
    setPreview(photoUrl);
    setForm((current) => ({ ...current, photo: photoUrl }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.fullName.trim()) nextErrors.fullName = 'Nombre completo requerido';
    if (!/^\+?3\d{9,10}$/.test(form.phone)) nextErrors.phone = 'Teléfono colombiano no válido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Correo electrónico no válido';
    if (!form.program) nextErrors.program = 'Debes seleccionar un programa';
    if (!form.photo) nextErrors.photo = 'Debes subir una fotografía';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await createLeadApi(form);
      setLead(response);
      navigate('/app/generacion');
    } catch (error) {
      console.error(error);
      alert('No se pudo guardar el registro. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[28px] bg-white p-7 shadow-soft ring-1 ring-slate-200">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ucc-blue/60">Registro</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Completa tu perfil vocacional</h1>
          </div>
          <div className="rounded-full bg-ucc-light px-4 py-2 text-sm font-semibold text-ucc-blue">
            {selectedProgram.name}
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-[28px] bg-white p-7 shadow-soft ring-1 ring-slate-200">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Nombre completo</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-ucc-blue"
                placeholder="Ej: Ana María García"
              />
              {errors.fullName && <p className="mt-2 text-sm text-red-500">{errors.fullName}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Teléfono WhatsApp</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-ucc-blue"
                placeholder="+57 310 000 0000"
              />
              {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Correo electrónico</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-ucc-blue"
                placeholder="ejemplo@correo.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Programa académico</label>
              <select
                name="program"
                value={form.program}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-ucc-blue"
              >
                {programOptions.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
              {errors.program && <p className="mt-2 text-sm text-red-500">{errors.program}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Campus</label>
              <input
                value={form.campus}
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Modalidad</label>
              <input
                value={selectedProgram.modalidad}
                readOnly
                className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-600 outline-none"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
            <label className="mb-2 block text-sm font-medium text-slate-700">Fotografía</label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhoto}
              className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-ucc-blue file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />
            <p className="mt-2 text-xs text-slate-500">Formatos permitidos: JPG, PNG, WEBP • Máximo 10 MB</p>
            {errors.photo && <p className="mt-2 text-sm text-red-500">{errors.photo}</p>}
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-7 shadow-soft ring-1 ring-slate-200">
          <h2 className="text-xl font-black text-slate-900">Previsualización</h2>
          <div className="mt-5 overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-100 to-white p-4">
            {preview ? (
              <img src={preview} alt="Vista previa" className="h-80 w-full rounded-2xl object-cover" />
            ) : (
              <div className="flex h-80 items-center justify-center rounded-2xl bg-[radial-gradient(circle,_#dbeafe,_#eff6ff_50%,_#f8fafc)] text-center text-slate-500">
                <div>
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-sm">📷</div>
                  Tu foto aparecerá aquí
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-2xl bg-ucc-light p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ucc-blue/70">Programa</p>
            <p className="mt-2 text-lg font-bold text-slate-900">{selectedProgram.name}</p>
            <p className="mt-1 text-sm text-slate-600">{selectedProgram.description}</p>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-6 w-full rounded-2xl bg-ucc-green px-4 py-3 text-base font-bold text-white transition hover:brightness-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Continuar a la generación'}
          </button>
        </div>
      </form>
    </div>
  );
}
