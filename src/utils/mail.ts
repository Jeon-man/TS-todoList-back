import { NAVER, PASS } from '@config';
import NodeMailSender from 'nodemailer';

const mailSender = {
  sendMail: function (param: any): void {
    const transporter = NodeMailSender.createTransport({
      host: 'smtp.naver.com',
      port: 465,
      auth: {
        user: NAVER, // 보내는 메일의 주소
        pass: PASS, // 보내는 메일의 비밀번호
      },
    });
    console.log(NAVER);
    console.log(PASS);
    const mailOptions = {
      from: NAVER,
      to: param.toEmail,
      subject: param.subjectm,
      text: param.text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  },
};

export default mailSender;
