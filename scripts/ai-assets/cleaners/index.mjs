// scripts/ai-assets/cleaners/index.mjs

const SUSPICIOUS_MOJIBAKE_RE =
  /(Ã.|Â |Â$|â€“|â€”|â€˜|â€™|â€œ|â€|â€¦|â€¢|â€‘|â€"|â€)/;

const SIMPLE_STRING_EXPR_RE = /\{\s*["'`](.*?)["'`]\s*\}/gs;

const CODE_WORD_RE =
  /\b(function|return|const|let|var|import|export|className|props|children|default|metadata|openGraph|viewport)\b/g;

const RESIDUAL_CODE_RE =
  /\b(import|export|function|return|const|let|var|className|props|children|default|metadata|openGraph|useState|useEffect)\b|=>|from\s+["'][^"']+["']|[{}()[\];<>]/g;

export function truncate(text, maxChars = 0) {
  const value = String(text ?? "");
  if (!maxChars || maxChars <= 0) return value;
  if (value.length <= maxChars) return value;
  return `${value.slice(0, maxChars).trim()} …`;
}

export function stripBom(value) {
  return String(value ?? "").replace(/^\uFEFF/, "");
}

export function stripUnsafeControlChars(value) {
  return String(value ?? "")
    .replace(/\uFFFD/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "")
    .replace(/[^\S\n\t]+/g, (match) => match.replace(/[^\x20\n\t]/g, " "));
}

export function findMatchingDelimiter(source, openIndex, openChar, closeChar) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let i = openIndex; i < source.length; i += 1) {
    const ch = source[i];
    const next = source[i + 1];

    if (inLineComment) {
      if (ch === "\n") inLineComment = false;
      continue;
    }

    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        i += 1;
      }
      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (ch === "\\") {
        escaped = true;
        continue;
      }

      if (ch === quote) {
        quote = null;
      }

      continue;
    }

    if (ch === "/" && next === "/") {
      inLineComment = true;
      i += 1;
      continue;
    }

    if (ch === "/" && next === "*") {
      inBlockComment = true;
      i += 1;
      continue;
    }

    if (ch === "'" || ch === '"' || ch === "`") {
      quote = ch;
      continue;
    }

    if (ch === openChar) {
      depth += 1;
      continue;
    }

    if (ch === closeChar) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  return -1;
}

export function stripBalancedExportObject(source, exportName) {
  const re = new RegExp(`export\\s+const\\s+${exportName}\\s*=\\s*\\{`, "g");
  let output = String(source ?? "");
  let match;

  while ((match = re.exec(output))) {
    const start = match.index;
    const openBrace = output.indexOf("{", start);
    if (openBrace === -1) break;

    const closeBrace = findMatchingDelimiter(output, openBrace, "{", "}");
    if (closeBrace === -1) break;

    let end = closeBrace + 1;
    while (/\s/.test(output[end] || "")) end += 1;
    if (output[end] === ";") end += 1;

    output = output.slice(0, start) + output.slice(end);
    re.lastIndex = start;
  }

  return output;
}

export function stripExportedFunctionBlock(source, fnName) {
  const re = new RegExp(
    `export\\s+(?:default\\s+)?(?:async\\s+)?function\\s+${fnName}\\b`,
    "g"
  );

  let output = String(source ?? "");
  let match;

  while ((match = re.exec(output))) {
    const start = match.index;
    const openBrace = output.indexOf("{", start);
    if (openBrace === -1) break;

    const closeBrace = findMatchingDelimiter(output, openBrace, "{", "}");
    if (closeBrace === -1) break;

    let end = closeBrace + 1;
    while (/\s/.test(output[end] || "")) end += 1;
    if (output[end] === ";") end += 1;

    output = output.slice(0, start) + output.slice(end);
    re.lastIndex = start;
  }

  return output;
}

export function extractDefaultExportBlock(source) {
  const input = String(source ?? "");
  const patterns = [
    /export\s+default\s+async\s+function\b/g,
    /export\s+default\s+function\b/g,
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(input);
    if (!match) continue;

    const openBrace = input.indexOf("{", match.index);
    if (openBrace === -1) continue;

    const closeBrace = findMatchingDelimiter(input, openBrace, "{", "}");
    if (closeBrace === -1) continue;

    return input.slice(match.index, closeBrace + 1);
  }

  return input;
}

export function extractReturnExpression(block) {
  const input = String(block ?? "");
  const returnMatch = /\breturn\b/.exec(input);
  if (!returnMatch) return input;

  let i = returnMatch.index + returnMatch[0].length;
  while (/\s/.test(input[i] || "")) i += 1;

  if (input[i] === "(") {
    const close = findMatchingDelimiter(input, i, "(", ")");
    if (close !== -1) return input.slice(i + 1, close);
  }

  return input.slice(i);
}

export function extractLikelyRenderable(source) {
  return extractReturnExpression(extractDefaultExportBlock(source));
}

