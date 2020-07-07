/* eslint-disable no-undef */
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Cryptr from "cryptr";

import * as Yup from "yup";
import authConfig from "../../config/auth";
import connection from "../../database/connection";

class SessionController {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await connection("user").where("email", email).first();

    if (!user) {
      return res.status(400).json({ erro: "Usuario não foi encontrado" });
    }
    const cryptr = new Cryptr(email);
    const hashPassword = cryptr.decrypt(user.hashPassword);

    if (!(hashPassword === password)) {
      return res.status(400).json({ erro: "Senha não corresponde" });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
