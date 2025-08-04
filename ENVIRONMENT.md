# Configuracion de variables de entorno

Mediante el paquete dotenv podemos manejar nuestras variables de entorno.
Por lo cual es necesario descargar e instalar dicha referencia.

## Instalacion

Para instalar el paquete ejecutamos el comando

```shell
npm i dotenv
```

## Configuracion

En el archivo, registramos nuestras variables de entorno, si el archivo no existe hay que registrarlo en la raiz:
ejemplo

```text
PORT=3000
MAILER_EMAIL=rr@gmail.com
```

Para utilizar las variables de entorno en nuestro archivo principal importamos dotenv en javascript seria asi:

CommonJS

```js
const dotenv = require("dotenv");
dotenv.config();
```

En typescript ES6 (typescript)

```ts
import "dotenv/config";
```

## Validacion de variables

Para validar nuestras variables de entorno lo podemos hacer mediante el paquete env-var. Es el que utilizaremos.

```shell
npm i env-var
```

Para usarlo integrarlo a nuestro proyecto será de la siguiente manera.

```ts
import "dotenv/config";
import envVar from "env-var";
// Crea una instancia con envVar.from()
const env = envVar.from(process.env);
export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
  ...
};
```

Esto lo que hace es validar el tipo de dato de las variables de entorno, en este ejemplo se valida que los valores son requeridos y que cumplan con el formato correspondiente.

Ahora para hacer el uso de las variables de entorno las cargamos desde nuestro archivo inicial haciendo referencia en el import donde tengamos esta configuracion.

Ejemplo invocado desde app.ts

```ts
import { envs } from "./config/plugins/envs.plugin.js";
import { Server } from "./presentation/server.js";

(async () => {
  main();
})();

async function main() {
  // Server.start();
  console.log(envs.PORT);
}
```
