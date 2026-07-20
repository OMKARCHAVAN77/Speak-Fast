import transporter from "../config/mail.config.js";

const sendEmail = async (to, subject, html) => {

    await transporter.sendMail({

        from: `"SpeakFast Support" <${process.env.EMAIL_USER}>`,

        to,

        subject,

        html,

        text: "Password Reset Request"

    });

};

export default sendEmail;