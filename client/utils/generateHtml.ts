type descriptionsWithValue = {
    number: number;
    text: string;
    value: number
}[]

type questionsFormatted = {
    number: number;
    answers: {
        letter: string;
        value: number
    }[];
}[]

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



export function generateHtml(feedback: any,
                             dataProductValue: number[],
                             questionsFormatted: questionsFormatted): string {

    const descriptionsWithValue = descriptions.map((desc, i) => ({
        number: i + 1,
        text: desc,
        value: dataProductValue[i],
    }));

    const descHtml = renderDescriptions(descriptionsWithValue);
    const questionsHtml = renderQuestions(questionsFormatted);

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


const renderDescriptions = (descList: descriptionsWithValue) =>
    descList.map(({number, text, value}) =>
        `<p><strong>${number}.</strong> ${text} - ${value}%</p>`).join("");

const renderQuestions = (questions: questionsFormatted) =>
    questions.map(({number, answers}) =>
        `<p><strong>Питання - ${number}</strong></p>
        <ul>${answers.map(({letter, value}) =>
            `<li>${letter} ${value}</li>`).join("")}</ul>`).join("");