# replace_links.ps1
# Targeted link replacement using links_to_replace.json
# Safe behavior: exact-string replace only, skip NOT_FOUND, make .bak backups, skip missing files.

param(
  [string]$Root = ".",
  [string]$MapFile = "links_to_replace.json",
  [switch]$Apply
)

$ErrorActionPreference = "Stop"

$mapPath = Join-Path $Root $MapFile
if (!(Test-Path $mapPath)) {
  throw "Cannot find $mapPath (run this from your repo root or pass -Root)."
}

$items = Get-Content -Raw -Encoding UTF8 $mapPath | ConvertFrom-Json

# Group by file for fewer reads/writes
$byFile = $items |
  Where-Object { $_.suggested_path -and $_.suggested_path -ne "NOT_FOUND" -and $_.original_link } |
  Group-Object -Property file

$changedFiles = 0
$totalReplacements = 0

foreach ($g in $byFile) {
  $rel = $g.Name

  # Normalize path separators to current OS
  $relNorm = $rel -replace '/', '\'  # your JSON uses .\app\... already, but keep it consistent
  $filePath = Join-Path $Root $relNorm

  if (!(Test-Path $filePath)) {
    Write-Host "SKIP missing: $rel"
    continue
  }

  $content = Get-Content -Raw -Encoding UTF8 $filePath
  $new = $content
  $fileRepl = 0

  foreach ($row in $g.Group) {
    $old = [string]$row.original_link
    $rep = [string]$row.suggested_path

    if ([string]::IsNullOrWhiteSpace($rep)) { continue }
    if ($rep -eq "NOT_FOUND") { continue }

    # exact-string replace (case-sensitive, conservative)
    if ($new.Contains($old)) {
      # Replace all occurrences of that exact string
      $beforeLen = $new.Length
      $new = $new.Replace($old, $rep)

      # Count approx occurrences replaced this pass (cheap + safe)
      # (We count using split; avoids regex)
      $count = ($content.Split($old)).Count - 1
      if ($count -gt 0) { $fileRepl += $count }
    }
  }

  if ($fileRepl -gt 0 -and $new -ne $content) {
    $totalReplacements += $fileRepl
    $changedFiles++

    if ($Apply) {
      Copy-Item $filePath "$filePath.bak" -Force
      Set-Content -Path $filePath -Value $new -Encoding UTF8
      Write-Host "UPDATED ($fileRepl): $rel"
    } else {
      Write-Host "WOULD UPDATE ($fileRepl): $rel"
    }
  }
}

Write-Host ""
Write-Host "Files changed: $changedFiles"
Write-Host "Total replacements: $totalReplacements"
Write-Host "Mode: " + ($(if ($Apply) { "APPLY" } else { "DRY-RUN (use -Apply)" }))
