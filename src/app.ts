import { envs } from "./config/plugins/envs.plugin.js";
import { Server } from "./presentation/server.js";

(async () => {
  main();
})();

async function main() {
  Server.start();
  // console.log(envs);
}
