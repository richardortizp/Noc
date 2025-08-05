import { LogEntity, LogSeverityLevel } from "../../entities/log.entity.js";
import { LogRepository } from "../../repository/log.repository.js";

const origin = "check-service.ts";
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly LogRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: origin,
      });
      this.LogRepository.saveLog(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: origin,
      });
      this.LogRepository.saveLog(log);
      this.errorCallback && this.errorCallback(`${error}`);
      return false;
    }
  }
}
