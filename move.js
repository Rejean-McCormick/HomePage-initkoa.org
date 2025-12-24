// move.js
const fs = require('fs');
const path = require('path');

// Chemins inverses (Source est maintenant platforms/kreature)
const ROOT_DIR = process.cwd();
const SOURCE_DIR = path.join(ROOT_DIR, 'app', 'platforms', 'kreature');
const DEST_DIR = path.join(ROOT_DIR, 'app', 'kreature');

// La liste des éléments à rapatrier
const ITEMS_TO_MOVE = [
  'anatomie',
  'initiation',
  'rituels',
  'mythos',
  'parcours',
  'page.tsx',
  'page.js',
  'page.mdx',
  'layout.tsx',
  'layout.js'
];

function undoMoveKreature() {
  console.log('⏪ Annulation de la migration de Kréature...');

  // 1. Vérifier que la source existe (app/platforms/kreature)
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Erreur : Le dossier source n'existe pas : ${SOURCE_DIR}`);
    return;
  }

  // 2. Recréer le dossier destination (app/kreature) s'il n'existe plus
  if (!fs.existsSync(DEST_DIR)) {
    console.log(`📂 Recréation du dossier original : ${DEST_DIR}`);
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  // 3. Déplacer les éléments inversement
  ITEMS_TO_MOVE.forEach(item => {
    const sourcePath = path.join(SOURCE_DIR, item);
    const destPath = path.join(DEST_DIR, item);

    if (fs.existsSync(sourcePath)) {
      try {
        // Gestion des conflits (si un fichier a été recréé entre temps)
        if (fs.existsSync(destPath)) {
            const stat = fs.statSync(destPath);
            if(stat.isDirectory()) {
                console.log(`⚠️  Fusion du dossier ${item}...`);
                // Copier le contenu et supprimer la source
                fs.cpSync(sourcePath, destPath, { recursive: true, force: true });
                fs.rmSync(sourcePath, { recursive: true, force: true });
            } else {
                // Écraser le fichier
                fs.renameSync(sourcePath, destPath);
            }
        } else {
            // Déplacement standard
            fs.renameSync(sourcePath, destPath);
        }
        
        console.log(`✅ Restauré : ${item} -> app/kreature/${item}`);
      } catch (err) {
        console.error(`❌ Erreur lors de la restauration de ${item} :`, err.message);
      }
    }
  });

  // 4. Nettoyage : Supprimer app/platforms/kreature si vide
  try {
    const remainingFiles = fs.readdirSync(SOURCE_DIR);
    if (remainingFiles.length === 0) {
      fs.rmdirSync(SOURCE_DIR);
      console.log('🗑️  Dossier vide "app/platforms/kreature" supprimé.');
    } else {
      console.log(`ℹ️  Le dossier "app/platforms/kreature" n'a pas été supprimé car il reste des fichiers : ${remainingFiles.join(', ')}`);
    }
  } catch (e) {
    // Ignorer si erreur de suppression
  }

  console.log('\n🎉 Annulation terminée !');
  console.log('👉 Vos fichiers sont revenus dans : app/kreature/');
}

undoMoveKreature();