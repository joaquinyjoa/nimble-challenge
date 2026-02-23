# Nimble Challenge

Aplicación frontend construida con React + Vite para listar búsquedas laborales y enviar postulaciones con un repositorio de GitHub.

## Stack

- React 19
- Vite 8
- Bootstrap 5
- ESLint 9

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+

## Instalación

```bash
npm install
```

## Scripts disponibles

- Desarrollo:

```bash
npm run dev
```

- Build de producción:

```bash
npm run build
```

- Vista previa de build:

```bash
npm run preview
```

- Linter:

```bash
npm run lint
```

## Flujo de la app

1. Busca un candidato por email fijo (`App.jsx`).
2. Obtiene la lista de jobs disponibles.
3. Permite ingresar la URL de un repo por cada job.
4. Envía la postulación al endpoint correspondiente.

## Estructura principal

```text
src/
	components/
		JobList.jsx
		JobItem.jsx
	hooks/
		useFetch.js
	services/
		api.js
	App.jsx
	App.css
	index.css
```

## API utilizada

La app consume el backend en:

```text
https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net
```

Endpoints usados:

- `GET /api/candidate/get-by-email?email=...`
- `GET /api/jobs/get-list`
- `POST /api/candidate/apply-to-job`

## Consideraciones

- El email del candidato está hardcodeado en `src/App.jsx`.
- No se requiere `.env` en la versión actual.
- El botón de postulación se habilita al cargar una URL de repositorio.

## Mejoras posibles

- Mover `BASE_URL` y el email de candidato a variables de entorno.
- Agregar validación más estricta de URL.
- Reemplazar `alert` por notificaciones UI no bloqueantes.
