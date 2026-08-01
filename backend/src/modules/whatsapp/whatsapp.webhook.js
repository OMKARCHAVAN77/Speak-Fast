class WhatsAppWebhook {


  async verifyWebhook(req, res) {

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];


    // Webhook verification logic will be added later

    if (mode && token) {

      return res.status(200).send(challenge);

    }


    return res.sendStatus(403);
  }



  async receiveWebhook(req, res) {

    try {

      const webhookData = req.body;


      // Incoming WhatsApp events handling
      // Message status / replies logic will be added later


      console.log(
        "WhatsApp Webhook Received:",
        webhookData
      );


      return res.sendStatus(200);


    } catch (error) {

      console.log(error);

      return res.sendStatus(500);

    }

  }

}


export default new WhatsAppWebhook();