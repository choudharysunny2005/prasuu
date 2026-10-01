export interface MemoryItem {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  dateTag: string;
  iconType: "chat" | "laugh" | "star" | "heart" | "sparkles";
  position3D: [number, number, number];
  accentColor: string;
}

export const MEMORIES_DATA: MemoryItem[] = [
  {
    id: "memory-1",
    title: "That first conversation ❤️",
    subtitle: "The night everything began",
    dateTag: "Day 1",
    iconType: "chat",
    position3D: [-2.2, 1.1, -1.2],
    accentColor: "#f43f5e",
    content:
      "I still remember the very first time we talked. What was supposed to be a short hello turned into hours of talking like we'd known each other forever. I knew right then that you were someone incredibly special.",
  },
  {
    id: "memory-2",
    title: "That one day we couldn't stop laughing 😂",
    subtitle: "Tears in our eyes & sore cheeks",
    dateTag: "Unforgettable Day",
    iconType: "laugh",
    position3D: [2.2, 0.9, -2.6],
    accentColor: "#fbbf24",
    content:
      "That silly moment when both of us completely lost it and couldn't stop laughing. My stomach literally hurt from laughing so much with you. Seeing you genuinely happy and smiling like that is my absolute favorite thing in the world.",
  },
  {
    id: "memory-3",
    title: "Our favorite memory",
    subtitle: "A moment paused in time",
    dateTag: "Pure Magic",
    iconType: "heart",
    position3D: [-2.0, -1.1, -4.0],
    accentColor: "#ec4899",
    content:
      "That peaceful, perfect moment together where the whole world just faded away into the background. It felt like time stood completely still, and I just wished that moment would never end.",
  },
  {
    id: "memory-4",
    title: "That moment I realized how special you are",
    subtitle: "When my heart knew",
    dateTag: "The Turning Point",
    iconType: "star",
    position3D: [1.9, -0.9, -5.5],
    accentColor: "#a855f7",
    content:
      "There was this one specific moment when I looked at you and realized just how deeply you mattered to me. It wasn't loud or dramatic—just a quiet, undeniable feeling that you are irreplaceable.",
  },
  {
    id: "memory-5",
    title: "And all the little moments...",
    subtitle: "The random everyday magic",
    dateTag: "Every Single Day",
    iconType: "sparkles",
    position3D: [0.0, 1.6, -6.8],
    accentColor: "#38bdf8",
    content:
      "The random late night calls, the silly memes, the quiet pauses where we don't even have to say anything to understand each other. It's all these tiny, unnoticed moments with you that mean the most.",
  },
];
