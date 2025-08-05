# NOC (Network Operations Center)

Este proyecto es una aplicación Node.js desarrollada en TypeScript para monitorear servicios web mediante tareas programadas (cron jobs). Permite realizar chequeos periódicos a URLs y registrar el estado de los servicios.

## Estructura del Proyecto

```
.
├── src/
│   ├── app.ts
│   ├── domain/
│   │   └── use-cases/
│   │       └── checks/
│   │           └── check-service.ts
│   └── presentation/
│       ├── server.ts
│       └── cron/
│           └── cron-service.ts
├── test/
├── package.json
├── tsconfig.json
├── nodemon.json
└── .gitignore
```

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Clonar el archivo .env.template a .env
4. Configurar las variables de entorno

```
PORT=3000
MAILER_EMAIL=
MAILER_SECRET_KEY=
PROD=false
```

## Scripts

- **Desarrollo:**

  ```sh
  npm run dev
  ```

  Usa `nodemon` y recarga automáticamente los cambios.

- **Build:**

  ```sh
  npm run build
  ```

  Compila el proyecto a JavaScript en la carpeta `dist/`.

- **Producción:**

  ```sh
  npm start
  ```

  Ejecuta la aplicación compilada.

- **Test:**
  ```sh
  npm test
  ```
  Ejecuta los tests con Jest.

## Descripción de Componentes

- `src/app.ts`: Punto de entrada de la aplicación.
- `src/presentation/server.ts`: Inicializa el servidor y los cron jobs.
- `src/presentation/cron/cron-service.ts`: Servicio para crear y gestionar tareas programadas.
- `src/domain/use-cases/checks/check-service.ts`: Lógica para chequear el estado de una URL.

## Configuración

- **.gitignore:** Ignora `node_modules`, `.env`, `logs/` y `dist/`.
- **nodemon.json:** Configuración para desarrollo con recarga automática.
- **tsconfig.json:** Configuración de TypeScript.

## Dependencias principales

- [cron](https://www.npmjs.com/package/cron): Para tareas programadas.
- [node-cron](https://www.npmjs.com/package/node-cron): Alternativa para cron jobs.
- [typescript](https://www.npmjs.com/package/typescript): Tipado estático.
- [jest](https://www.npmjs.com/package/jest): Testing.

## Licencia

ISC

---

Desarrollado por **Ricardo Ortiz**.

// filepath:
