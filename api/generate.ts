import { GoogleGenAI } from "@google/genai";

// --- START of Self-Contained Types and Constants ---
// This makes the Edge Function independent of the /src folder, fixing Vercel build errors.

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

export const PERSONAL_RELATIONSHIPS = [
    Relationship.Girlfriend,
    Relationship.Boyfriend,
    Relationship.Wife,
    Relationship.Husband,
    Relationship.Friend,
    Relationship.FamilyMember,
];

// --- END of Self-Contained Types and Constants ---


// This tells Vercel to run this function as an Edge Function for speed.
export const config = {
  runtime: 'edge',
};

const generatePrompt = (data: FormData): string => {
  let languageRule = `The entire message must be written in **${data.language}**.`;
  if (data.language === 'Hindi') {
    languageRule = `The entire message must be written in a conversational, modern style of Hindi. Avoid overly formal or 'shuddh' (pure) literary Hindi. The tone should be natural and easy to understand, like how people speak in everyday life. It's acceptable to use commonly understood English words if it makes the message sound more natural (similar to Hinglish).`;
  }

  const isPersonal = PERSONAL_RELATIONSHIPS.includes(data.relationship);
  
  let shayariRule = '';
  if (isPersonal) {
    const shayariStylePrompt = data.shayarStyle && data.shayarStyle !== ShayarStyle.None
      ? `The Shayari MUST be written in the distinct style of the famous poet **${data.shayarStyle}**. Capture their unique tone, themes, and vocabulary.`
      : '';

    shayariRule = `- **Shayari Addition:** After the main message, create a visible gap by adding **two empty paragraph tags (<p></p><p></p>)**. Immediately after this gap, add a short, relevant, two-line Shayari (poetic couplet), with each line of the Shayari in its own <p> tag. ${shayariStylePrompt} The Shayari must also be in ${data.language}.`;
  }

  return `
You are an emotionally intelligent AI Relationship Fixer. Your job is to help users repair their personal or professional relationships by generating a heartfelt message.

**Your Instructions:**
1.  Adopt a kind, warm, and emotionally expressive tone that matches the user's requested style and tone.
2.  Generate a heartfelt message tailored to the user’s specific situation provided below.
3.  The output MUST be simple HTML using only <p> tags for paragraphs. Do not include <html>, <body>, or <style> tags. The entire response should be just the message content within <p> tags. Each paragraph should be a new <p> tag. A "two-line gap" should be created by adding an empty paragraph tag like <p></p> between other paragraphs.
4.  Do not add any extra commentary, titles, or explanations outside of the requested message.
5.  **Crucially, the entire response must be in the language specified by the user.**

**User's Situation:**
-   **Relationship with the person:** ${data.relationship}
-   **Their current mood:** ${data.mood}
-   **What I did wrong / The situation:** ${data.mistake}
-   **Type of message I want to send:** ${data.topic}
-   **Desired Tone of the Message:** ${data.tone}
-   **Message Writing Style:** ${data.fontStyle}
-   **Include Emojis:** ${data.useEmojis ? "Yes" : "No"}
-   **Language for Response:** ${data.language}
-   **Shayari Style:** ${data.shayarStyle || 'Default'}

**Specific Content Rules:**
-   ${languageRule}
-   **Tone Guidance:**
    -   The message must strictly adhere to the requested **${data.tone}** tone.
    -   If **Sincere**, the message should be genuine and heartfelt.
    -   If **Empathetic**, it should show deep understanding and compassion for the other person's feelings.
    -   If **Humble**, it should convey humility and a willingness to admit fault without reservation.
-   **Writing Style Guidance:**
    -   If the style is **Elegant**, use more poetic and sophisticated language.
    -   If the style is **Casual**, be more relaxed, direct, and use conversational language.
    -   If the style is **Formal**, maintain a respectful, professional, and structured tone.
    -   If the style is **Playful**, use a lighthearted, fun, and charming tone.
-   If emojis are requested ("Yes"), add appropriate emojis to match the tone (e.g., 😢, ❤️, 💔, 🤝, 🥺, 💐).
-   If the relationship is professional (e.g., Boss, Client, Colleague), the tone must be respectful and sincere, avoiding overly casual language unless the user specifically requested a 'Casual' or 'Playful' style.
-   If the mood is "silent" or "ignoring", the message should be calm, patient, and respectful. It should acknowledge their need for space while gently expressing a desire to resolve the issue.
${shayariRule}

Please generate the personalized message now based on these details, ensuring it is written in ${data.language}.
  `;
};


// The main handler for the serverless function
export default async function handler(req: Request) {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      // This new, more helpful error message tells you exactly what to do.
      return new Response("Configuration Error: The 'API_KEY' environment variable was not found on the server. Please go to your Vercel project's 'Settings' > 'Environment Variables' and add a variable named API_KEY with your Gemini API key. Then, you must redeploy your project for the change to take effect.", { status: 500 });
    }

    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const data: FormData = await req.json();
    
    const ai = new GoogleGenAI({ apiKey });
    const prompt = generatePrompt(data);

    const streamResponse = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // Create a new ReadableStream to pipe the Gemini response through
    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of streamResponse) {
          const text = chunk.text;
          if (text) {
             controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    });

  } catch (error) {
    console.error("Error in API route:", error);
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(`Server error: ${message}`, { status: 500 });
  }
}