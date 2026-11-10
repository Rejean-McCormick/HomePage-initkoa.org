import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const p=resolve(root,'content/final-system/public-architecture.v1.json');
const doc=JSON.parse(readFileSync(p,'utf8'));
assert.equal(doc.format,'koa.public-architecture.v1');
assert.equal(doc.classification,'PUBLIC_DESIGN_METADATA_ONLY');
assert.equal(doc.status,'TARGET_DESIGN_NOT_DEPLOYMENT_EVIDENCE');
assert.equal(doc.scope.chain_count,24);
assert.equal(doc.scope.repository_count,53);
assert.equal(doc.scope.boundary_count,26);
assert.equal(doc.chains.length,24);
assert.equal(doc.repositories.length,53);
assert.equal(doc.boundaries.length,26);
assert.equal(new Set(doc.chains.map(c=>c.id)).size,24);
assert.equal(new Set(doc.repositories.map(r=>r.repository)).size,53);
for(const c of doc.chains){
 assert.match(c.id,/^FC-\d{2}$/);
 assert.equal(c.state,'target_design_not_qualified');
 assert.match(c.source_path,/^docs\/target\/functional-chains\/chains\/FC-\d{2}-/);
}
for(const b of doc.boundaries)assert.equal(b.state,'target_design_not_qualified');
for(const key of ['git_revision','secret','snapshot_member','source_member','local_root','password']){
 assert.equal(JSON.stringify(doc).includes('"'+key+'"'),false,`unsafe field ${key}`);
}
assert.equal(JSON.stringify(doc).includes('C:\\mycode\\'),false,'local path leaked');
console.log('PASS: 24 chains, 53 public owner roles, 26 non-deployed design edges; no unsafe source fields');
