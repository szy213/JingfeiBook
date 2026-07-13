export interface LyricCard {
  id: string;
  songTitle: string;
  lyrics: string;
  songLink: string;
  cardName: string;
  isCustom?: boolean;
}

export interface TarotReading {
  question: string;
  card: LyricCard;
  timestamp: number;
}

export interface CardHistoryEntry {
  id?: number;
  user_id: string;
  question: string;
  card_id: string;
  card_name: string;
  song_title: string;
  lyrics: string;
  is_secret: boolean;
  created_at?: string;
}