export function maybeFixMojibake(input, options = {}) {
  const { fixMojibake = true } = options;
  let value = String(input ?? "");

  if (!fixMojibake) return value;

  if (SUSPICIOUS_MOJIBAKE_RE.test(value)) {
    try {
      const repaired = Buffer.from(value, "latin1").toString("utf8");
      const score = (text) =>
        (text.match(SUSPICIOUS_MOJIBAKE_RE) || []).length;

      if (score(repaired) < score(value)) {
        value = repaired;
      }
    } catch {
      // no-op
    }
  }

  return value
    .replace(/â€”/g, "—")
    .replace(/â€“/g, "–")
    .replace(/â€˜/g, "‘")
    .replace(/â€™/g, "’")
    .replace(/â€œ/g, "“")
    .replace(/â€/g, "”")
    .replace(/â€"/g, "”")
    .replace(/â€¦/g, "…")
    .replace(/â€¢/g, "•")
    .replace(/â€‘/g, "-")
    .replace(/Â /g, " ")
    .replace(/Â$/g, "")
    .replace(/Â/g, "");
}

export function decodeHtmlEntities(value) {
  return String(value ?? "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, dec) => {
      const code = Number(dec);
      return Number.isFinite(code) ? String.fromCodePoint(code) : _;
    })
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => {
      const code = Number.parseInt(hex, 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : _;
    });
}

export function stripCommonBoilerplate(source) {
  let output = String(source ?? "");

  output = output.replace(/^\s*---[\s\S]*?---\s*/m, "");
  output = output.replace(/^\s*["']use client["'];?\s*$/gm, "");

  output = output.replace(/^\s*import\s+["'][^"']+["'];?\s*$/gm, "");
  output = output.replace(/^\s*import[\s\S]*?from\s+["'][^"']+["'];?\s*$/gm, "");

  output = stripBalancedExportObject(output, "metadata");
  output = stripBalancedExportObject(output, "viewport");

  output = output.replace(
    /export\s+const\s+(revalidate|dynamic|runtime|preferredRegion)\s*=\s*[^;]+;?/g,
    ""
  );

  output = stripExportedFunctionBlock(output, "generateMetadata");
  output = stripExportedFunctionBlock(output, "generateStaticParams");

  return output;
}

export function preserveUsefulJsxProps(value) {
  return String(value ?? "")
    .replace(
      /\b(title|description|subtitle|heading|eyebrow|label|caption|kicker|summary)\s*=\s*"([^"]+)"/gi,
      "\n$2\n"
    )
    .replace(
      /\b(title|description|subtitle|heading|eyebrow|label|caption|kicker|summary)\s*=\s*'([^']+)'/gi,
      "\n$2\n"
    )
    .replace(
      /\b(title|description|subtitle|heading|eyebrow|label|caption|kicker|summary)\s*=\s*\{\s*`([^`]+)`\s*\}/gi,
      "\n$2\n"
    )
    .replace(
      /\b(title|description|subtitle|heading|eyebrow|label|caption|kicker|summary)\s*=\s*\{\s*"([^"]+)"\s*\}/gi,
      "\n$2\n"
    )
    .replace(
      /\b(title|description|subtitle|heading|eyebrow|label|caption|kicker|summary)\s*=\s*\{\s*'([^']+)'\s*\}/gi,
      "\n$2\n"
    );
}

function normalizeLineStructure(value) {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeMarkdownLineStructure(value) {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function stripResidualCodeNoise(text) {
  const lines = String(text ?? "").split("\n");
  const output = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      output.push("");
      continue;
    }

    if (
      /^\s*(import|export)\b/.test(line) ||
      /^\s*(const|let|var)\s+\w+\s*=/.test(line) ||
      /^\s*function\s+\w+\s*\(/.test(line) ||
      /^\s*return\s*[({<]?\s*$/.test(line) ||
      /^\s*[A-Za-z_$][\w$.-]*\s*:\s*$/.test(line) ||
      /^\s*[A-Za-z_$][\w$.-]*\s*:\s*(?:new\s+\w+\(|\{|\[|true|false|null|\d+|["']).*$/i.test(
        line
      ) ||
      /\bfrom\s+["'][^"']+["']/.test(line) ||
      /\bclassName\s*=/.test(line) ||
      /\b(onClick|onSubmit|onChange|onMouseEnter|onMouseLeave)\s*=/.test(line) ||
      /\buse(State|Effect|Memo|Callback|Ref)\s*\(/.test(line) ||
      /\blucide-react\b/.test(line) ||
      /\bexport default function\b/.test(line) ||
      /=>/.test(line)
    ) {
      continue;
    }

    if (/^[A-Z][A-Za-z0-9]*(,\s*[A-Z][A-Za-z0-9]*){2,},?$/.test(line)) {
      continue;
    }

    if (/^[\s()[\]{};,.:+\-/*|\\]+$/.test(line)) {
      continue;
    }

    const letters = (line.match(/[A-Za-zÀ-ÿ]/g) || []).length;
    const symbols = (line.match(/[{}()[\];<>]/g) || []).length;
    const quotes = (line.match(/[`"'=]/g) || []).length;
    const codeWords = (line.match(CODE_WORD_RE) || []).length;

    const denom = Math.max(letters, 1);
    const lineScore = (symbols + quotes + codeWords * 8) / denom;
    if (lineScore > 0.16) continue;

    output.push(line);
  }

  return output.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function residualCodeMarkerCount(text) {
  return (String(text ?? "").match(RESIDUAL_CODE_RE) || []).length;
}

