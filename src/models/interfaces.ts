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
