export interface iTrajeto {
  id_router: number;
  id_user: number;
  b_km: number;
  b_data: string;
  b_hora: string;
  b_latitude: string;
  b_longitude: string;
  f_km: string;
  f_data: string;
  f_hora: string;
  f_latitude: string;
  f_longitude: string;
}

export interface iUsuario {
  id_user: string
  name: string
  email: string
  phone: string
  access: string
}