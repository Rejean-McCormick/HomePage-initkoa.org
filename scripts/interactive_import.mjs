import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer'; // npm install inquirer
import chalk from 'chalk';       // npm install chalk

// HELPER: Recursively walk directory
function* walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (['.git', 'node_modules', '.DS_Store'].includes(file.name)) continue;
    const res = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      yield* walkSync(res);
    } else {
      yield res;
    }
  }
}

// HELPER: Extract Title
function extractTitle(content, filename) {
  const match = content.match(/^#\s+(.+)$/m);
  if (match) return match[1].trim();
  return filename.replace(/-/g, ' ').replace('.md', '')
    .replace(/\b\w/g, c => c.toUpperCase());
}

// HELPER: Fix Links (Depth Correction)
function fixLinks(content) {
  return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, link) => {
    if (link.startsWith('http') || link.startsWith('#') || link.startsWith('mailto')) return match;
    let newLink = link.replace(/\.md$/i, '');
    if (!newLink.startsWith('/')) {
      if (newLink.startsWith('./')) newLink = '.' + newLink;
      else if (newLink.startsWith('../')) newLink = '../' + newLink;
      else newLink = '../' + newLink;
    }
    return `[${text}](${newLink})`;
  });
}

async function main() {
  console.clear();
  console.log(chalk.blue.bold("🚀 Markdown to Next.js Converter CLI\n"));

  // 1. Get Paths via UI
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'source',
      message: '📂 Enter the SOURCE folder path (where .md files are):',
      validate: (input) => fs.existsSync(input) ? true : '❌ Path does not exist!'
    },
    {
      type: 'input',
      name: 'target',
      message: '🎯 Enter the DESTINATION folder path (Next.js app route):',
      default: './app/initiatives/imported-content'
    }
  ]);

  const SOURCE_DIR = path.resolve(answers.source.trim());
  const TARGET_DIR = path.resolve(answers.target.trim());

  // 2. Pre-flight Check & Confirmation
  console.log(chalk.yellow('\n---------------------------------------------------'));
  console.log(chalk.white(`You are about to copy content:`));
  console.log(`FROM: ${chalk.green(SOURCE_DIR)}`);
  console.log(`TO:   ${chalk.cyan(TARGET_DIR)}`);
  console.log(chalk.yellow('---------------------------------------------------\n'));

  const confirm = await inquirer.prompt([{
    type: 'confirm',
    name: 'proceed',
    message: '⚠️  Are you sure you want to proceed?',
    default: false
  }]);

  if (!confirm.proceed) {
    console.log(chalk.red("❌ Operation cancelled."));
    process.exit(0);
  }

  // 3. Execution Phase
  console.log(chalk.blue("\n⚙️  Starting conversion...\n"));
  
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
    console.log(chalk.gray(`Created directory: ${TARGET_DIR}`));
  }

  let successCount = 0;
  let errorCount = 0;

  for (const filePath of walkSync(SOURCE_DIR)) {
    if (!filePath.endsWith('.md')) continue;

    try {
      const relPath = path.relative(SOURCE_DIR, filePath);
      const parsed = path.parse(relPath);
      const rawContent = fs.readFileSync(filePath, 'utf8');
      
      const title = extractTitle(rawContent, parsed.name);
      const body = fixLinks(rawContent);
      
      const mdxContent = `export const metadata = {\n  title: ${JSON.stringify(title)}\n};\n\n${body}`;

      let outDir, outFile;
      
      // LOGIC: README/index stays root, others get folder
      if (parsed.name.toUpperCase() === 'README' || parsed.name === 'index') {
        outDir = path.join(TARGET_DIR, parsed.dir);
      } else {
        outDir = path.join(TARGET_DIR, parsed.dir, parsed.name);
      }
      
      outFile = 'page.mdx';

      fs.mkdirSync(outDir, { recursive: true });
      
      // Cleanup conflicting files
      if (fs.existsSync(path.join(outDir, 'page.js'))) fs.unlinkSync(path.join(outDir, 'page.js'));
      if (fs.existsSync(path.join(outDir, 'page.tsx'))) fs.unlinkSync(path.join(outDir, 'page.tsx'));

      fs.writeFileSync(path.join(outDir, outFile), mdxContent.trim());
      
      console.log(`${chalk.green('✔')} ${parsed.name} -> ${chalk.gray(path.relative(TARGET_DIR, path.join(outDir, outFile)))}`);
      successCount++;

    } catch (err) {
      console.log(`${chalk.red('✘')} Error processing ${path.basename(filePath)}: ${err.message}`);
      errorCount++;
    }
  }

  // 4. Final Summary
  console.log(chalk.yellow('\n---------------------------------------------------'));
  console.log(`🎉 Process Complete!`);
  console.log(chalk.green(`   Success: ${successCount} files`));
  if (errorCount > 0) console.log(chalk.red(`   Errors:  ${errorCount} files`));
  console.log(chalk.yellow('---------------------------------------------------'));
}

main();