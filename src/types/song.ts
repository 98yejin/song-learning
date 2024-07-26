export interface Song {
  description: string;
  lyrics: {
    english: string;
    korean: string;
  }[];
  title: string;
}

export interface SongActionProps {
  lyric: {
    english: string;
    korean: string;
  };
  tts: boolean;
  autoNavigate: boolean;
  onResultUpdate: (isCorrect: boolean) => void;
}
