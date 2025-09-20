import { Relationship, Mood, Topic, Tone } from './types';

export interface Template {
  label: string;
  data: {
    relationship: Relationship;
    mood: Mood;
    mistake: string;
    topic: Topic;
    tone: Tone;
  };
}

export const MESSAGE_TEMPLATES: Template[] = [
  {
    label: "Forgot Anniversary 🤦‍♀️",
    data: {
      relationship: Relationship.Wife,
      mood: Mood.Disappointed,
      mistake: "I completely forgot about our anniversary. I know how much it means to you and I have no excuse. I feel terrible for letting you down and making you feel unimportant.",
      topic: Topic.Apology,
      tone: Tone.Sincere,
    },
  },
  {
    label: "Said Something Hurtful 💬",
    data: {
      relationship: Relationship.Friend,
      mood: Mood.Sad,
      mistake: "What I said the other day was completely out of line and insensitive. I wasn't thinking, and I deeply regret hurting your feelings.",
      topic: Topic.Apology,
      tone: Tone.Humble,
    },
  },
  {
    label: "Missed a Deadline ⏰",
    data: {
      relationship: Relationship.Boss,
      mood: Mood.Disappointed,
      mistake: "I sincerely apologize for missing the deadline on the project. I take full responsibility for this oversight and understand the impact it has on the team.",
      topic: Topic.Apology,
      tone: Tone.Humble,
    },
  },
  {
    label: "Reassurance ❤️",
    data: {
      relationship: Relationship.Girlfriend,
      mood: Mood.Silent,
      mistake: "I know we've been a bit distant lately, and I want you to know that you're the most important person in my life. I love you more than words can say, and I want to fix whatever is wrong.",
      topic: Topic.Reassurance,
      tone: Tone.Sincere,
    },
  },
  {
    label: "Just Because 🥰",
    data: {
        relationship: Relationship.Boyfriend,
        mood: Mood.MixedEmotions, // Mood doesn't matter much for this one
        mistake: "Just wanted to send a little message to say I'm thinking about you and how much you mean to me. You make every day better.",
        topic: Topic.Affection,
        tone: Tone.Sincere,
    },
  },
  {
    label: "Family Argument 👨‍👩‍👧",
    data: {
        relationship: Relationship.FamilyMember,
        mood: Mood.Angry,
        mistake: "I'm sorry for my part in our argument. Things got heated, and I said things I didn't mean. Your relationship is more important to me than being right.",
        topic: Topic.Apology,
        tone: Tone.Empathetic,
    },
  }
];
