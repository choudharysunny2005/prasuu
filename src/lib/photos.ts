/**
 * Centralized Photo Configuration
 * 
 * Replace the `src` paths below with your actual images anytime!
 * Supported formats: JPG, PNG, WEBP, AVIF.
 * Put your photos in the `public/images/` folder (e.g., `public/images/bus-1.jpg`)
 * and update the `src` string to `/images/bus-1.jpg`.
 * 
 * If no local image exists yet, the component automatically uses an elegant
 * romantic placeholder with glowing bokeh so the design always looks stunning!
 */

export interface PhotoConfig {
  id: string;
  title: string;
  caption?: string;
  src: string; // e.g. "/images/bus_journey_1.jpg"
  aspectRatio?: "portrait" | "landscape" | "square";
  dateOrTag?: string;
}

export const STORY_PHOTOS = {
  // 1. School Reunion & Timeline (5 July & 7 July 2025)
  timeline: [
    {
      id: "timeline-school-reunion",
      title: "5 July 2025",
      caption: "Meeting again after school — after November 2022",
      src: "/images/timeline/school_reunion.jpg",
      aspectRatio: "portrait",
      dateOrTag: "5 July 2025",
    },
    {
      id: "timeline-became-us",
      title: "7 July 2025",
      caption: "Two days later... when we became us",
      src: "/images/timeline/became_us.jpg",
      aspectRatio: "portrait",
      dateOrTag: "7 July 2025",
    },
  ] as PhotoConfig[],

  // 2. Bus Journeys (Sikar ⇄ Jhunjhunu & Rajgarh - 10 Precious Memories)
  bus: [
    {
      id: "bus-photo-1",
      title: "Sikar ⇄ Jhunjhunu",
      caption: "Window seats, headphone sharing, and endless smiles",
      src: "/images/bus/bus_1.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Our Favorite Route",
    },
    {
      id: "bus-photo-2",
      title: "Silly Moments Together",
      caption: "Cute poses and laughing the whole way",
      src: "/images/bus/bus_2.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Inside the Bus",
    },
    {
      id: "bus-photo-3",
      title: "Jhunjhunu → Rajgarh",
      caption: "That one unforgettable journey with you",
      src: "/images/bus/bus_3.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Special Trip",
    },
    {
      id: "bus-photo-4",
      title: "Next to each other",
      caption: "When time completely stopped mattering",
      src: "/images/bus/bus_4.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Window Seat",
    },
    {
      id: "bus-photo-5",
      title: "Just You and Me",
      caption: "Never even noticing when the destination arrived",
      src: "/images/bus/bus_5.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Pure Happiness",
    },
    {
      id: "bus-photo-6",
      title: "Traveling With My Favorite Person",
      caption: "Every kilometer felt like a second with you next to me",
      src: "/images/bus/bus_6.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Bus Journey",
    },
    {
      id: "bus-photo-7",
      title: "Her Precious Smile",
      caption: "The brightest smile in the whole bus",
      src: "/images/bus/bus_7.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Candid Joy",
    },
    {
      id: "bus-photo-8",
      title: "Side by Side",
      caption: "Quiet bus corners and peaceful moments together",
      src: "/images/bus/bus_8.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Memories",
    },
    {
      id: "bus-photo-9",
      title: "Playful Vibes",
      caption: "Shy moments, teasing laughter, and sweet memories",
      src: "/images/bus/bus_9.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Together",
    },
    {
      id: "bus-photo-10",
      title: "Forever My Travel Partner",
      caption: "Leaning close and wishing the ride would never end",
      src: "/images/bus/bus_10.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Unforgettable",
    },
  ] as PhotoConfig[],

  // 3. Late Night Video Calls (6 Real Screenshots)
  videoCalls: [
    {
      id: "call-cozy-beanie",
      title: "Cozy Night Calls",
      caption: "That cute pink beanie and those late night smiles",
      src: "/images/calls/call_1.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Late Night Talks",
    },
    {
      id: "call-matching-heart",
      title: "Making Our Heart Complete",
      caption: "Matching half-hearts across the screen",
      src: "/images/calls/call_2.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Half Hearts ❤️",
    },
    {
      id: "call-laughing-sleepy",
      title: "3:25 AM Uncontrollable Laughter",
      caption: "Messy hair, sleepy eyes, and non-stop giggles",
      src: "/images/calls/call_3.jpg",
      aspectRatio: "portrait",
      dateOrTag: "3:25 AM Laughs",
    },
    {
      id: "call-haldi-fun",
      title: "Silly Moments & Face Packs",
      caption: "Sharing everyday crazy and fun moments together",
      src: "/images/calls/call_4.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Crazy Calls 😂",
    },
    {
      id: "call-sleepy-eyes",
      title: "Sleepy Video Calls",
      caption: "Fighting sleep just to stay on call a little longer",
      src: "/images/calls/call_5.jpg",
      aspectRatio: "portrait",
      dateOrTag: "11:11 PM",
    },
    {
      id: "call-peaceful-sleep",
      title: "Falling Asleep on Call",
      caption: "The sweetest, most peaceful view in the world",
      src: "/images/calls/call_6.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Sleeping on Call 🥺❤️",
    },
  ] as PhotoConfig[],

  // 4. Her Smile & Portrait Gallery (10 Real Photos)
  herGallery: [
    {
      id: "her-sunlight",
      title: "Golden Hour Glow",
      caption: "Sunlight falling gently on your hair and face",
      src: "/images/her/her_1.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Sunlit Beauty",
    },
    {
      id: "her-swing-chair",
      title: "Pure Grace & Comfort",
      caption: "Relaxing on the swing with that calm sweet smile",
      src: "/images/her/her_2.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Cozy & Sweet",
    },
    {
      id: "her-smile-radiant",
      title: "My Favorite Smile ❤️",
      caption: "The smile that lights up my entire world",
      src: "/images/her/her_3.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Purest Joy",
    },
    {
      id: "her-gentle-heart",
      title: "Effortlessly Beautiful",
      caption: "Looking at you and knowing how lucky I am",
      src: "/images/her/her_4.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Simply You",
    },
    {
      id: "her-candid-laugh",
      title: "Your Sweetest Laugh",
      caption: "When you laugh from your heart without a care in the world",
      src: "/images/her/her_5.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Unfiltered Love",
    },
    {
      id: "her-night-smile",
      title: "That Infectious Laughter",
      caption: "Making everyone around you smile just by being you",
      src: "/images/her/her_6.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Laughter & Joy",
    },
    {
      id: "her-beaming-glow",
      title: "Beaming Radiance",
      caption: "That genuine happiness you can see right in your eyes",
      src: "/images/her/her_7.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Radiant",
    },
    {
      id: "her-peace-sign",
      title: "Cute & Playful",
      caption: "Peace signs, silly winks, and adorable energy",
      src: "/images/her/her_8.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Playful Prasuu ✌️",
    },
    {
      id: "her-thoughtful-smirk",
      title: "Thinking of Something Mischievous",
      caption: "That knowing little smile before you say something silly",
      src: "/images/her/her_9.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Cute Smirk 😉",
    },
    {
      id: "her-dreamy-glow",
      title: "Gentle & Dreamy",
      caption: "Soft light, calm thoughts, and pure serenity",
      src: "/images/her/her_10.jpg",
      aspectRatio: "portrait",
      dateOrTag: "Dreamy View",
    },
  ] as PhotoConfig[],

  // 5. Special Moments & Childish Fights
  specialMoments: [
    {
      id: "moment-pout",
      title: "That cute angry pout 😂",
      caption: "Choti choti narazgiyan...",
      src: "/images/moments/cute_pout.jpg",
      aspectRatio: "square",
      dateOrTag: "Cute Fights",
    },
    {
      id: "moment-hand-holding",
      title: "Holding hands",
      caption: "Safe in each other's warmth",
      src: "/images/moments/holding_hands.jpg",
      aspectRatio: "square",
      dateOrTag: "Together",
    },
  ] as PhotoConfig[],
};
