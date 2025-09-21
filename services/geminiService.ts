import { GoogleGenAI } from "@google/genai";
import { type FormData, ShayarStyle } from '../types';
import { PERSONAL_RELATIONSHIPS } from "../constants";

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

export const generateRelationshipMessageStream = async (data: FormData): Promise<AsyncGenerator<string>> => {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      // This user-friendly error will be shown in the UI instead of crashing the app.
      const userFriendlyError = "Configuration Error: The API Key is missing. Please ensure the API_KEY is set correctly in your project's environment variables on Vercel.";
      console.error(userFriendlyError);
      throw new Error(userFriendlyError);
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = generatePrompt(data);
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    async function* stream() {
        for await (const chunk of response) {
            yield chunk.text;
        }
    }

    return stream();
};