export function codeLikenessScore(text) {
  const value = String(text ?? "");
  const letters = (value.match(/[A-Za-zÀ-ÿ]/g) || []).length;
  const punct = (value.match(/[{}()[\];<>]/g) || []).length;
  const kw =
    (
      value.match(
        /\b(const|let|var|function|return|export|import|type|interface|useState|useEffect|className|props|children|metadata|openGraph)\b/g
      ) || []
    ).length;
  const residue = residualCodeMarkerCount(value);

  const denom = Math.max(letters, 1);
  return (punct + kw * 8 + residue * 6) / denom;
}

export function cleanMarkdownLikeContent(raw, options = {}) {
  const { fixMojibake = true } = options;

  let output = String(raw ?? "");

  output = output.replace(/```[\s\S]*?```/g, "\n\n");

  output = output
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return true;
      if (/^\s*import\b/.test(trimmed)) return false;
      if (/^\s*export\b/.test(trimmed)) return false;
      if (/^\s*<[/A-Z][^>]*>\s*$/.test(trimmed)) return false;
      if (/^\s*{.*}\s*$/.test(trimmed)) return false;
      return true;
    })
    .join("\n");

  output = output
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");

  output = decodeHtmlEntities(output);
  output = maybeFixMojibake(output, { fixMojibake });
  output = stripUnsafeControlChars(output);
  output = normalizeMarkdownLineStructure(output);

  return stripResidualCodeNoise(output);
}

export function cleanJsxLikeContent(raw, options = {}) {
  const { fixMojibake = true } = options;

  let output = String(raw ?? "");

  output = stripCommonBoilerplate(output);
  output = extractLikelyRenderable(output);

  output = output.replace(/```[\s\S]*?```/g, "\n\n");
  output = output
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/(^|\s)\/\/(?!\/).*$/gm, " ");

  output = preserveUsefulJsxProps(output);

  output = output
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");

  output = output
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(
      /<\/(p|div|section|article|main|header|footer|aside|nav|ul|ol|li|h1|h2|h3|h4|h5|h6|blockquote|pre)>/gi,
      "\n\n"
    );

  output = output.replace(SIMPLE_STRING_EXPR_RE, "$1");

  output = output.replace(
    /\b[\w:-]+\s*=\s*(\{[\s\S]*?\}|"[^"]*"|'[^']*')/g,
    " "
  );

  output = output.replace(/\{[\s\S]*?\}/g, " ");
  output = output.replace(/<[^>]*>/g, " ");

  output = decodeHtmlEntities(output);
  output = maybeFixMojibake(output, { fixMojibake });
  output = stripUnsafeControlChars(output);
  output = normalizeLineStructure(output);
  output = stripResidualCodeNoise(output);

  if (!output.includes("\n")) {
    output = output.replace(/([.!?])\s+(?=[A-ZÀ-Ÿ])/g, "$1\n\n");
  }

  return output.trim();
}

export function cleanContent(raw, ext, options = {}) {
  const { fixMojibake = true } = options;

  let value = stripBom(String(raw ?? "").replace(/\r\n?/g, "\n"));
  value = maybeFixMojibake(value, { fixMojibake });
  value = stripUnsafeControlChars(value);

  const lowerExt = String(ext ?? "").toLowerCase();
  if (lowerExt === ".md" || lowerExt === ".mdx") {
    return cleanMarkdownLikeContent(value, { fixMojibake });
  }

  return cleanJsxLikeContent(value, { fixMojibake });
}

export function extractTitleFromContent(text, fallbackTitle = "Page") {
  const lines = String(text ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines.slice(0, 12)) {
    const match = line.match(/^#{1,6}\s+(.+)$/);
    if (!match) continue;

    const title = match[1].trim().replace(/\s+/g, " ");
    if (title && title.length <= 100 && !/[{}()[\]=<>]/.test(title)) {
      return title;
    }
  }

  return fallbackTitle;
}

export function summarizeText(text, maxChars = 220) {
  const oneLine = String(text ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/^#{1,6}\s+/.test(line))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  if (oneLine.length <= maxChars) return oneLine;
  return `${oneLine.slice(0, maxChars).trim()}…`;
}