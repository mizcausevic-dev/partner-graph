$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ProofImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7,10,15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233,243,255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186,200,218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55,255,139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25,199,255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Partner Graph", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic proof render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ProofImage -Title "Relationship snapshot for the executive adjacency map" -Subtitle "One graph for buyer, platform, company, and operator-surface adjacency across the executive-intelligence estate." -Bullets @(
  "The overview keeps relationship count, strength, board usability, stale links, and modeled expansion value in one executive map.",
  "Leadership can see which named adjacencies support the strongest board and investor narratives right now.",
  "This layer sits after the radar and timing index and turns signals into composable relationship clusters."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ProofImage -Title "Relationship lane keeps buyer, target, and next move visible" -Subtitle "Every adjacency keeps executive buyer, cluster band, strength, and the next expansion move together." -Bullets @(
  "The lane makes it obvious which themes belong in expand-now, deepen, or watch mode.",
  "Strength and next move stay attached to the actual buyer and target instead of drifting into generic positioning.",
  "Leadership can see which relationships are commercially strong enough to package immediately."
) -OutputPath (Join-Path $screenshots "02-signal-lane-proof.png")

New-ProofImage -Title "Adjacency map ties company tags back to live surfaces" -Subtitle "Evidence state, board use, company tags, and related surfaces stay readable in one executive table." -Bullets @(
  "This view keeps IBM, Azure, FinTech, biotech, nonprofit, PropTech, and robotics traces tied to real surfaces.",
  "Board-use score and evidence state remain visible before any relationship is promoted into a packet.",
  "Leadership can see which adjacencies are already strong and which still need proof refresh."
) -OutputPath (Join-Path $screenshots "03-window-map-proof.png")

New-ProofImage -Title "Priority clusters keep relationship sequencing honest" -Subtitle "Cluster band, expansion value, and next move remain attached to the relationship itself." -Bullets @(
  "The graph is about relationship sequencing: what should expand now, what should deepen, and what still belongs on watch.",
  "Board readiness stays bounded to evidence and relationship strength instead of drifting into unsupported claims.",
  "This creates a repeatable executive cadence for packaging named-company and buyer adjacencies."
) -OutputPath (Join-Path $screenshots "04-board-pressure-proof.png")
