import { Topic, Mood, Relationship, FontStyle, FontSize, Tone, ShayarStyle } from './types';

export const RELATIONSHIP_OPTIONS = [
    { value: Relationship.Girlfriend, label: "Girlfriend 👩‍❤️‍👨" },
    { value: Relationship.Boyfriend, label: "Boyfriend 👨‍❤️‍💋‍👨" },
    { value: Relationship.Wife, label: "Wife 💍" },
    { value: Relationship.Husband, label: "Husband 🤵" },
    { value: Relationship.Friend, label: "Friend 🤗" },
    { value: Relationship.FamilyMember, label: "Family Member 👨‍👩‍👧‍👦" },
    { value: Relationship.Boss, label: "Boss 👔" },
    { value: Relationship.Client, label: "Client 🤝" },
    { value: Relationship.Colleague, label: "Colleague 🧑‍💼" },
];

export const PERSONAL_RELATIONSHIPS = [
    Relationship.Girlfriend,
    Relationship.Boyfriend,
    Relationship.Wife,
    Relationship.Husband,
    Relationship.Friend,
    Relationship.FamilyMember,
];

export const MOOD_OPTIONS = [
  { value: Mood.Angry, label: "Angry 😠" },
  { value: Mood.Sad, label: "Sad 😢" },
  { value: Mood.Silent, label: "Silent 🤫" },
  { value: Mood.Ignoring, label: "Ignoring 😒" },
  { value: Mood.Disappointed, label: "Disappointed 😞" },
  { value: Mood.MixedEmotions, label: "Mixed Emotions 😕" },
];

export const TOPIC_OPTIONS = [
  { value: Topic.Apology, label: "Apology 💔" },
  { value: Topic.Affection, label: "Affection 🥰" },
  { value: Topic.Reassurance, label: "Reassurance 🤗" },
];

export const TONE_OPTIONS = [
    { value: Tone.Sincere, label: "Sincere 🙏" },
    { value: Tone.Empathetic, label: "Empathetic 🤗" },
    { value: Tone.Humble, label: "Humble 🙇" },
];

export const LANGUAGE_OPTIONS = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Hinglish", label: "Hinglish" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Mandarin", label: "Mandarin" },
    { value: "Arabic", label: "Arabic" },
];

export const FONT_STYLE_OPTIONS = [
    { value: FontStyle.Elegant, label: "Elegant ✒️" },
    { value: FontStyle.Casual, label: "Casual 😊" },
    { value: FontStyle.Formal, label: "Formal 💼" },
    { value: FontStyle.Playful, label: "Playful 🎉" },
];

export const FONT_STYLE_MAP: Record<FontStyle, string> = {
    [FontStyle.Elegant]: "'Great Vibes', cursive",
    [FontStyle.Casual]: "'Poppins', sans-serif",
    [FontStyle.Formal]: "'Cormorant Garamond', serif",
    [FontStyle.Playful]: "'Patrick Hand', cursive",
};

export const FONT_SIZE_OPTIONS = [
    { value: FontSize.Small, label: "Small" },
    { value: FontSize.Medium, label: "Medium" },
    { value: FontSize.Large, label: "Large" },
];

export const FONT_SIZE_MAP: Record<FontSize, string> = {
    [FontSize.Small]: "1rem",
    [FontSize.Medium]: "1.2rem",
    [FontSize.Large]: "1.4rem",
};

export const SHAYAR_STYLE_OPTIONS = [
    { value: ShayarStyle.None, label: "Default Style ✨" },
    { value: ShayarStyle.Ghalib, label: "Mirza Ghalib (Classical, Philosophical) 📜" },
    { value: ShayarStyle.JaunElia, label: "Jaun Elia (Modern, Melancholic) 😔" },
    { value: ShayarStyle.Gulzar, label: "Gulzar (Contemporary, Conversational) ✍️" },
    { value: ShayarStyle.Faiz, label: "Faiz Ahmed Faiz (Revolutionary, Romantic) ❤️" },
    { value: ShayarStyle.Iqbal, label: "Allama Iqbal (Philosophical, Spiritual) 🌟" },
    { value: ShayarStyle.Faraz, label: "Ahmad Faraz (Romantic, Modern Ghazal) 🌹" },
];


export const DEFAULT_COLORS = {
  background: "#FF9999",
};

