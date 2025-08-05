import { CheckService } from "../domain/use-cases/checks/check-service.js";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs.js";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.js";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl.js";
import { CronService } from "./cron/cron-service.js";
import { EmailService } from "./email/email.service.js";

const logRepository = new LogRepositoryImpl(new FileSystemDatasource());
const emailService = new EmailService();
export class Server {
  public static start() {
    console.log("Server started...");

    new SendEmailLogs(emailService, logRepository).execute(
      "rop.dbz@hotmail.com"
    );
  }
}
