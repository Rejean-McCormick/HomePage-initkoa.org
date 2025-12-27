# fix-links.ps1

Write-Host "Démarrage de la correction des liens dans le code..." -ForegroundColor Cyan

# 1. Liste des remplacements (Majuscule -> minuscule)
# Nous ciblons les segments d'URL spécifiques que vous avez renommés.
$replacements = @{
    "/KonnectED"      = "/konnected";
    "/Ethikos"        = "/ethikos";
    "/Kreative"       = "/kreative";
    "/keenKonnect"    = "/keenkonnect";
    "/EkoH"           = "/ekoh";
    "/Technical"      = "/technical";
    
    # Sous-modules Konnaxion
    "/Knowledge"      = "/knowledge";
    "/CertifiKation"  = "/certifikation";
    "/Korum"          = "/korum";
    "/Konsultations"  = "/konsultations";
    "/Konservation"   = "/konservation";
    "/Kontact"        = "/kontact";
    "/Konstruct"      = "/konstruct";
    "/Stockage"       = "/stockage";

    # Technology / Ariane
    "/Ariane"         = "/ariane";
    "/Atlas"          = "/atlas";
    "/Concepts"       = "/concepts";
    "/Consumers"      = "/consumers";
    "/Theseus"        = "/theseus";

    # Technology / Swarmcraft
    "/Swarmcraft"     = "/swarmcraft";
    "/Core"           = "/core";
    "/Meta"           = "/meta";
    "/Runtime"        = "/runtime";
    "/Scaffold"       = "/scaffold"
}

# 2. Extensions de fichiers à scanner
$extensions = @("*.tsx", "*.ts", "*.js", "*.jsx", "*.mdx", "*.json")

# 3. Parcourir tous les fichiers dans le dossier 'app'
$files = Get-ChildItem -Path "app" -Recurse -Include $extensions

$count = 0

foreach ($file in $files) {
    # Lire le contenu
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Appliquer tous les remplacements
    foreach ($key in $replacements.Keys) {
        # Remplacement insensible à la casse pour trouver la chaîne, mais on remplace par la version minuscule précise
        # Note: .Replace() de .NET est sensible à la casse, ce qui est parfait ici car on veut cibler les Majuscules spécifiques.
        if ($content.Contains($key)) {
            $content = $content.Replace($key, $replacements[$key])
        }
    }

    # Si le fichier a changé, on sauvegarde
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline -Encoding UTF8
        Write-Host "Corrigé : $($file.Name)" -ForegroundColor Green
        $count++
    }
}

Write-Host "Terminé ! $count fichiers ont été mis à jour." -ForegroundColor Cyan
Write-Host "Veuillez vérifier les changements avec 'git diff' avant de commiter." -ForegroundColor Yellow