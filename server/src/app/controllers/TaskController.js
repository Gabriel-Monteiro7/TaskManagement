import connection from "../../database/connection";

class TaskController {
  async create(request, response) {
    const { name, deadline, priority, description } = request.body;
    const { user_id } = request;
    try {
      const user = await connection("user")
        .where("id", user_id)
        .select("name")
        .first();

      if (!user) {
        return response
          .status(404)
          .json({ error: "Não existe usuario com esse ID" });
      }
      const completed = false;
      await connection("tasks").insert({
        name,
        deadline,
        priority,
        description,
        completed,
        user_id,
      });

      return response
        .status(201)
        .json({ name, deadline, priority, description, completed, user_id });
    } catch (err) {
      return response.status(400).json({ erro: "Erro ao cadastrar" });
    }
  }

  async index(request, response) {
    // const { page = 1 } = request.query;
    try {
      const count = await connection("tasks")
        .count("id", { as: "number" })
        .first();
      const { user_id } = request;

      const tasks = await connection("tasks").where("user_id", user_id);

      // .limit(5)
      // .offset((page - 1) * 5)
      // .select(["tasks.*", "user.name", "user.email"]);

      response.header("X-Total-Count", count.number);

      if (tasks.length == 0) {
        return response.status(200).json([]);
      }

      return response.status(200).json(tasks);
    } catch (err) {
      return response.status(400).json({ erro: "Erro ao listar" });
    }
  }

  async delete(request, response) {
    const { id } = request.params;
    const { user_id } = request;

    try {
      const task = await connection("tasks")
        .where("id", id)
        .select("id", "user_id")
        .first();

      if (task.user_id != user_id) {
        return response.status(401).json({ error: "Operação não permitida" });
      }

      await connection("tasks").where("id", id).delete();
      return response.status(204).json();
    } catch (err) {
      return response.status(400).json({ error: "Erro ao deletar" });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { user_id } = request;
    try {
      let newTask = request.body;

      if (newTask === undefined) {
        return response
          .status(400)
          .json({ error: "Não possui dados pra atualizar" });
      }
      const task = await connection("tasks")
        .where("id", id)
        .select("id", "user_id")
        .first();
      if (task.user_id != user_id) {
        return response.status(401).json({ error: "Operação não permitida" });
      }
      await connection("tasks").where("id", id).update(newTask);

      return response.status(201).json(newTask);
    } catch (err) {
      return response.status(400).json({ error: "Erro ao atualizar" });
    }
  }
  async show(request, response) {
    const { id } = request.params;
    const { user_id } = request;
    const task = await connection("tasks")
      .where("user_id", user_id)
      .where("id", id)
      .first();

    if (!task) return response.status(400).json({ message: "Task not found." });
    return response.json(task);
  }
}
export default new TaskController();
