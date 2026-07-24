import transporter from "../config/mailer.js";


const sendMail = async (to, subject, html) => {

  try {

    await transporter.sendMail({

      from: `"Speak Fast" <${process.env.EMAIL_USER}>`,

      to,

      subject,

      html,

    });


    console.log("✅ Email sent:", to);


  } catch (error) {

    console.error("❌ Email sending failed:", error.message);

    throw error;

  }

};


export default sendMail;