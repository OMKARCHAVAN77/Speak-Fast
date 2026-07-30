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



import whatsappApi from "../../config/axios.js";
import env from "../../config/env.js";

class WhatsAppService {

  async sendStudentMessage(student) {

    try {

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
            body: `Hello ${student.name},

Your registration has been completed successfully.

Welcome to Sanket English Academy.

Thank you.`
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

      const response = await whatsappApi.post(
        `/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: "whatsapp",

          to: env.TEACHER_WHATSAPP_NUMBER.toString(),

          type: "text",

          text: {
            body: `New Student Registered

Name: ${student.name}
Phone: ${student.phone}
Email: ${student.email}`
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