export interface SafariPriceTable {
  group: string; // "1–2 Pax"
  lowSeason: number;
  peakSeason: number;
}

export interface SafariSubsection {
  subheader: string;
  content?: string;
  prices?: SafariPriceTable[];
}

export interface SafariSection {
  id: string;
  header: string;
  image?: string;
  gallery?: string[];
  content?: string;                 // this is optional for sections with only subsections
  subsections?: SafariSubsection[]; // this is for multiple itineraries under one category...
}
export const safarisMainData: SafariSection[] = [
  {
    id: "safaris-main",
    header: "Safaris Overview",
    content: `
Welcome to our Safaris section.
    `
  }
];
