export type ProgramOption = {
  id: string;
  name: string;
  campus: string;
  modalidad: string;
  color: string;
  description: string;
};

export type LeadFormData = {
  fullName: string;
  phone: string;
  email: string;
  program: string;
  campus: string;
  photo: string;
};

export type AvatarResult = {
  avatarUrl: string;
  comicUrl: string;
};

export type DashboardStats = {
  totalRegistros: number;
  sedeLider: string;
  carreraLider: string;
  camionLider: string;
  registrosPorFecha: Array<{ date: string; count: number }>;
  registrosPorSede: Array<{ sede: string; total: number }>;
  carrerasInteres: Array<{ name: string; total: number }>;
  distribucionCamion: Array<{ name: string; total: number }>;
};
