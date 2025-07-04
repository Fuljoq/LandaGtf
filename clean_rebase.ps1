# Script para limpiar el estado de rebase
try {
    $gitDir = git rev-parse --git-dir
    $rebaseDir = Join-Path $gitDir "rebase-merge"
    
    if (Test-Path $rebaseDir) {
        Remove-Item -Recurse -Force $rebaseDir
        Write-Host "Directorio de rebase eliminado correctamente."
    } else {
        Write-Host "No se encontró el directorio de rebase."
    }
} catch {
    Write-Host "Error al limpiar el estado de rebase: $_"
}
