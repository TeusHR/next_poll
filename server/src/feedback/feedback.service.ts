import { Injectable, Logger } from "@nestjs/common";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { Resend } from "resend";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class FeedbackService {
  private readonly logger = new Logger(FeedbackService.name);

  constructor(private mailerService: MailerService) {}
  // constructor(private readonly resendService: ResendService) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    const feedback: any = {
      name: createFeedbackDto.name,
      email: createFeedbackDto.email,
      value: createFeedbackDto.value,
      gender: createFeedbackDto.gender === "male" ? "чоловік" : "жінка",
      age: createFeedbackDto.age,
    };

    const descriptions = [
      "Рівень розвитку потреби у високій заробітної плати та матеріальну винагороду. Бажання мати роботу з гарним набором пільг та надбавок.",
      "Рівень розвитку потреби у добрих умовах роботита комфортній навколишній обстановці.",
      "Рівень розвитку потреби у структуруванні роботи, наявності зворотного зв'язку та інформації, що дозволяє судити про результати своєї роботи, потребу в зниженні невизначеності та встановлення правил та директив виконання роботи.",
      "Рівень розвитку потреби в соціальних контактах: спілкування з широким колом людей, легкий ступінь довірливості та зв'язків із колегами.",
      "Рівень розвитку потреби у формуванні та підтримцідовгострокових, стабільних взаємин,мале число колег по роботі, значний ступінь близькості взаємин, довірливості.",
      "Рівень розвитку потреби у завоюванні ппізнання з боку інших людейу тому, щоб оточуючі цінували заслуги, досягнення та успіхи індивідуума.",
      "Рівень розвитку потреби впостановці для себе сміливих, складних цілей та їх досягненні, дотримання поставлених цілей і бути самим мотивованим.",
      "Рівень розвитку потреби у впливовості та владі: прагнення керувати іншими, наполегливе прагнення конкуренції та впливовості.",
      "Рівень розвитку потреби в різноманітності та змінах , прагнення уникати рутини, нудьги.",
      "Рівень розвитку потреби в креативності: потреба бути аналізуючим, думаючим працівником, відкритим для нових ідей.",
      "Рівень розвитку потреби у самовдосконаленні, зростанні та розвитку як особистості.",
      "Рівень розвитку потреби в цікавій суспільно корисній роботі:потреба у роботі наповненій змістом, з елементом суспільної корисності.",
    ];

    const value = [75, 60, 50, 80, 40, 70, 65, 55, 45, 90, 85, 95];

    const descriptionsWithValue = descriptions.map((desc, i) => ({
      number: i + 1,
      text: desc,
      value: value[i],
    }));
    const questionAnswers = createFeedbackDto.question || [];

    const questionsFormatted = questionAnswers.map((q, i) => {
      return {
        number: i + 1,
        answers: Object.entries(q).map(([key, value]) => ({
          letter: key.toUpperCase(),
          value,
        })),
      };
    });

    const resend = new Resend("re_2o7Zm4Gv_E9o2UXNkTaPGLem5JdtC21cd");

    // await resend.emails.send({
    //   from: "Acme <onboarding@resend.dev>",
    //   to: "sennqq7@gmail.com",
    //   subject: "Форма зворотного зв'язку",
    //   html: this.generateHtml(
    //     feedback,
    //     descriptionsWithValue,
    //     questionsFormatted,
    //   ),
    // });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "sennqq7@gmail.com",
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });

    // await this.resendService.send({
    //   from: "workemailtemp7@gmail.com",
    //   to: "sennqq7@gmail.com",
    //   subject: "Форма зворотного зв'язку",
    //   react: this.generateHtml(
    //     feedback,
    //     descriptionsWithValue,
    //     questionsFormatted,
    //   ),
    // });

    // this.mailerService
    //   .sendMail({
    //     to: process.env.ROOT_EMAIL,
    //     from: process.env.SMTP_USER,
    //     subject: "Форма зворотного зв'язку",
    //     template: "feedback",
    //     context: {
    //       ...feedback,
    //       descriptionsWithValue,
    //       questionsFormatted,
    //     },
    //   })
    //   .catch((err) => {
    //     this.logger.error("CONTACTS EMAIL ERROR", err);
    //     console.log("CONTACTS EMAIL ERROR", err, new Date().toLocaleString());
    //   });

    return feedback;
  }

  generateHtml(
    feedback: any,
    descriptionsWithValue: { number: number; text: string; value: number }[],
    questionsFormatted: {
      number: number;
      answers: { letter: string; value: number }[];
    }[],
  ): string {
    const descHtml = descriptionsWithValue
      .map(
        (d) => `<p><strong>${d.number}.</strong> ${d.text} - ${d.value}%</p>`,
      )
      .join("");

    const questionsHtml = questionsFormatted
      .map(
        (q) =>
          `<p><strong>Питання - ${q.number}</strong></p>
      <ul style="margin-top: 0; margin-bottom: 0.5rem;">
        ${q.answers.map((a) => `<li>${a.letter} ${a.value}</li>`).join("")}
      </ul>`,
      )
      .join("");

    return `
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; font-family: Roboto, sans-serif; background-color: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 8px;">
      <h2>Зворотній зв'язок від ${feedback.name}</h2>
      <label>Пошта: <span>${feedback.email}</span></label>
      <h4>Вік: <span>${feedback.age}</span></h4>
      <h4>Стать: <span>${feedback.gender}</span></h4>
      <div class="result-values">${descHtml}</div>
      <h3>Результати по питаннях:</h3>
      ${questionsHtml}
    </div>
  `;
  }
}
