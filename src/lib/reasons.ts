export interface ReasonItem {
  id: string;
  title: string;
  tagline: string;
  message: string;
  accentColor: string;
  iconType: "heart" | "sparkles" | "smile" | "shield" | "flame";
  position3D: [number, number, number];
}

export const REASONS_DATA: ReasonItem[] = [
  {
    id: "reason-1",
    title: "Your smile ❤️",
    tagline: "The light in any room",
    message:
      "There is something genuinely captivating about your smile. Even on the heaviest days, just seeing you genuinely smile instantly makes everything around feel softer, brighter, and right again.",
    accentColor: "#f43f5e",
    iconType: "heart",
    position3D: [-2.4, 0.8, -1.0],
  },
  {
    id: "reason-2",
    title: "The way you care",
    tagline: "Pure, selfless warmth",
    message:
      "You care with your whole heart. The quiet thoughtfulness you show, the little details you remember, and how genuinely you look out for the people you love is one of the things I respect most about you.",
    accentColor: "#fb7185",
    iconType: "shield",
    position3D: [2.3, 0.7, -2.2],
  },
  {
    id: "reason-3",
    title: "Your little angry face 😂",
    tagline: "The cutest thing in the world",
    message:
      "Even when you try so hard to look angry or make that grumpy pout at me, you are impossibly adorable. I know I shouldn't laugh when you're mad, but it's just too sweet not to smile.",
    accentColor: "#f59e0b",
    iconType: "smile",
    position3D: [-2.0, -1.0, -3.4],
  },
  {
    id: "reason-4",
    title: "The way you understand me",
    tagline: "Without needing words",
    message:
      "You have this effortless way of understanding things I never even know how to explain out loud. Being with you feels like home because I can just be myself, completely and safely.",
    accentColor: "#a855f7",
    iconType: "sparkles",
    position3D: [2.1, -0.9, -4.6],
  },
  {
    id: "reason-5",
    title: "Simply... you.",
    tagline: "Every single part of who you are",
    message:
      "All your little habits, your laughter, your quiet moments, and everything that makes you who you are. Out of everyone in the entire world, it will always and unconditionally be you.",
    accentColor: "#ec4899",
    iconType: "flame",
    position3D: [0.0, 1.4, -5.8],
  },
];
