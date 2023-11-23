import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();
const gmail = process.env.GMAIL;
const password = process.env.PASSWORD;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmail,
    pass: password,
  },
  debug: true,
});

async function sendEmail(email: string, link: string) {
  try {
    const mailSent = await transporter.sendMail({
      from: 'Equipe JDG',
      to: email,
      text: `Segue o link para a alteração da senha: ${link}`,
      subject: 'Alteração de senha',
    });
    return mailSent;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default sendEmail;
