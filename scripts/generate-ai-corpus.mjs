// scripts/generate-ai-corpus.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration
const APP_DIR = path.join(process.cwd(), 'app');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'ai-corpus.txt');
const BASE_URL = 'https://www.okido.wiki'; // Votre domaine

// Fichiers à inclure
const VALID_EXTENSIONS = ['.mdx', '.tsx', '.js', '.ts'];
const IGNORE_DIRS = ['api', 'layout', 'loading', 'error', 'not-found'];

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      }
    } else {
      if (VALID_EXTENSIONS.includes(path.extname(file)) && file.includes('page')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

function cleanContent(content) {
  // Nettoyage basique pour économiser des tokens à l'IA
  return content
    .replace(/import .* from .*/g, '') // Retire les imports
    .replace(/export default function .*/g, 'Content:') // Simplifie les déclarations
    .replace(/^\s*[\r\n]/gm, ''); // Retire les lignes vides multiples
}

function generateCorpus() {
  console.log('🤖 Démarrage de la génération du Corpus IA...');
  
  const files = getAllFiles(APP_DIR);
  let corpus = `# OKIDOWIKI AI CORPUS\n# Generated: ${new Date().toISOString()}\n\n`;

  files.forEach(filePath => {
    // Calculer l'URL publique à partir du chemin fichier
    // ex: C:\...\app\about\page.mdx -> /about
    let relativePath = filePath.replace(APP_DIR, '').replace(/\\/g, '/');
    let publicRoute = relativePath
      .replace('/page.tsx', '')
      .replace('/page.mdx', '')
      .replace('/page.js', '');
    
    if (publicRoute === '') publicRoute = '/';

    const content = fs.readFileSync(filePath, 'utf8');
    const cleaned = cleanContent(content);

    corpus += `\n==================================================\n`;
    corpus += `ROUTE: ${BASE_URL}${publicRoute}\n`;
    corpus += `SOURCE: ${path.basename(filePath)}\n`;
    corpus += `==================================================\n`;
    corpus += `${cleaned}\n\n`;
  });

  fs.writeFileSync(OUTPUT_FILE, corpus);
  console.log(`✅ Corpus généré avec succès : ${OUTPUT_FILE} (${files.length} pages)`);
}

generateCorpus();