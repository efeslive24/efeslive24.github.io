export interface FaqItem {
  q: string;
  a: string;
}

export interface CategoryDef {
  slug: string;
  name: string;
  nameTr: string;
  tagline: string;
  description: string;
  icon: string;
  keywords: string[];
}

export interface ToolDef {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  category: string;
  keywords: string[];
  howTo: string[];
  useCases: string[];
  faq: FaqItem[];
  related: string[];
  isNew?: boolean;
  isPopular?: boolean;
}
