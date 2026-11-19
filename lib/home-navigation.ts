import { navigation } from "./site-navigation";

const frenchLabels: Record<string, string> = {
  "Explore": "Explorer",
  "What you can do": "Les parcours",
  "Koali Scenario Mosaic": "Scénarios Koali",
  "Ecosystem": "Écosystème",
  "Systems and responsibilities": "Systèmes et responsabilités",
  "Ecosystem Connections": "Carte des connexions",
  "Functional chains": "Parcours fonctionnels",
  "Platforms": "Plateformes",
  "Technology catalog": "Catalogue technologique",
  "Infrastructures": "Infrastructures",
  "Learning & Culture": "Culture",
  "Learning and publishing": "Apprendre et publier",
  "King Klown Univers-City": "King Klown Univers-City",
  "Kin City": "Kin City",
  "Kréature": "Kréature",
  "Watch & Listen": "Regarder et écouter",
  "Research & Proposals": "Projets",
  "The kOA Initiative": "L’initiative kOA",
  "Why kOA?": "Pourquoi kOA ?",
  "Research": "Recherche",
  "Civic Governance Proposal": "Gouvernance civique",
  "Kristal Farms": "Kristal Farms",
  "Ukraine Peace Plan": "Plan de paix pour l’Ukraine",
  "Evidence & Documentation": "Documentation",
  "Evidence and status": "Preuves et état des travaux",
  "Engineering audit": "Audit technique",
  "Reading library": "Bibliothèque",
  "Context Packs": "Dossiers de contexte",
  "About": "À propos"
};

export const homeNavigation = navigation.map((group) => ({
  ...group,
  label: frenchLabels[group.label] ?? group.label,
  links: group.links.map((link) => ({
    ...link,
    label: frenchLabels[link.label] ?? link.label,
    keywords: link.keywords + " " + link.label,
  })),
}));
