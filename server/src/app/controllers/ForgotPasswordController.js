import connection from "../../database/connection";
import nodemailer from "nodemailer";
import Cryptr from "cryptr";

class ForgotPasswordControllerController {
  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await await connection("user")
        .where("email", email)
        .select("name", "hashPassword")
        .first();

      if (!user) return res.status(400).json({ error: "user não encontrada" });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "myteste713@gmail.com",
          pass: "teste123.",
        },
      });

      const cryptr = new Cryptr(email);
      const hashPassword = cryptr.decrypt(user.hashPassword);

      const mailOptions = {
        from: "myteste713@gmail.com",
        to: email,
        subject: "Tasks - ForgetPassword",
        text: `Olá ${user.name}, parece que você esqueceu sua senha. Aqui está a senha: ${hashPassword}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.status(400).json({ error: error });
        } else console.log("Email sent: " + info.response);
        return res
          .status(200)
          .json({ resultado: "Email enviando com sucesso" });
      });
    } catch (err) {
      return res
        .status(400)
        .json({ erro: "Erro ao enviar, por favor tente mais tarde" });
    }
  }
}
export default new ForgotPasswordControllerController();
