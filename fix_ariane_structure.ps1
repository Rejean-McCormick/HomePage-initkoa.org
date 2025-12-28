# Set the root path to your Ariane folder
$RootPath = "C:\MyCode\OkidoWiki\HomePage\app\technology\ariane"

Write-Host "Starting Ariane Architecture Restructure..." -ForegroundColor Cyan

# Function to safely rename a directory
function Move-Dir {
    param ($Parent, $OldName, $NewName)
    $Source = Join-Path $Parent $OldName
    $Dest = Join-Path $Parent $NewName

    if (Test-Path $Source) {
        if (-not (Test-Path $Dest)) {
            Rename-Item -Path $Source -NewName $NewName
            Write-Host "Renamed: $OldName -> $NewName" -ForegroundColor Green
        } else {
            Write-Host "Skipped: $NewName already exists." -ForegroundColor Yellow
        }
    } else {
        Write-Host "Missing: Could not find $Source" -ForegroundColor Red
    }
}

# ---------------------------------------------------------
# 1. RENAME FOLDERS (Structure Cleanup)
# ---------------------------------------------------------

# --- THESEUS ---
$TheseusPath = Join-Path $RootPath "theseus"
Move-Dir -Parent $TheseusPath -OldName "overview" -NewName "engine-logic"
Move-Dir -Parent $TheseusPath -OldName "theseus-drivers" -NewName "drivers"
Move-Dir -Parent $TheseusPath -OldName "theseus-state-identification" -NewName "state-identification"

# --- ATLAS ---
$AtlasPath = Join-Path $RootPath "atlas"
Move-Dir -Parent $AtlasPath -OldName "overview" -NewName "architecture"
Move-Dir -Parent $AtlasPath -OldName "atlas-core-schema" -NewName "core-schema"
Move-Dir -Parent $AtlasPath -OldName "atlas-graph-model" -NewName "graph-model"
Move-Dir -Parent $AtlasPath -OldName "atlas-ontology-vocabulary" -NewName "ontology"

# --- CONSUMERS ---
$ConsumersPath = Join-Path $RootPath "consumers"
Move-Dir -Parent $ConsumersPath -OldName "overview" -NewName "integration-patterns"
Move-Dir -Parent $ConsumersPath -OldName "consumers-ai-agent-integration" -NewName "ai-agents"
Move-Dir -Parent $ConsumersPath -OldName "consumers-future-overlay-client" -NewName "overlay-client"
Move-Dir -Parent $ConsumersPath -OldName "hybrid-mapping-and-human-guided-assistants" -NewName "hybrid-mapping"

# --- CONCEPTS ---
$ConceptsPath = Join-Path $RootPath "concepts"
Move-Dir -Parent $ConceptsPath -OldName "background-ui-as-data" -NewName "ui-as-data"

# ---------------------------------------------------------
# 2. UPDATE CONTENT (Fix Imports & Links)
# ---------------------------------------------------------

Write-Host "`nUpdating file content references..." -ForegroundColor Cyan

$Files = Get-ChildItem -Path $RootPath -Recurse -Include "*.tsx","*.mdx","*.ts"

foreach ($File in $Files) {
    $Content = Get-Content $File.FullName -Raw
    $OriginalContent = $Content

    # Replace Theseus Links
    $Content = $Content -replace "theseus/overview", "theseus/engine-logic"
    $Content = $Content -replace "theseus/theseus-drivers", "theseus/drivers"
    $Content = $Content -replace "theseus/theseus-state-identification", "theseus/state-identification"
    # Fallback for relative links inside Theseus folder
    $Content = $Content -replace "\.\./theseus-drivers", "../drivers"
    $Content = $Content -replace "\.\./theseus-state-identification", "../state-identification"

    # Replace Atlas Links
    $Content = $Content -replace "atlas/overview", "atlas/architecture"
    $Content = $Content -replace "atlas/atlas-core-schema", "atlas/core-schema"
    $Content = $Content -replace "atlas/atlas-graph-model", "atlas/graph-model"
    $Content = $Content -replace "atlas/atlas-ontology-vocabulary", "atlas/ontology"
    # Fallback for relative links inside Atlas folder
    $Content = $Content -replace "\.\./atlas-core-schema", "../core-schema"
    $Content = $Content -replace "\.\./atlas-graph-model", "../graph-model"
    $Content = $Content -replace "\.\./atlas-ontology-vocabulary", "../ontology"

    # Replace Consumers Links
    $Content = $Content -replace "consumers/overview", "consumers/integration-patterns"
    $Content = $Content -replace "consumers/consumers-ai-agent-integration", "consumers/ai-agents"
    $Content = $Content -replace "consumers/consumers-future-overlay-client", "consumers/overlay-client"
    $Content = $Content -replace "consumers/hybrid-mapping-and-human-guided-assistants", "consumers/hybrid-mapping"
    # Fallback for relative links inside Consumers folder
    $Content = $Content -replace "\.\./consumers-ai-agent-integration", "../ai-agents"
    $Content = $Content -replace "\.\./consumers-future-overlay-client", "../overlay-client"
    $Content = $Content -replace "\.\./hybrid-mapping-and-human-guided-assistants", "../hybrid-mapping"
    
    # Replace Concepts Links
    $Content = $Content -replace "concepts/background-ui-as-data", "concepts/ui-as-data"
    $Content = $Content -replace "\.\./background-ui-as-data", "../ui-as-data"

    if ($Content -ne $OriginalContent) {
        Set-Content -Path $File.FullName -Value $Content
        Write-Host "Updated links in: $($File.Name)" -ForegroundColor Gray
    }
}

Write-Host "`nDONE! Architecture Restructured." -ForegroundColor Green