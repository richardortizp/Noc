import "dotenv/config";
import envVar from "env-var"; // ✅ Correcto para ESM

// Creas una instancia con envVar.from()
const env = envVar.from(process.env);
export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  MAILER_MAIL: env.get("MAILER_EMAIL").required().asEmailString(),
};
