$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8080/')
$listener.Start()
Write-Host 'Server running on http://localhost:8080'

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $response = $context.Response
    $requestUrl = $context.Request.Url.LocalPath

    if ($requestUrl -eq '/') { $requestUrl = '/index.html' }
    $filePath = Join-Path 'd:\code\website' ($requestUrl -replace '/', '\')

    if (Test-Path $filePath -PathType Leaf) {
        $content = [System.IO.File]::ReadAllBytes($filePath)
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $ct = switch ($ext) {
            '.html' { 'text/html; charset=utf-8' }
            '.css'  { 'text/css; charset=utf-8' }
            '.js'   { 'application/javascript; charset=utf-8' }
            '.png'  { 'image/png' }
            '.jpg'  { 'image/jpeg' }
            '.svg'  { 'image/svg+xml' }
            '.webp' { 'image/webp' }
            default { 'application/octet-stream' }
        }
        $response.ContentType = $ct
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
        $bytes = [System.Text.Encoding]::UTF8.GetBytes('Not found')
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
    $response.OutputStream.Close()
}
