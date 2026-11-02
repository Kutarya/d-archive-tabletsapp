$ErrorActionPreference = 'Stop'
$projectDir = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path -LiteralPath (Join-Path $projectDir 'signing\release.properties'))) {
    throw 'The private release signing configuration is missing. Restore it from your private backup before building an update.'
}
$studioJdk = 'C:\Program Files\Android\Android Studio\jbr'
if (Test-Path -LiteralPath $studioJdk) { $env:JAVA_HOME = $studioJdk }
Push-Location -LiteralPath $projectDir
try {
    & '.\gradlew.bat' --no-daemon assembleRelease lintRelease
    if ($LASTEXITCODE -ne 0) { throw 'Release build or checks failed.' }
    Write-Output (Join-Path $projectDir 'app\build\outputs\apk\release\app-release.apk')
} finally { Pop-Location }
