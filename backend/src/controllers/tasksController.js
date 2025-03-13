const tasksModel = require('../models/tasksModel')

const getAll = async (req, res) => {
    const tasks = await tasksModel.getAll();
    return res.status(200).json(tasks)
}

const sendDate = async (req, res) => {
    const tasks = await tasksModel.sendDate(req.body)
    return res.status(201).json(tasks)
}

const deleteTask = async (request, response) => {
    const { id } = request.params

    await tasksModel.deleteTask(id)
    return response.status(204).json();
}

const updateTask = async(request, response) => {
    const {body} = request
    const { id } = request.params

    await tasksModel.updateTask(id, body)
    return response.status(204).json()
}

module.exports = {
    getAll,
    sendDate,
    deleteTask,
    updateTask
}

