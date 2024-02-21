import sgMail from '@sendgrid/mail';

interface MailData {
  to: string;
  subject: string;
  text: string;
}

export const sendEmail = async ({ to, subject, text }: MailData) => {
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY!);
  const msg = {
    from: `User Management <${process.env.SEND_GRID_EMAIL!}>`,
    to,
    subject,
    text,
  };

  await sgMail.send(msg);
};
