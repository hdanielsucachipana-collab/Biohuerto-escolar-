export type Page = 'home' | 'logbook' | 'join' | 'forum';

export interface Message {
  id: number;
  user: string;
  text: string;
  timestamp: string;
}

export interface Suggestion {
  id: number;
  text: string;
}

export interface ClubApplication {
  id: number;
  name: string;
  grade: string;
  reason: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface GalleryItem {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}
