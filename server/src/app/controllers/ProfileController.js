import connection from "../../database/connection";

class ProfileController {
  async index(req, res) {
    const user_id = req.headers.authorization;
    try {
      const user = await connection("user")
        .where("id", user_id)
        .select("id")
        .first();

      if (!user) {
        return res.status(404).json({ erro: "Nenhuma usuario encontrada" });
      }
      const tasks = await connection("tasks")
        .where("user_id", user_id)
        .select("*");

      if (tasks.length == 0) {
        return res
          .status(200)
          .json({ erro: "Nenhuma Tarefa cadastrado com esse ID" });
      }

      return res.status(200).json(tasks);
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Erro ao listar as tarefas desta organização" });
    }
  }
}
export default new ProfileController();
