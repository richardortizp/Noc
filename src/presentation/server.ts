import { CheckService } from "../domain/use-cases/checks/check-service.js";
import { CronService } from "./cron/cron-service.js";

export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      new CheckService(
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute("https://google.com");
      // new CheckService().execute("https://google.com");
    });
  }
}
