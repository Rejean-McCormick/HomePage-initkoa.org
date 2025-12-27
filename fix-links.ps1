# fix-links-v2.ps1

Write-Host "Démarrage de la correction des liens (Version Corrigée)..." -ForegroundColor Cyan

# 1. Liste des remplacements (Majuscule -> minuscule)
$replacements = @{
    "/KonnectED"      = "/konnected";
    "/Ethikos"        = "/ethikos";
    "/Kreative"       = "/kreative";
    "/keenKonnect"    = "/keenkonnect";
    "/EkoH"           = "/ekoh";
    "/Technical"      = "/technical";
    
    # Sous-modules
    "/Knowledge"      = "/knowledge";
    "/CertifiKation"  = "/certifikation";
    "/Korum"          = "/korum";
    "/Konsultations"  = "/konsultations";
    "/Konservation"   = "/konservation";
    "/Kontact"        = "/kontact";
    "/Konstruct"      = "/konstruct";
    "/Stockage"       = "/stockage";

    # Technology
    "/Ariane"         = "/ariane";
    "/Atlas"          = "/atlas";
    "/Concepts"       = "/concepts";
    "/Consumers"      = "/consumers";
    "/Theseus"        = "/theseus";
    "/Swarmcraft"     = "/swarmcraft";
    "/Core"           = "/core";
    "/Meta"           = "/meta";
    "/Runtime"        = "/runtime";
    "/Scaffold"       = "/scaffold"
}

# 2. Extensions (Simplifié)
$extensions = @(".tsx", ".ts", ".js", ".jsx", ".mdx", ".json")

# 3. Récupération des fichiers (Méthode Robuste)
# On récupère TOUS les fichiers récursivement, puis on filtre sur l'extension.
# C'est plus sûr que -Include qui a des comportements bizarres sur certains Windows.
$files = Get-ChildItem -Path "app" -Recurse -File | Where-Object { $extensions -contains $_.Extension }

$count = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    $modified = $false

    foreach ($key in $replacements.Keys) {
        # Vérification sensible à la casse (Case-Sensitive)
        if ($content -clike "*$key*") {
            # Remplacement
            $content = $content.Replace($key, $replacements[$key])
            $modified = $true
        }
    }

    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -NoNewline -Encoding UTF8
        Write-Host "Corrigé : $($file.Name)" -ForegroundColor Green
        $count++
    }
}

Write-Host "Terminé ! $count fichiers ont été mis à jour." -ForegroundColor Cyan