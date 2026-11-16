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
  kind: 'Système' | 'Application' | 'Outil' | 'Recherche' | 'Corpus';
  description: string;
  repository?: string;
  internal?: string;
};

export const TECHNOLOGY_CATEGORIES: {
  id: TechnologyCategory;
  name: string;
  description: string;
}[] = [
  { id: 'foundation', name: 'Socle & interopérabilité', description: 'Système hôte, contrats, interfaces, sécurité et accès aux informations.' },
  { id: 'coordination', name: 'Coordination & action', description: 'Délibérer, organiser le travail et faire circuler les preuves d’exécution.' },
  { id: 'knowledge', name: 'Connaissance & langage', description: 'Structurer, examiner, explorer et publier la connaissance sans effacer sa provenance.' },
  { id: 'learning', name: 'Éducation & transmission', description: 'Concevoir des parcours, partager des ressources et apprendre ensemble.' },
  { id: 'creative', name: 'Création & interfaces', description: 'Outils de composition, narration, personnages et environnements.' },
  { id: 'research', name: 'Recherche & infrastructures', description: 'Prototypes et projets physiques, distincts des composants opérationnels.' },
];

const GH = 'https://github.com/Rejean-McCormick/';

export const TECHNOLOGY_CATALOG: TechnologyEntry[] = [
  // Architecture : les responsabilités ne sont pas interchangeables.
  { name: 'kOA Digital Ecosystem', category: 'foundation', kind: 'Système', description: 'Carte canonique des composants, responsabilités et contrats de l’écosystème.', repository: GH + 'kOA-Digital-Ecosystem', internal: '/ecosystem' },
  { name: 'Koali / kOA-Linux', category: 'foundation', kind: 'Système', description: 'Système hôte local-first : politiques, privilèges, cycle de vie et continuité hors ligne.', repository: GH + 'kOA-Linux-Koali' },
  { name: 'Koali Spaces', category: 'foundation', kind: 'Application', description: 'Composition d’espaces et d’interfaces à partir de définitions et manifestes validés.', repository: GH + 'Koali-Spaces' },
  { name: 'Interaction Kernel', category: 'foundation', kind: 'Système', description: 'Contrats d’interopérabilité pour commandes, requêtes, événements, reçus et réconciliation.', repository: GH + 'Interaction-Kernel' },
  { name: 'Konfid', category: 'foundation', kind: 'Système', description: 'Contrôles transversaux d’identité, d’autorisation, de risque et de réponse auditable.', repository: GH + 'Konfid' },
  { name: 'DaaT', category: 'foundation', kind: 'Outil', description: 'Pont d’information produisant localement des contextes sourcés et filtrés selon les droits.', repository: GH + 'Daat' },
  { name: 'Koali Control Panel', category: 'foundation', kind: 'Application', description: 'Pilotage local et visibilité de l’environnement Koali, sous les autorités du système hôte.', repository: GH + 'Koali-Control-Panel' },
  { name: 'Kristal Integration Pack', category: 'foundation', kind: 'Outil', description: 'Contrats et adaptateurs explicites pour les échanges autour des états Kristal.', repository: GH + 'Kristal-Integration-Pack' },

  // Coordination : une interface ne transfère jamais l'autorité à un autre moteur.
  { name: 'Konnaxion', category: 'coordination', kind: 'Application', description: 'Coordination civique, consultation, délibération et intelligence collective.', repository: GH + 'Konnaxion', internal: '/platforms/konnaxion' },
  { name: 'Konnaxion Worlds', category: 'coordination', kind: 'Application', description: 'Organisation des univers et mondes qui structurent des expériences Konnaxion.', repository: GH + 'Konnaxion-Worlds' },
  { name: 'Konnaxion Capsule Manager', category: 'coordination', kind: 'Outil', description: 'Gestion des capsules et de leur circulation dans les univers Konnaxion.', repository: GH + 'Konnaxion-Capsule-Manager' },
  { name: 'Orgo', category: 'coordination', kind: 'Application', description: 'Exécution opérationnelle : signalement, dossier, processus, tâche, résultat et preuve.', repository: GH + 'Orgo', internal: '/platforms/orgo' },
  { name: 'Orgo Worlds', category: 'coordination', kind: 'Application', description: 'Contextes d’expérience et espaces de travail reliés aux contrats d’Orgo.', repository: GH + 'Orgo-Worlds' },
  { name: 'KeyFlow', category: 'coordination', kind: 'Application', description: 'Formulaires multilingues à blocs réutilisables et workflows institutionnels traçables.', repository: GH + 'KeyFlow-formulaires' },
  { name: 'KonnaxionDiag', category: 'coordination', kind: 'Outil', description: 'Diagnostic fonctionnel et de sécurité indépendant ; l’admission et son application restent contrôlées par le système hôte.', repository: GH + 'KonnaxionDiag' },
  { name: 'Koali Scenario Mosaic', category: 'coordination', kind: 'Application', description: 'Atlas bilingue de problèmes sociotechniques et de parcours de réponse possibles.', repository: GH + 'Koali-Scenario-Mosaic' },

  // Connaissance : distinguer vérité, lecture, publication et outillage.
  { name: 'Kristal Framework', category: 'knowledge', kind: 'Système', description: 'États de connaissance portables : provenance, incertitude, statut et politique de lecture.', repository: GH + 'Kristal-Framework', internal: '/technology/kristal' },
  { name: 'EncyKlopedia', category: 'knowledge', kind: 'Application', description: 'Découverte, acquisition et préparation de sources pour des parcours documentaires traçables.', repository: GH + 'EncyKlopedia' },
  { name: 'Skope', category: 'knowledge', kind: 'Outil', description: 'Recherche locale, prévisualisation de graphes et parcours d’identités documentées.', repository: GH + 'Skope' },
  { name: 'Konstellation', category: 'knowledge', kind: 'Application', description: 'Navigation et vues explicables à partir de surfaces de lecture Kristal autorisées.', repository: GH + 'Konstellation' },
  { name: 'SenTient', category: 'knowledge', kind: 'Système', description: 'Interprétation sémantique et rapprochement d’entités à partir de données vérifiables.', repository: GH + 'SenTient', internal: '/technology/sentient' },
  { name: 'SemantiK Architect', category: 'knowledge', kind: 'Système', description: 'Articulation multilingue structurée : des représentations sémantiques vers les langues humaines.', repository: GH + 'SemantiK-Architect', internal: '/technology/architect' },
  { name: 'Kompiler', category: 'knowledge', kind: 'Outil', description: 'Compilation locale en lecture seule de Context Packs bornés qui préservent la provenance.', repository: GH + 'Kompiler', internal: '/technology/context-packs' },
  { name: 'Spek', category: 'knowledge', kind: 'Application', description: 'Composition éditoriale locale de publications multilingues depuis des unités typées.', repository: GH + 'Spek' },
  { name: 'diK', category: 'knowledge', kind: 'Outil', description: 'Dictionnaires et identités sémantiques multilingues pour Kristal, sans modifier le canon.', repository: GH + 'diK' },
  { name: 'Arketype', category: 'knowledge', kind: 'Outil', description: 'Bibliothèque visuelle d’archétypes pour organiser des espaces de connaissances Kristal.', repository: GH + 'Arketype' },
  { name: 'Kristal Authoring Kit', category: 'knowledge', kind: 'Outil', description: 'Outils locaux de rédaction et de préparation des états de connaissance Kristal.', repository: GH + 'Kristal-Authoring-Kit' },
  { name: 'Konstellation Light', category: 'knowledge', kind: 'Outil', description: 'Explorateur local des collections Kristal ; les limites de qualification et de construction sont documentées.', repository: GH + 'Konstellation-Light' },
  { name: 'Kristalizer', category: 'knowledge', kind: 'Outil', description: 'Analyse de Kristals, rapprochement Wikidata et préparation de copies validables sans modifier les originaux.', repository: GH + 'Kristalizer' },
  { name: 'Kristal Public', category: 'knowledge', kind: 'Système', description: 'Hôte de collection publique Kristal en lecture seule ; publication non autorisée tant que les contrôles de provenance ne passent pas.', repository: GH + 'kristal-public' },
  { name: 'Kristal Manager', category: 'knowledge', kind: 'Application', description: 'Gestion locale et exploration des espaces de travail et fichiers Kristal.', repository: GH + 'Kristal-Manager' },
  { name: 'Kontainer', category: 'knowledge', kind: 'Outil', description: 'Conteneur portable et vérifiable, avec options de chiffrement pour des fichiers .kristal.', repository: GH + 'Kontainer' },
  { name: 'KristalDiag', category: 'knowledge', kind: 'Outil', description: 'Contrôles de conformité indépendants pour les artefacts et processus Kristal.', repository: GH + 'KristalDiag' },
  { name: 'MediKristal', category: 'knowledge', kind: 'Recherche', description: 'Modèle expérimental d’orchestration de parcours de connaissances médicales, non autorisé à l’usage clinique.', repository: GH + 'MediKristal' },

  // Pédagogie et transmission : contenu, orchestration et validation sont distincts.
  { name: 'eKole', category: 'learning', kind: 'Application', description: 'Moteur pédagogique neutre, distinct des corpus éducatifs et de leur validation.', repository: GH + 'Ekole' },
  { name: 'eKole Pastorale', category: 'learning', kind: 'Corpus', description: 'Contenus de formation pastorale séparés du moteur eKole neutre ; prototype local non approuvé pour publication.', repository: GH + 'Ekole-Pastorale' },
  { name: 'eKole Québec', category: 'learning', kind: 'Application', description: 'Corpus québécois de cours et parcours à réviser, séparé du moteur eKole.', repository: GH + 'ekole-quebec' },
  { name: 'Kontexte', category: 'learning', kind: 'Application', description: 'Situations réutilisables, rôles adaptatifs et activités localisées pour l’apprentissage.', repository: GH + 'Kontexte' },
  { name: 'Kompose', category: 'learning', kind: 'Outil', description: 'Conception, vérification et simulation locale de capsules pédagogiques.', repository: GH + 'Kompose' },
  { name: 'Akor', category: 'learning', kind: 'Application', description: 'Missions d’apprentissage concertées avec rôles complémentaires et contributions reliées.', repository: GH + 'Akor' },
  { name: 'UCKK', category: 'learning', kind: 'Application', description: 'Parcours, défis, assemblées, archives et diffusion de contenus éducatifs.', repository: GH + 'UCKK' },
  { name: 'Médiathèque', category: 'learning', kind: 'Application', description: 'Gestion de sources, instantanés, représentations, droits et diffusion de médias.', repository: GH + 'Mediatheque' },
  { name: 'Kalendar', category: 'learning', kind: 'Application', description: 'Calendrier familial et scolaire québécois local, confidentiel et imprimable.', repository: GH + 'Kalendar' },
  { name: 'UCKK Ops Console', category: 'learning', kind: 'Outil', description: 'Console locale de gestion des opérations UCKK et de leurs parcours documentés.', repository: GH + 'UCKK-Ops-Console' },

  // Création : ce ne sont pas des systèmes d'autorité.
  { name: 'Kolor', category: 'creative', kind: 'Application', description: 'Studio bilingue de création, pose et export de personnages illustrés.', repository: GH + 'Kolor' },
  { name: 'Karacter', category: 'creative', kind: 'Application', description: 'Profils de personnages et univers locaux pour les scénarios et œuvres créatives.', repository: GH + 'Karacter' },
  { name: 'BoKristal', category: 'creative', kind: 'Recherche', description: 'Proposition de bibliothèque Book-Kristal multi-supports avec consultation hors ligne.', repository: GH + 'BoKristal' },
  { name: 'Ariane', category: 'creative', kind: 'Recherche', description: 'Cartographie d’interfaces en états et transitions pour guider la navigation logicielle.', internal: '/technology/ariane' },

  // Recherche : ne pas assimiler ces travaux à des services déployés.
  { name: 'Âme artificielle / EL', category: 'research', kind: 'Recherche', description: 'Imitation fonctionnelle, non superficielle, des mécanismes de personnalité : graphe psycho-causal, affects, souvenirs, croyances et réactions. Pas un système de guardrails.', repository: GH + 'Ame-Artificielle', internal: '/technology/ame-artificielle' },
  { name: 'Kristal Farms', category: 'research', kind: 'Recherche', description: 'Infrastructure locale associant énergie, calcul, fibre, chaleur utile et résilience.', repository: GH + 'Kristal-Farms', internal: '/infrastructures/kristal-farms' },
  { name: 'Kin City', category: 'research', kind: 'Application', description: 'Ville et expériences institutionnelles simulées dans Roblox, distinctes de l’infrastructure physique.', repository: GH + 'Kin-City', internal: '/infrastructures/kin-city' },
  { name: 'LevelUpDiag', category: 'research', kind: 'Outil', description: 'Famille d’outils diagnostiques indépendants pour tester des frontières techniques.', repository: GH + 'LevelUpDiag' },
];
