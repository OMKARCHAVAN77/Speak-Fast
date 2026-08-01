import whatsappService from "./whatsapp.service.js";

class WhatsAppController {

  async sendStudentMessage(req, res) {
    try {

      const student = req.body;

      await whatsappService.sendStudentMessage(student);

      return res.status(200).json({
        success: true,
        message: "Student message sent successfully"
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
  }


  async sendTeacherMessage(req, res) {
    try {

      const student = req.body;

      await whatsappService.sendTeacherMessage(student);

      return res.status(200).json({
        success: true,
        message: "Teacher message sent successfully"
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }
  }

}

export default new WhatsAppController();