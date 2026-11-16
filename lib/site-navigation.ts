export const MOSAIC_URL = "https://koaliscenariomosaic.netlify.app/";
export const UNIVERSITY_URL = "https://uckk.org/";
export const AUDIT_URL =
  "https://rejean-mccormick.github.io/kOA-Digital-Ecosystem-GitHub-Audit/#apps";
export const SITE_TITLE = "kOA — Build on what others know and do";
export const SITE_DESCRIPTION =
  "Tools for learning, creating, making decisions and organizing work that others can verify, adapt and pass on.";

export const capabilities = [
  { id: "understand", title: "Find & understand", description: "Follow a claim back to its sources and see what is still uncertain.", href: "/technology/kristal", link: "Explore Kristal" },
  { id: "learn", title: "Learn & share", description: "Turn experience into something others can learn from, practise and teach.", href: "/learning-and-culture#learning", link: "Explore learning" },
  { id: "create", title: "Collaborate & create", description: "Bring different skills together and keep the reasoning behind the work.", href: "/platforms/konnaxion", link: "Explore Konnaxion" },
  { id: "choose", title: "Choose & govern", description: "Compare options, evidence and perspectives under visible rules.", href: "/ecosystem/functional-chains/FC-07", link: "See the decision workflow" },
  { id: "act", title: "Organize & act", description: "Carry a plan into assigned work with context and clear responsibilities.", href: "/platforms/orgo", link: "Explore Orgo" },
  { id: "respond", title: "Respond & coordinate", description: "Help teams keep track of changing conditions and unfinished work.", href: "/ecosystem/functional-chains/FC-08", link: "See the operations workflow" },
  { id: "remember", title: "Remember & improve", description: "Make results, corrections and lessons useful to the next person or team.", href: "/evidence", link: "See how work is documented" },
  { id: "publish", title: "Publish & reach people", description: "Give knowledge new forms while keeping its sources and rights visible.", href: "/learning-and-culture#publishing", link: "Explore publishing" },
] as const;

export const navigation = [
  { label: "Explore", href: "/#capabilities", links: [
    { label: "What you can do", href: "/#capabilities", keywords: "learn create decide work capacity" },
    { label: "Koali Scenario Mosaic", href: MOSAIC_URL, keywords: "scenarios examples webby" },
  ] },
  { label: "Ecosystem", href: "/ecosystem", links: [
    { label: "Systems and responsibilities", href: "/ecosystem", keywords: "architecture owners" },
    { label: "Functional chains", href: "/ecosystem/functional-chains", keywords: "target design contracts" },
    { label: "Platforms", href: "/platforms", keywords: "konnaxion orgo" },
    { label: "Technology catalog", href: "/technology", keywords: "kristal semantik language software" },
    { label: "Infrastructures", href: "/infrastructures", keywords: "offline energy local computing" },
  ] },
  { label: "Learning & Culture", href: "/learning-and-culture", links: [
    { label: "Learning and publishing", href: "/learning-and-culture", keywords: "learn publish ekole education" },
    { label: "King Klown Univers-City", href: UNIVERSITY_URL, keywords: "uckk moodle campus course account" },
    { label: "Kin City", href: "/infrastructures/kin-city", keywords: "virtual city roblox" },
    { label: "Kréature", href: "/learning-and-culture#kreature", keywords: "king klown myth story French" },
    { label: "Watch & Listen", href: "/play", keywords: "videos music media play" },
  ] },
  { label: "Research & Proposals", href: "/initiatives", links: [
    { label: "Why kOA?", href: "/why", keywords: "mission principles" },
    { label: "Research", href: "/research", keywords: "hypotheses pi" },
    { label: "Civic Governance Proposal", href: "/initiatives/civic-governance", keywords: "constitution governance" },
    { label: "Kristal Farms", href: "/infrastructures/kristal-farms", keywords: "renewable remote compute energy" },
    { label: "Ukraine Peace Plan", href: "/initiatives/ukraine-peace-plan", keywords: "freeze vote rebuild proposal" },
  ] },
  { label: "Evidence & Documentation", href: "/evidence", links: [
    { label: "Evidence and status", href: "/evidence", keywords: "tests validation evidence webby" },
    { label: "Engineering audit", href: AUDIT_URL, keywords: "audit test reports evidence" },
    { label: "Reading library", href: "/reading", keywords: "reading articles documents research" },
    { label: "Context Packs", href: "/technology/context-packs", keywords: "AI documentation resources" },
    { label: "About", href: "/about", keywords: "réjean mccormick founder contact" },
  ] },
] as const;
