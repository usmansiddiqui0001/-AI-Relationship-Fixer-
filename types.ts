export enum Relationship {
  Girlfriend = "Girlfriend",
  Boyfriend = "Boyfriend",
  Wife = "Wife",
  Husband = "Husband",
  Friend = "Friend",
  FamilyMember = "Family Member",
  Boss = "Boss",
  Client = "Client",
  Colleague = "Colleague",
}

export enum Mood {
  Angry = "Angry 😠",
  Sad = "Sad 😢",
  Silent = "Silent 🤫",
  Ignoring = "Ignoring 😒",
  Disappointed = "Disappointed 😞",
  MixedEmotions = "Mixed Emotions 😕",
}

export enum Topic {
  Apology = "Apology 💔",
  Affection = "Affection 🥰",
  Reassurance = "Reassurance 🤗",
}

export enum Tone {
    Sincere = "Sincere",
    Empathetic = "Empathetic",
    Humble = "Humble",
}

export enum FontStyle {
    Elegant = "Elegant",
    Casual = "Casual",
    Formal = "Formal",
    Playful = "Playful"
}

export enum FontSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
}

export enum ShayarStyle {
    None = "None",
    Ghalib = "Mirza Ghalib",
    JaunElia = "Jaun Elia",
    Gulzar = "Gulzar",
    Faiz = "Faiz Ahmed Faiz",
    Iqbal = "Allama Iqbal",
    Faraz = "Ahmad Faraz",
}

export interface FormData {
  relationship: Relationship;
  mood: Mood;
  mistake: string;
  topic: Topic;
  tone: Tone;
  useEmojis: boolean;
  language: string;
  fontStyle: FontStyle;
  fontSize: FontSize;
  colors: {
    background: string;
  };
  shayarStyle?: ShayarStyle;
}