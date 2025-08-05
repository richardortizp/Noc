import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin.js";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../domain/entities/log.entity.js";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_MAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, htmlBody, subject, attachments = [] } = options;
    try {
      const sentInformation = await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "logs del servidor";
    const htmlBody = `
    <h3>Logs de sistema - NOC</h3>
    <p>Lorem velit non veniam test de envio de correo con archivo adjunto</p>
    <p>Ver logs adjuntos</p>
    `;
    const attachments: Attachment[] = [
      { filename: "logs-low.log", path: "./logs/logs-low.log" },
      { filename: "logs-high.log", path: "./logs/logs-high.log" },
      { filename: "logs-medium.log", path: "./logs/logs-medium.log" },
    ];

    return this.sendEmail({
      to,
      subject,
      attachments,
      htmlBody,
    });
  }
}
