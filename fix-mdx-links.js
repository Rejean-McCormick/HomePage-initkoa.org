const fs = require('fs');
const path = require('path');

// Recursive function to walk through the app directory
function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (file.endsWith('.mdx')) {
      processMdx(filePath);
    }
  });
}

function processMdx(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Regex to find Markdown links: [Label](Url)
  // We only want to lower-case the Url part, and only if it's a local path (starts with / or .. or .)
  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => {
    // Ignore external links (http) or anchors (#)
    if (url.startsWith('http') || url.startsWith('#')) {
      return match;
    }
    
    // Convert URL to lowercase
    const lowerUrl = url.toLowerCase();
    
    if (url !== lowerUrl) {
      console.log(`Fixing link in ${path.basename(filePath)}: ${url} -> ${lowerUrl}`);
      return `[${label}](${lowerUrl})`;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log("Scanning .mdx files for uppercase links...");
walk('./app');
console.log("Done.");