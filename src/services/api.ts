import axios from 'axios';
import type { AvatarResult, DashboardStats, LeadFormData } from '../types';

const API = axios.create({
  baseURL: '/api',
  timeout: 6000,
});

export const programOptions = [
  {
    id: 'sistemas',
    name: 'Ingeniería de Sistemas',
    campus: 'Bogotá',
    modalidad: 'Presencial',
    color: '#003B70',
    description: 'Tecnología, innovación y soluciones digitales',
  },
  {
    id: 'derecho',
    name: 'Derecho',
    campus: 'Medellín',
    modalidad: 'Presencial',
    color: '#8CC63E',
    description: 'Argumentación, justicia y transformación social',
  },
  {
    id: 'psicologia',
    name: 'Psicología',
    campus: 'Cali',
    modalidad: 'Virtual',
    color: '#4F46E5',
    description: 'Bienestar, diagnóstico y acompañamiento humano',
  },
  {
    id: 'administracion',
    name: 'Administración de Empresas',
    campus: 'Barranquilla',
    modalidad: 'Híbrida',
    color: '#F59E0B',
    description: 'Liderazgo, estrategia y gestión empresarial',
  },
  {
    id: 'enfermeria',
    name: 'Enfermería',
    campus: 'Bogotá',
    modalidad: 'Presencial',
    color: '#EC4899',
    description: 'Salud, cuidado y atención integral',
  },
];

export const loginApi = async ({ username, password }: { username: string; password: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 700));
  if (!username || !password) throw new Error('Credenciales requeridas');
  return {
    user: {
      name: username,
      email: `${username}@ucc.edu.co`,
    },
    token: 'mock-token-123',
  };
};

export const createLeadApi = async (payload: LeadFormData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: Date.now(),
    ...payload,
  };
};

export const generateAvatarApi = async (payload: Record<string, string>) => {
  await new Promise((resolve) => setTimeout(resolve, 1800));

  const fallbackImage =
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80';

  return {
    avatarUrl: payload.photo || fallbackImage,
    comicUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
  } satisfies AvatarResult;
};

export const getDashboardStatsApi = async (): Promise<DashboardStats> => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    totalRegistros: 1360,
    sedeLider: 'Bogotá',
    carreraLider: 'Ingeniería de Sistemas',
    camionLider: 'Cohorte Norte',
    registrosPorFecha: [
      { date: '01', count: 90 },
      { date: '05', count: 120 },
      { date: '10', count: 140 },
      { date: '15', count: 165 },
      { date: '20', count: 200 },
      { date: '25', count: 220 },
      { date: '30', count: 250 },
    ],
    registrosPorSede: [
      { sede: 'Bogotá', total: 430 },
      { sede: 'Medellín', total: 310 },
      { sede: 'Cali', total: 290 },
      { sede: 'Barranquilla', total: 230 },
    ],
    carrerasInteres: [
      { name: 'Ingeniería de Sistemas', total: 420 },
      { name: 'Derecho', total: 320 },
      { name: 'Psicología', total: 270 },
      { name: 'Administración', total: 210 },
      { name: 'Enfermería', total: 190 },
    ],
    distribucionCamion: [
      { name: 'Cohorte Norte', total: 320 },
      { name: 'Cohorte Sur', total: 280 },
      { name: 'Cohorte Centro', total: 260 },
      { name: 'Cohorte Este', total: 210 },
    ],
  };
};

export const getProgramById = (id: string) => programOptions.find((program) => program.id === id);
