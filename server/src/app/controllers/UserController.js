import connection from "../../database/connection";
import Cryptr from "cryptr";

class UserController {
  async create(req, res) {
    try {
      let { name, email, password } = req.body;

      const user = await connection("user")
        .where("email", email)
        .select("email")
        .first();

      if (user) {
        return res.status(406).json({ erro: "Email já existente" });
      }
      const cryptr = new Cryptr(email);
      const hashPassword = cryptr.encrypt(password);

      const { id } = await connection("user").insert({
        name,
        email,
        hashPassword,
      });

      return res.status(201).json({ id, name, email });
    } catch (err) {
      return res.status(401).json({ erro: "Erro ao criar" });
    }
  }
}
export default new UserController();
