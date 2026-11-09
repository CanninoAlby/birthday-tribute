export interface ReasonItem {
  id: number;
  title?: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string; // Optional: iPhone Live Photo video (.mp4 or .mov)
  isLivePhoto?: boolean;
  date?: string;
  location?: string;
  tag?: string;
}

export interface MemorySnapshot {
  id: number;
  imageUrl: string;
  videoUrl?: string; // Optional Live Photo video
  caption: string;
  date?: string;
  location?: string;
}

export interface GiftConfig {
  recipient: {
    name: string;
    nickname?: string;
    age?: number;
    birthdayDate: string; // e.g. "November 9"
  };
  security: {
    passcode: string; // e.g. "0911" or her birthdate or secret word
    passcodeHint: string;
    lockScreenTitle: string;
    lockScreenSubtitle: string;
  };
  audio: {
    title: string;
    artist: string;
    audioUrl: string; // URL to mp3 or local asset
    autoPlayPrompt: string;
  };
  hero: {
    badge: string;
    title: string;
    titleNumber?: string;
    titleLine1?: string;
    titleLine2?: string;
    subtitle: string;
    scrollPrompt: string;
  };
  reasons: ReasonItem[];
  memories: MemorySnapshot[];
  finale: {
    cakeTitle: string;
    cakeSubtitle: string;
    blowCandlesPrompt: string;
    candlesBlownMessage: string;
    letterTitle: string;
    letterSalutation: string;
    letterBody: string[];
    letterClosing: string;
    senderName: string;
  };
}
