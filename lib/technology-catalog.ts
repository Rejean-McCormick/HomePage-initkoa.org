// Inventaire éditorial vérifié à partir de l'Ecosystem Map et des README des projets.
// Un lien de dépôt est une référence documentaire, pas une certification de maturité.
export type TechnologyCategory =
  | 'foundation'
  | 'coordination'
  | 'knowledge'
  | 'learning'
  | 'creative'
  | 'research';

export type TechnologyEntry = {
  name: string;
  category: TechnologyCategory;
  kind: 'System' | 'Application' | 'Tool' | 'Research' | 'Content';
  description: string;
  repository?: string;
  internal?: string;
};

export const TECHNOLOGY_CATEGORIES: {
  id: TechnologyCategory;
  name: string;
  description: string;
}[] = [
  { id: 'foundation', name: 'Foundations & interoperability', description: 'Hosting, interfaces, contracts, security and access.' },
  { id: 'coordination', name: 'Coordination & action', description: 'Deliberation, organized work and traceable outcomes.' },
  { id: 'knowledge', name: 'Knowledge & language', description: 'Structure, examine and publish knowledge with its provenance.' },
  { id: 'learning', name: 'Learning & transmission', description: 'Design courses and help people learn and share what they know.' },
  { id: 'creative', name: 'Creative tools & interfaces', description: 'Composition, stories, characters and virtual environments.' },
  { id: 'research', name: 'Research & infrastructure', description: 'Research, prototypes and physical infrastructure projects.' },
];

const GH = 'https://github.com/Rejean-McCormick/';

