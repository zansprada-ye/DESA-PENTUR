
export enum ViewMode {
  PUBLIC = 'PUBLIC',
  ADMIN = 'ADMIN'
}

export enum LetterType {
  SKU = 'Surat Keterangan Usaha',
  DOMISILI = 'Surat Domisili',
  SKTM = 'Surat Keterangan Tidak Mampu'
}

export enum LetterStatus {
  PENDING = 'PENDING',
  PROCESSED = 'DIPROSES',
  COMPLETED = 'SELESAI',
  REJECTED = 'DITOLAK'
}

export interface Resident {
  id: string;
  nik: string;
  name: string;
  address: string;
  phone: string;
  status: string;
}

export interface LetterRequest {
  id: string;
  residentName: string;
  type: LetterType;
  status: LetterStatus;
  date: string;
  description: string;
}

export interface NewsPost {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
