import whatsappApi from "../../config/axios.js";
import dotenv from "dotenv";

dotenv.config();


class WhatsAppService {

  async sendStudentMessage(student) {

    try {

      console.log("📦 Student Payload:", student);

      const phone = student.phone.toString().startsWith("91")
        ? student.phone.toString()
        : `91${student.phone}`;

      const response = await whatsappApi.post(
        `/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: "whatsapp",

          to: phone,

          type: "text",

          text: {
            body: `🎉 Hello ${student.name},

Your registration has been completed successfully.

📚 Course: ${student.courseName}
💰 Course Fees: ₹${student.coursePrice}

👨‍🏫 Teacher: ${student.teacherName}

🗓️ Class Date: ${student.slotDate}
🕒 Class Time: ${student.slotTime}

📍 District: ${student.district}

🎓 Qualification: ${student.qualification}
💼 Occupation: ${student.occupation}

🔗 Google Meet Link:
${student.googleMeetLink}

Thank you for choosing SpeakFast English Academy.

We look forward to helping you improve your English. 😊`
          }
        }
      );

      console.log("✅ Student WhatsApp Message Sent");
      console.log(response.data);

      return response.data;

    } catch (error) {

      console.error("❌ Student WhatsApp Message Error");
      console.error(error.response?.data || error.message);

      throw error;
    }

  }



  async sendTeacherMessage(student) {

    try {

      console.log("📦 Teacher Payload:", student);

      console.log("Teacher Number from env:", process.env.TEACHER_WHATSAPP_NUMBER);
      console.log("Phone Number ID:", process.env.WHATSAPP_PHONE_NUMBER_ID);

      const response = await whatsappApi.post(
        `/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: "whatsapp",

          to: process.env.TEACHER_WHATSAPP_NUMBER.toString(),

          type: "text",

          text: {
            body: `📢 New Student Registration

      👤 Name : ${student.name}
      📞 Phone : ${student.phone}
      📧 Email : ${student.email}

      📚 Course : ${student.courseName}
      💰 Fees : ₹${student.coursePrice}

      📅 Slot Date : ${student.slotDate}
      🕒 Slot Time : ${student.slotTime}

      📍 District : ${student.district}
      🎓 Qualification : ${student.qualification}
      💼 Occupation : ${student.occupation}

      🔗 Google Meet :
      ${student.googleMeetLink}`
          }
        }
      );

      console.log("✅ Teacher WhatsApp Message Sent");
      console.log(response.data);

      return response.data;

    } catch (error) {

      console.error("❌ Teacher WhatsApp Message Error");
      console.error(error.response?.data || error.message);

      throw error;
    }

  }

}

export default new WhatsAppService();