export const TECHNOLOGY_CATALOG: TechnologyEntry[] = [
  // Architecture : les responsabilités ne sont pas interchangeables.
  { name: 'kOA Digital Ecosystem', category: 'foundation', kind: 'System', description: 'Canonical map of the ecosystem components, responsibilities and contracts.', repository: GH + 'kOA-Digital-Ecosystem', internal: '/ecosystem' },
  { name: 'Koali / kOA-Linux', category: 'foundation', kind: 'System', description: 'Local-first host for policy, privileges, system lifecycles and offline operation.', repository: GH + 'kOA-Linux-Koali' },
  { name: 'Koali Spaces', category: 'foundation', kind: 'Application', description: 'Composes spaces and interfaces from validated definitions and manifests.', repository: GH + 'Koali-Spaces' },
  { name: 'Interaction Kernel', category: 'foundation', kind: 'System', description: 'Interoperability profiles for commands, queries, events, receipts and reconciliation.', repository: GH + 'Interaction-Kernel' },
  { name: 'Konfid', category: 'foundation', kind: 'System', description: 'Identity, authorization and policy decisions that effect-owning systems can enforce.', repository: GH + 'Konfid' },
  { name: 'DaaT', category: 'foundation', kind: 'Tool', description: 'Local information bridge for source-linked, rights-filtered context.', repository: GH + 'Daat' },
  { name: 'Koali Control Panel', category: 'foundation', kind: 'Application', description: 'Local operation and visibility under the host system’s authority.', repository: GH + 'Koali-Control-Panel' },
  { name: 'Kristal Integration Pack', category: 'foundation', kind: 'Tool', description: 'Contracts and adapters for exchanging Kristal states.', repository: GH + 'Kristal-Integration-Pack' },

  // Coordination : une interface ne transfère jamais l'autorité à un autre moteur.
  { name: 'Konnaxion', category: 'coordination', kind: 'Application', description: 'Spaces for learning, collaboration, creation, consultation and civic decisions.', repository: GH + 'Konnaxion', internal: '/platforms/konnaxion' },
  { name: 'Konnaxion Worlds', category: 'coordination', kind: 'Application', description: 'Manages the worlds and universes that organize Konnaxion experiences.', repository: GH + 'Konnaxion-Worlds' },
  { name: 'Konnaxion Capsule Manager', category: 'coordination', kind: 'Tool', description: 'Manages capsules and their movement across Konnaxion worlds.', repository: GH + 'Konnaxion-Capsule-Manager' },
  { name: 'Orgo', category: 'coordination', kind: 'Application', description: 'Operational work, from signals and cases to tasks, outcomes and evidence.', repository: GH + 'Orgo', internal: '/platforms/orgo' },
  { name: 'Orgo Worlds', category: 'coordination', kind: 'Application', description: 'Work contexts and spaces connected to Orgo contracts.', repository: GH + 'Orgo-Worlds' },
  { name: 'KeyFlow', category: 'coordination', kind: 'Application', description: 'Multilingual forms with reusable blocks and traceable institutional workflows.', repository: GH + 'KeyFlow-formulaires' },
  { name: 'KonnaxionDiag', category: 'coordination', kind: 'Tool', description: 'Independent diagnostics for Konnaxion. The host owns admission and enforcement.', repository: GH + 'KonnaxionDiag' },
  { name: 'Koali Scenario Mosaic', category: 'coordination', kind: 'Application', description: 'Bilingual atlas of possible responses to recurring sociotechnical problems.', repository: GH + 'Koali-Scenario-Mosaic' },

  // Connaissance : distinguer vérité, lecture, publication et outillage.
  { name: 'Kristal Framework', category: 'knowledge', kind: 'System', description: 'Portable knowledge states with provenance, uncertainty, status and reader policy.', repository: GH + 'Kristal-Framework', internal: '/technology/kristal' },
  { name: 'EncyKlopedia', category: 'knowledge', kind: 'Application', description: 'Source discovery and preparation for traceable encyclopedic workflows.', repository: GH + 'EncyKlopedia' },
  { name: 'Skope', category: 'knowledge', kind: 'Tool', description: 'Local research, graph previews and documented identity workflows.', repository: GH + 'Skope' },
  { name: 'Konstellation', category: 'knowledge', kind: 'Application', description: 'Navigation and explainable views based on authorized Kristal reading surfaces.', repository: GH + 'Konstellation' },
  { name: 'SenTient', category: 'knowledge', kind: 'System', description: 'Semantic interpretation and entity reconciliation from checkable evidence.', repository: GH + 'SenTient', internal: '/technology/sentient' },
  { name: 'SemantiK Architect', category: 'knowledge', kind: 'System', description: 'Renders structured meaning in human languages using qualified language resources.', repository: GH + 'SemantiK-Architect', internal: '/technology/architect' },
  { name: 'Kompiler', category: 'knowledge', kind: 'Tool', description: 'Locally compiles scoped, read-only Context Packs that preserve provenance.', repository: GH + 'Kompiler', internal: '/technology/context-packs' },
  { name: 'Spek', category: 'knowledge', kind: 'Application', description: 'Local composition of multilingual publications from typed editorial units.', repository: GH + 'Spek' },
  { name: 'diK', category: 'knowledge', kind: 'Tool', description: 'Multilingual dictionaries and semantic identities for Kristal, with separate canonical admission.', repository: GH + 'diK' },
  { name: 'Arketype', category: 'knowledge', kind: 'Tool', description: 'Visual archetypes for designing Kristal knowledge workspaces.', repository: GH + 'Arketype' },
  { name: 'Kristal Authoring Kit', category: 'knowledge', kind: 'Tool', description: 'Local authoring and preparation of Kristal knowledge states.', repository: GH + 'Kristal-Authoring-Kit' },
  { name: 'Konstellation Light', category: 'knowledge', kind: 'Tool', description: 'Local reader for Kristal collections, with documented qualification limits.', repository: GH + 'Konstellation-Light' },
  { name: 'Kristalizer', category: 'knowledge', kind: 'Tool', description: 'Analyzes Kristals and prepares candidate mappings for review.', repository: GH + 'Kristalizer' },
  { name: 'Kristal Public', category: 'knowledge', kind: 'System', description: 'Read-only host for authorized Kristal releases.', repository: GH + 'kristal-public' },
  { name: 'Kristal Manager', category: 'knowledge', kind: 'Application', description: 'Manages local Kristal instances, workspaces and files.', repository: GH + 'Kristal-Manager' },
  { name: 'Kontainer', category: 'knowledge', kind: 'Tool', description: 'Portable, verifiable containers with encryption options for Kristal files.', repository: GH + 'Kontainer' },
  { name: 'KristalDiag', category: 'knowledge', kind: 'Tool', description: 'Independent conformance checks for Kristal artifacts and lifecycle steps.', repository: GH + 'KristalDiag' },
  { name: 'MediKristal', category: 'knowledge', kind: 'Research', description: 'Experimental knowledge engineering for medical domains, scoped to engineering evaluation.', repository: GH + 'MediKristal' },

  // Pédagogie et transmission : contenu, orchestration et validation sont distincts.
  { name: 'Ékole', category: 'learning', kind: 'Application', description: 'A learning engine separate from the curricula and their approval.', repository: GH + 'Ekole' },
  { name: 'Ékole Pastorale', category: 'learning', kind: 'Content', description: 'Pastoral learning materials for Ékole, documented as a local prototype.', repository: GH + 'Ekole-Pastorale' },
  { name: 'Ékole Québec', category: 'learning', kind: 'Application', description: 'Québec course and pathway content for Ékole, subject to review.', repository: GH + 'ekole-quebec' },
  { name: 'Kontexte', category: 'learning', kind: 'Application', description: 'Reusable situations, adaptive roles and localized learning activities.', repository: GH + 'Kontexte' },
  { name: 'Kompose', category: 'learning', kind: 'Tool', description: 'Designs, checks and simulates learning capsules locally.', repository: GH + 'Kompose' },
  { name: 'Akor', category: 'learning', kind: 'Application', description: 'Collaborative learning missions that give learners complementary roles.', repository: GH + 'Akor' },
  { name: 'King Klown Univers-City', category: 'learning', kind: 'Application', description: 'Moodle-based courses, challenges, assemblies, archives and educational publications.', repository: GH + 'UCKK' },
  { name: 'Médiathèque', category: 'learning', kind: 'Application', description: 'Preserves sources, snapshots, representations and rights for media resources.', repository: GH + 'Mediatheque' },
  { name: 'Kalendar', category: 'learning', kind: 'Application', description: 'Local, private and printable family and school calendar for Québec.', repository: GH + 'Kalendar' },
  { name: 'UCKK Ops Console', category: 'learning', kind: 'Tool', description: 'Local administration and operational tools for King Klown Univers-City.', repository: GH + 'UCKK-Ops-Console' },

  // Création : ce ne sont pas des systèmes d'autorité.
  { name: 'Kolor', category: 'creative', kind: 'Application', description: 'Bilingual character illustration, posing and export studio.', repository: GH + 'Kolor' },
  { name: 'Karacter', category: 'creative', kind: 'Application', description: 'Character profiles and local worlds for creative writing and scenarios.', repository: GH + 'Karacter' },
  { name: 'BoKristal', category: 'creative', kind: 'Research', description: 'A proposed portable Book-Kristal library for offline reading.', repository: GH + 'BoKristal' },
  { name: 'Ariane', category: 'creative', kind: 'Research', description: 'Models interfaces as states and transitions to guide software navigation.', internal: '/technology/ariane' },

  // Recherche : ne pas assimiler ces travaux à des services déployés.
  { name: 'Âme artificielle / EL', category: 'research', kind: 'Research', description: 'Research into how personality mechanisms, affects and memories can be modelled.', repository: GH + 'Ame-Artificielle', internal: '/technology/ame-artificielle' },
  { name: 'Kristal Farms', category: 'research', kind: 'Research', description: 'Research into flexible computing near renewable energy and under community constraints.', repository: GH + 'Kristal-Farms', internal: '/infrastructures/kristal-farms' },
  { name: 'Kin City', category: 'research', kind: 'Application', description: 'Virtual-city prototype for exploring learning, culture and institutions.', repository: GH + 'Kin-City', internal: '/infrastructures/kin-city' },
  { name: 'LevelUpDiag', category: 'research', kind: 'Tool', description: 'Independent diagnostic tools for checking technical boundaries.', repository: GH + 'LevelUpDiag' },
];
