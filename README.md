# ARQ/LAB · Arquitectura de Computadores I

Aplicación SPA en español para acompañar el curso DIC-112 con clases magistrales, prácticas guiadas, trabajo autónomo y preguntas de repaso. El contenido sigue el Proyecto Formativo V2 ubicado en la carpeta madre.

## Desarrollo

Requisitos: Node.js compatible con Vite 8 y npm.

```powershell
npm ci
npm run dev
```

Verifica con `npm run lint` y `npm run build`.

## Docker

Con Docker Desktop iniciado, ejecuta `docker compose up --build` y abre `http://localhost:4173`.

## PWA

El build genera el manifiesto y service worker. La instalación y caché offline requieren HTTPS en producción. Notas y progreso se guardan solo en el navegador; no hay backend ni calificación.

## Publicar en GitHub

Este directorio es un repositorio independiente para no incluir los DOCX, ODT y PDF del curso. El remoto `origin` apunta al repositorio GitHub del proyecto. Desde esta carpeta ejecuta:

```powershell
git add .
git commit -m "Construir sitio educativo ARQ/LAB"
git push -u origin main
```

El primer push publicará únicamente los archivos del sitio; los PDF, DOCX, DOCM y ODT están excluidos.

## Referencias del template

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
