const { response } = require('../app');
const connection = require('./connection')

const getAll = async () => {
    const tasks = await connection.execute('SELECT * FROM tasks')
    return tasks[0];
};

const sendDate = async (task) => {
    const { title } =  task;

    const query = 'INSERT INTO tasks(title_user, status_user, created_user) VALUES(?, ?, ?)';
    const dateUTC = new Date(Date.now()).toUTCString();

    const [createTask] = await connection.execute(query, [title, 'pendente', dateUTC])

    return {insertId: createTask.insertId};
}

const deleteTask = async (id) => {
    const [removeTask] = await connection.execute("DELETE FROM tasks WHERE id_user = ?", [id]);
    return removeTask;
}

const updateTask = async (id, task) => {
    const query = "UPDATE tasks SET title_user = ?, status_user = ? WHERE id_user = ?"
    const { title, status } = task;

    const [updateTask] = await connection.execute(query, [title, status, id]);
    return updateTask;
}

module.exports = {
    getAll,
    sendDate,
    deleteTask,
    updateTask
}