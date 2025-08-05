import type { EmailService } from "../../../presentation/email/email.service.js";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity.js";
import { LogRepository } from "../../repository/log.repository.js";

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) {
        throw new Error("Email log not sent");
      }
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        origin: "send-email-logs.ts",
        message: "Log email sent",
      });
      return true;
    } catch (error) {
      console.log(error);
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        origin: "send-email-logs.ts",
        message: `${error}`,
      });
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