export const MISTAKE_PLACEHOLDERS: Record<Relationship, Partial<Record<Mood, string>>> = {
  [Relationship.Girlfriend]: {
    [Mood.Angry]: "e.g., I broke a serious promise and she feels betrayed.",
    [Mood.Sad]: "e.g., I said something very insensitive that hurt her feelings.",
    [Mood.Silent]: "e.g., I wasn't there for her when she needed me, and now she's withdrawn.",
    [Mood.Ignoring]: "e.g., I was completely distracted on my phone while she was trying to talk to me.",
    [Mood.Disappointed]: "e.g., I forgot our anniversary and made her feel unimportant.",
    [Mood.MixedEmotions]: "e.g., I made a big decision that affects us both without asking her first."
  },
  [Relationship.Boyfriend]: {
    [Mood.Angry]: "e.g., I was being possessive and didn't trust him.",
    [Mood.Sad]: "e.g., I dismissed his feelings and told him he was overreacting.",
    [Mood.Silent]: "e.g., I acted cold and distant after a small disagreement.",
    [Mood.Ignoring]: "e.g., I haven't been responding to his texts or calls after our argument.",
    [Mood.Disappointed]: "e.g., I didn't show up to support him at an important event.",
    [Mood.MixedEmotions]: "e.g., I wasn't being honest about something and he found out."
  },
  [Relationship.Wife]: {
    [Mood.Angry]: "e.g., I went behind her back on a major financial decision.",
    [Mood.Sad]: "e.g., I took her for granted and haven't shown any appreciation lately.",
    [Mood.Silent]: "e.g., I've been emotionally distant and not sharing what's on my mind.",
    [Mood.Ignoring]: "e.g., I've been avoiding a serious conversation we need to have.",
    [Mood.Disappointed]: "e.g., I broke my promise to help more around the house.",
    [Mood.MixedEmotions]: "e.g., I sided with my family over her in a disagreement."
  },
  [Relationship.Husband]: {
    [Mood.Angry]: "e.g., I criticized him in front of his friends and embarrassed him.",
    [Mood.Sad]: "e.g., I forgot something that was really important to him.",
    [Mood.Silent]: "e.g., I've been giving him the silent treatment instead of talking things out.",
    [Mood.Ignoring]: "e.g., I've been shutting down his attempts to connect with me.",
    [Mood.Disappointed]: "e.g., I wasn't supportive of a new career goal he has.",
    [Mood.MixedEmotions]: "e.g., I overstepped and tried to 'fix' a problem for him without asking."
  },
  [Relationship.Friend]: {
    [Mood.Angry]: "e.g., I shared a secret they told me in confidence.",
    [Mood.Sad]: "e.g., I wasn't there for them when they were going through a really hard time.",
    [Mood.Silent]: "e.g., We had a misunderstanding and now things are just awkward.",
    [Mood.Ignoring]: "e.g., I bailed on our plans last-minute without a good excuse.",
    [Mood.Disappointed]: "e.g., I forgot their birthday.",
    [Mood.MixedEmotions]: "e.g., I was selfish and didn't consider their feelings in a situation."
  },
  [Relationship.FamilyMember]: {
    [Mood.Angry]: "e.g., I said something disrespectful during a heated family argument.",
    [Mood.Sad]: "e.g., I missed a major life event like a graduation or birthday.",
    [Mood.Silent]: "e.g., There's an unresolved issue from years ago that's causing tension.",
    [Mood.Ignoring]: "e.g., I haven't called or reached out in a very long time.",
    [Mood.Disappointed]: "e.g., I didn't keep a promise I made to them.",
    [Mood.MixedEmotions]: "e.g., I gave unsolicited advice that came across as judgmental."
  },
  [Relationship.Boss]: {
    [Mood.Angry]: "e.g., I went over their head to their superior without talking to them first.",
    [Mood.Sad]: "e.g., I publicly questioned their decision in a way that undermined them.",
    [Mood.Silent]: "e.g., The atmosphere has been tense since my last performance review.",
    [Mood.Ignoring]: "e.g., I've been avoiding them since I made a major mistake on a project.",
    [Mood.Disappointed]: "e.g., I missed a critical deadline that affected the whole team.",
    [Mood.MixedEmotions]: "e.g., I handled a client situation poorly which reflected badly on my boss."
  },
  [Relationship.Client]: {
    [Mood.Angry]: "e.g., The project is significantly delayed and I didn't communicate it properly.",
    [Mood.Sad]: "e.g., They feel we didn't listen to their feedback on the last deliverable.",
    [Mood.Silent]: "e.g., They haven't responded to emails since we had a budget disagreement.",
    [Mood.Ignoring]: "e.g., We missed a scheduled call and haven't followed up.",
    [Mood.Disappointed]: "e.g., The final product did not meet the quality standards they were expecting.",
    [Mood.MixedEmotions]: "e.g., There was a miscommunication about the scope of work which has caused issues."
  },
  [Relationship.Colleague]: {
    [Mood.Angry]: "e.g., I took credit for an idea that wasn't mine.",
    [Mood.Sad]: "e.g., I left them out of an important email chain or meeting.",
    [Mood.Silent]: "e.g., We have different working styles and it created friction on a project.",
    [Mood.Ignoring]: "e.g., I didn't pull my weight on our shared task, leaving them to do it all.",
    [Mood.Disappointed]: "e.g., I spoke negatively about them to another coworker.",
    [Mood.MixedEmotions]: "e.g., I was too direct when giving feedback and it came across as rude."
  }
};