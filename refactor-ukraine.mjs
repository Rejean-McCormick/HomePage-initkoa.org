import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURATION ---
// Adjust these paths relative to where you run the script
const OLD_BASE_DIR = 'app/initiatives/ukraine-peace-and-reconstruction-plan';
const NEW_BASE_DIR = 'app/initiatives/ukraine-peace-plan';

// --- THE MAPPING MAP ---
// Source (relative to OLD_DIR) -> Target (relative to NEW_DIR)
const fileMap = {
  // 1. Root & Summary
  'content.mdx': 'page.mdx',
  'summary/content.mdx': 'summary.mdx',

  // 2. Concepts (Already flat, just moving)
  'concepts/peace-framework.mdx': 'concepts/peace-framework.mdx',
  'concepts/construction-olympics.mdx': 'concepts/construction-olympics.mdx',
  'concepts/operational-logistics.mdx': 'concepts/operational-logistics.mdx',
  'concepts/future-vision.mdx': 'concepts/future-vision.mdx',
  'concepts/geopolitical-context.mdx': 'concepts/geopolitical-context.mdx',

  // 3. FVR - Start Here (00)
  'fvr/00-start-here/00-welcome/content.mdx': 'fvr/start-here/welcome.mdx',
  'fvr/00-start-here/01-one-page-summary/content.mdx': 'fvr/start-here/one-page-summary.mdx',
  'fvr/00-start-here/02-how-to-use-this-book/content.mdx': 'fvr/start-here/how-to-use.mdx',
  'fvr/00-start-here/03-glossary/content.mdx': 'fvr/start-here/glossary.mdx',
  'fvr/00-start-here/04-changelog-versioning/content.mdx': 'fvr/start-here/changelog.mdx',

  // 4. FVR - Overview (01)
  'fvr/01-proposal-at-a-glance/00-the-proposal-at-a-glance/content.mdx': 'fvr/overview/proposal-at-a-glance.mdx',
  'fvr/01-proposal-at-a-glance/01-theory-of-change/content.mdx': 'fvr/overview/theory-of-change.mdx',
  'fvr/01-proposal-at-a-glance/02-phased-timeline/content.mdx': 'fvr/overview/phased-timeline.mdx',
  'fvr/01-proposal-at-a-glance/03-core-principles-red-lines/content.mdx': 'fvr/overview/core-principles.mdx',
  'fvr/01-proposal-at-a-glance/04-what-this-is-not/content.mdx': 'fvr/overview/what-this-is-not.mdx',
  'fvr/01-proposal-at-a-glance/05-deltas-between-versions/content.mdx': 'fvr/overview/deltas.mdx',

  // 5. FVR - Freeze (02)
  'fvr/02-freeze/00-freeze-overview/content.mdx': 'fvr/freeze/overview.mdx',
  'fvr/02-freeze/01-ceasefire-architecture/content.mdx': 'fvr/freeze/ceasefire-architecture.mdx',
  'fvr/02-freeze/02-stabilization-force-concept/content.mdx': 'fvr/freeze/stabilization-force.mdx',
  'fvr/02-freeze/03-verification-monitoring/content.mdx': 'fvr/freeze/verification-monitoring.mdx',
  'fvr/02-freeze/04-humanitarian-corridors-protected-infrastructure/content.mdx': 'fvr/freeze/humanitarian-corridors.mdx',
  'fvr/02-freeze/05-sanctions-aid-linkage-during-freeze/content.mdx': 'fvr/freeze/sanctions-linkage.mdx',

  // 6. FVR - Vote (03)
  'fvr/03-vote/00-vote-overview/content.mdx': 'fvr/vote/overview.mdx',
  'fvr/03-vote/01-objective-legitimacy-criteria/content.mdx': 'fvr/vote/legitimacy-criteria.mdx',
  'fvr/03-vote/02-electorate-definition/content.mdx': 'fvr/vote/electorate-definition.mdx',
  'fvr/03-vote/03-voting-system-design/content.mdx': 'fvr/vote/voting-system.mdx',
  'fvr/03-vote/04-integrity-observation/content.mdx': 'fvr/vote/integrity-observation.mdx',
  'fvr/03-vote/05-vote-to-border-mechanics/content.mdx': 'fvr/vote/vote-to-border.mdx',
  'fvr/03-vote/06-dispute-resolution/content.mdx': 'fvr/vote/dispute-resolution.mdx',

  // 7. FVR - Rebuild (04)
  'fvr/04-rebuild/00-rebuild-overview/content.mdx': 'fvr/rebuild/overview.mdx',
  'fvr/04-rebuild/01-reconstruction-architecture/content.mdx': 'fvr/rebuild/architecture.mdx',
  'fvr/04-rebuild/02-reconstruction-olympics/content.mdx': 'fvr/rebuild/construction-olympics.mdx',
  'fvr/04-rebuild/03-peace-build-campus-governance/content.mdx': 'fvr/rebuild/campus-governance.mdx',
  'fvr/04-rebuild/04-economic-restart-plan/content.mdx': 'fvr/rebuild/economic-restart.mdx',
  'fvr/04-rebuild/05-accountability-transparency/content.mdx': 'fvr/rebuild/accountability.mdx',

  // 8. FVR - Governance (05)
  'fvr/05-governance-and-verification/00-governance-and-verification-overview/content.mdx': 'fvr/governance/overview.mdx',
  'fvr/05-governance-and-verification/01-status-neutral-governance-model/content.mdx': 'fvr/governance/status-neutral-model.mdx',
  'fvr/05-governance-and-verification/02-verification-first-gates/content.mdx': 'fvr/governance/verification-gates.mdx',
  'fvr/05-governance-and-verification/03-coordination-deconfliction-escalation/content.mdx': 'fvr/governance/escalation-coordination.mdx',
  'fvr/05-governance-and-verification/04-data-governance-privacy-security/content.mdx': 'fvr/governance/data-privacy.mdx',

  // 9. FVR - Legal (06)
  'fvr/06-legal-and-political-pathways/00-legal-and-political-overview/content.mdx': 'fvr/legal/overview.mdx',
  'fvr/06-legal-and-political-pathways/01-domestic-approvals-gate/content.mdx': 'fvr/legal/domestic-approvals.mdx',
  'fvr/06-legal-and-political-pathways/02-international-legal-considerations/content.mdx': 'fvr/legal/international-considerations.mdx',
  'fvr/06-legal-and-political-pathways/03-justice-accountability-options/content.mdx': 'fvr/legal/justice-accountability.mdx',
  'fvr/06-legal-and-political-pathways/04-treaty-structure-annexes/content.mdx': 'fvr/legal/treaty-structure.mdx',

  // 10. FVR - Playbooks (07)
  'fvr/07-stakeholder-playbooks/00-stakeholder-playbooks-overview/content.mdx': 'fvr/playbooks/overview.mdx',
  'fvr/07-stakeholder-playbooks/01-ukraine-playbook/content.mdx': 'fvr/playbooks/ukraine.mdx',
  'fvr/07-stakeholder-playbooks/02-russia-playbook/content.mdx': 'fvr/playbooks/russia.mdx',
  'fvr/07-stakeholder-playbooks/03-us-eu-playbook/content.mdx': 'fvr/playbooks/us-eu.mdx',
  'fvr/07-stakeholder-playbooks/04-un-osce-neutral-states-playbook/content.mdx': 'fvr/playbooks/neutral-states.mdx',
  'fvr/07-stakeholder-playbooks/05-civil-society-displaced-persons-playbook/content.mdx': 'fvr/playbooks/civil-society.mdx',

  // 11. FVR - Risks (08)
  'fvr/08-risks-critiques-mitigations/00-risks-overview/content.mdx': 'fvr/risks/overview.mdx',
  'fvr/08-risks-critiques-mitigations/01-failure-modes/content.mdx': 'fvr/risks/failure-modes.mdx',
  'fvr/08-risks-critiques-mitigations/02-risk-register/content.mdx': 'fvr/risks/risk-register.mdx',
  'fvr/08-risks-critiques-mitigations/03-common-critiques-and-responses/content.mdx': 'fvr/risks/critiques-and-responses.mdx',
  'fvr/08-risks-critiques-mitigations/04-ethical-considerations/content.mdx': 'fvr/risks/ethical-considerations.mdx',

  // 12. FVR - Toolkit (09)
  'fvr/09-implementation-toolkit/00-toolkit-overview/content.mdx': 'fvr/toolkit/overview.mdx',
  'fvr/09-implementation-toolkit/01-operational-checklists-by-phase/content.mdx': 'fvr/toolkit/checklists.mdx',
  'fvr/09-implementation-toolkit/02-templates/content.mdx': 'fvr/toolkit/templates.mdx',
  'fvr/09-implementation-toolkit/03-metrics-kpis/content.mdx': 'fvr/toolkit/metrics-kpis.mdx',
  'fvr/09-implementation-toolkit/04-comms-toolkit/content.mdx': 'fvr/toolkit/comms.mdx',

  // 13. FVR - Background (10)
  'fvr/10-background-and-essays/00-background-overview/content.mdx': 'fvr/background/overview.mdx',
  'fvr/10-background-and-essays/01-origins-and-evolution/content.mdx': 'fvr/background/origins.mdx',
  'fvr/10-background-and-essays/02-american-realism-essay/content.mdx': 'fvr/background/american-realism-essay.mdx',
  'fvr/10-background-and-essays/03-projet-du-pape-francois-variant/content.mdx': 'fvr/background/pape-francois-variant.mdx',
  'fvr/10-background-and-essays/04-comparables-historical-analogs/content.mdx': 'fvr/background/historical-analogs.mdx',

  // 14. FVR - Appendices (11)
  'fvr/11-appendices/00-appendices-overview/content.mdx': 'fvr/appendices/overview.mdx',
  'fvr/11-appendices/01-definitions/content.mdx': 'fvr/appendices/definitions.mdx',
  'fvr/11-appendices/02-maps-and-scenarios/content.mdx': 'fvr/appendices/maps-scenarios.mdx',
  'fvr/11-appendices/03-decision-log/content.mdx': 'fvr/appendices/decision-log.mdx',
  'fvr/11-appendices/04-source-text-archive/content.mdx': 'fvr/appendices/source-archive.mdx',

  // 15. Cultural Bridge
  'cultural-bridge/00-start-here/content.mdx': 'cultural-bridge/start-here.mdx',
  'cultural-bridge/01-russian-literature/content.mdx': 'cultural-bridge/russian-literature.mdx',
  'cultural-bridge/02-ukrainian-language-worldwide/content.mdx': 'cultural-bridge/ukrainian-language.mdx',
  'cultural-bridge/03-guardrails/content.mdx': 'cultural-bridge/guardrails.mdx',
  'cultural-bridge/04-funding-partnerships/content.mdx': 'cultural-bridge/funding-partnerships.mdx',
  'cultural-bridge/05-metrics/content.mdx': 'cultural-bridge/metrics.mdx',
  'cultural-bridge/06-risks/content.mdx': 'cultural-bridge/risks.mdx',
};

// --- EXECUTION ---

async function run() {
  const root = process.cwd();
  
  for (const [sourcePath, targetPath] of Object.entries(fileMap)) {
    const fullSourcePath = path.join(root, OLD_BASE_DIR, sourcePath);
    const fullTargetPath = path.join(root, NEW_BASE_DIR, targetPath);

    try {
      // 1. Check if source exists
      if (!fs.existsSync(fullSourcePath)) {
        console.warn(`⚠️  Source missing: ${sourcePath}`);
        continue;
      }

      // 2. Create target directory recursively
      const targetDir = path.dirname(fullTargetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // 3. Copy file (safer than move, so we don't destroy data if something goes wrong)
      fs.copyFileSync(fullSourcePath, fullTargetPath);
      console.log(`✅ Copied: ${path.basename(sourcePath)} -> ${targetPath}`);

    } catch (err) {
      console.error(`❌ Error processing ${sourcePath}:`, err.message);
    }
  }

  console.log(`\n🎉 Refactor complete! Check 'app/initiatives/ukraine-peace-plan'`);
  console.log(`(Old files remain in '${OLD_BASE_DIR}' for safety. Delete them manually after verifying.)`);
}

run();