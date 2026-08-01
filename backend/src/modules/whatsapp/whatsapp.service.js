// import whatsappApi from "../../config/axios.js";
// import env from "../../config/env.js";


// class WhatsAppService {


//   async sendStudentMessage(student) {

//     try {

//       const response = await whatsappApi.post(
//         `/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
//         {
//           messaging_product: "whatsapp",

//           to: student.phone,

//           type: "text",

//           text: {
//             body: `Hello ${student.name}, your registration is successful. Thank you for joining Speak Fast English Academy.`
//           }
//         }
//       );


//       console.log(
//         "Student WhatsApp Message Sent:",
//         response.data
//       );


//       return response.data;


//     } catch (error) {

//       console.log(
//         "Student WhatsApp Message Error:",
//         error.response?.data || error.message
//       );

//       throw error;
//     }

//   }



//   async sendTeacherMessage(student) {

//     try {

//       const response = await whatsappApi.post(
//         `/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
//         {
//           messaging_product: "whatsapp",

//           to: env.TEACHER_WHATSAPP_NUMBER,

//           type: "text",

//           text: {
//             body: `New Student Registered

// Name: ${student.name}
// Phone: ${student.phone}
// Email: ${student.email}`
//           }
//         }
//       );


//       console.log(
//         "Teacher WhatsApp Message Sent:",
//         response.data
//       );


//       return response.data;


//     } catch (error) {

//       console.log(
//         "Teacher WhatsApp Message Error:",
//         error.response?.data || error.message
//       );

//       throw error;
//     }

//   }

// }


// export default new WhatsAppService();

console.log("WhatsApp Service Loaded");

import whatsappApi from "../../config/axios.js";
import env from "../../config/env.js";

class WhatsAppService {

  async sendStudentMessage(student) {

    try {

      console.log("📦 Student Payload:", student);

      const phone = student.phone.toString().startsWith("91")
        ? student.phone.toString()
        : `91${student.phone}`;

      const response = await whatsappApi.post(
        `/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
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
      
      console.log("Teacher Number from env:", env.TEACHER_WHATSAPP_NUMBER);
      console.log("Phone Number ID:", env.WHATSAPP_PHONE_NUMBER_ID);

      const response = await whatsappApi.post(
        `/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: "whatsapp",

          to: env.TEACHER_WHATSAPP_NUMBER.toString(),

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