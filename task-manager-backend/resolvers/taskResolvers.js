const { Task } = require("../models");

const taskResolvers = {
  tasks: async () => await Task.findAll(),
  task: async ({ id }) => await Task.findByPk(id),
  createTask: async ({ title, description }, { user }) => {
    console.log("=========CREATE TASK======");
    console.log(title, description, user);

    if (!user) throw new Error("Unauthorized");
    return await Task.create({ title, description, userId: user.id });
  },
  updateTask: async ({ id, title, description }, { user }) => {
    if (!user) throw new Error("Unauthorized");
    const task = await Task.findByPk(id);
    if (task.userId !== user.id) throw new Error("Forbidden");
    task.title = title || task.title;
    task.description = description || task.description;
    await task.save();
    return task;
  },
  deleteTask: async ({ id }, { user }) => {
    if (!user) throw new Error("Unauthorized");
    const task = await Task.findByPk(id);
    if (task.userId !== user.id) throw new Error("Forbidden");
    await task.destroy();
    return "Task deleted";
  },
};

module.exports = taskResolvers;
