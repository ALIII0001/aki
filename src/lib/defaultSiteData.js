import { visuals } from "./visuals.js";

export const defaultProjects = [
  {
    id: "b29Kepe4tms",
    title: "Cut One",
    category: "Brand Film",
    description: "A cinematic showcase cut for mood and retention.",
    video_url: "https://youtu.be/b29Kepe4tms",
    thumbnail_url: "https://img.youtube.com/vi/b29Kepe4tms/maxresdefault.jpg",
    featured: true,
    published: true,
    display_order: 1,
    created_at: "2026-04-28T00:00:00.000Z"
  },
  {
    id: "XqCPoUJ8754",
    title: "Cut Two",
    category: "Music Visual",
    description: "A rhythm-first edit built to land fast.",
    video_url: "https://youtu.be/XqCPoUJ8754",
    thumbnail_url: "https://img.youtube.com/vi/XqCPoUJ8754/maxresdefault.jpg",
    featured: false,
    published: true,
    display_order: 2,
    created_at: "2026-04-28T00:00:00.000Z"
  }
];

export const defaultSiteContent = {
  id: "default",
  brand_name: "Ali Khan Films",
  hero_title: "Turning raw clips into engaging stories",
  hero_subtitle:
    "Raw footage is just noise until it's cut right.\nWe craft edits that hook fast, hit harder, and stay with the viewer.",
  hero_primary_button: "Watch Work",
  hero_secondary_button: "Start a Project",
  intro_heading: "Not just edits. Experiences.",
  intro_text: "Every frame is shaped to pull attention instantly and hold it longer than expected.",
  impact_heading: "Hook faster. Feel deeper. Stay longer.",
  impact_text: "Not just clean edits - cuts that make people stop, watch, and remember.",
  capability_1: "Brand films that feel premium",
  capability_2: "Music videos with rhythm",
  capability_3: "Launch edits that create hype",
  capability_4: "Reels that don't get skipped",
  capability_5: "Story-driven cinematic cuts",
  process_heading: "Rhythm built on purpose.",
  process_step_1_title: "Find the story",
  process_step_1_text: "We go beyond clips. We find the moment that matters.",
  process_step_2_title: "Build the flow",
  process_step_2_text: "Timing, sound, silence - shaped to hold attention.",
  process_step_3_title: "Deliver for impact",
  process_step_3_text: "Every format optimized for where it lives.",
  work_heading: "Edits that don't just play - they land.",
  work_subtext: "Built for impact, not just views.",
  services_detail_heading: "Precision in every cut.",
  services_detail_intro: "Premium by feel. Focused by design. Every format built to land harder.",
  service_1_title: "Direction & Cinematography",
  service_1_text: "Visuals designed to cut better",
  service_2_title: "Video Editing",
  service_2_text: "Where raw footage becomes emotion",
  service_3_title: "Campaign & Social Cuts",
  service_3_text: "Built for retention and replay",
  service_4_title: "Content Packages",
  service_4_text: "One story. Multiple formats.",
  statement_text: "If it doesn't hold attention, it doesn't work.",
  studio_note_heading: "Less noise. More impact.",
  studio_note_text: "Timing. Emotion. The right cut at the right second.",
  final_cta_heading: "Bring the footage. We'll build the story.",
  final_cta_text: "From raw clips to finished films - built to be watched, not skipped.",
  footer_text: "Ali Khan Films. Built for attention."
};

export const defaultThemeSettings = {
  id: "default",
  primary_color: "#f4efe7",
  accent_color: "#c7a05c",
  background_style: "cinematic",
  font_style: "editorial",
  button_style: "pill",
  hero_image_url: visuals.heroFilmShoot,
  craft_image_url: visuals.editingSetup,
  impact_image_url: visuals.watchProduct,
  grain_enabled: true,
  animations_enabled: true
};

export const defaultSiteSettings = {
  id: "default",
  whatsapp_number: "918462091288",
  instagram_url: "https://www.instagram.com/",
  youtube_url: "",
  email: "",
  location: "",
  booking_link: "#contact",
  booking_button_text: "Start a Project"
};

export function mergeThemeSettings(theme) {
  return {
    ...defaultThemeSettings,
    ...theme,
    hero_image_url: theme?.hero_image_url || defaultThemeSettings.hero_image_url,
    craft_image_url: theme?.craft_image_url || defaultThemeSettings.craft_image_url,
    impact_image_url: theme?.impact_image_url || defaultThemeSettings.impact_image_url
  };
}

