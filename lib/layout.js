export function renderPage({ meta, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${renderMetaTags(meta)}
  ${renderFontLinks()}
  <link rel="stylesheet" href="/luvent/styles.css">
</head>
<body>
  ${renderNav()}
  <main>
    ${body}
  </main>
  ${renderFooter()}
  <script type="module" src="/luvent/js/main.js"></script>
</body>
</html>`;
}