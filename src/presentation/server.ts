import { CheckService } from "../domain/use-cases/checks/check-service.js";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.js";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl.js";
import { CronService } from "./cron/cron-service.js";

const logRepository = new LogRepositoryImpl(new FileSystemDatasource());
export class Server {
  public static start() {
    console.log("Server started...");

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      // const url = "http://localhost:3000";
      new CheckService(
        logRepository,
        undefined,
        undefined
        // () => console.log(`${url} is ok`),
        // (error) => console.log(error)
      ).execute(url);
      // new CheckService().execute("https://google.com");
    });
  }
}
