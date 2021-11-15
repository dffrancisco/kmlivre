export interface CertificateOpts {
  key: string;
  cert: string;
  ca: string;
}

export interface iSchool {
  id_school: string;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  responsavel: string;
  uuid: string;
  ip: string;
  data: Date;
  hora: Date;
  ativa: string;
  data_cad: Date;
  token: string;
  valid_until: Date;
}


export interface iTrajeto { 
  id_router:number;
  id_user:number;
  b_km:number;
  b_data:string;
  b_hora:string;
  b_latitude:string;
  b_longitude:string;
  f_km:string;
  f_data:string;
  f_hora:string;
  f_latitude:string;
  f_longitude:string;
}