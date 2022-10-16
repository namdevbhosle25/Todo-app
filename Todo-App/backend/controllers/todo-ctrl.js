const todoModel = require('../models/todomodel');

const addingTodo = (req, res) => {

    try {
        let todo = new todoModel(req.body);
        todo.save((err, todo) => {
            if (err || !todo) {
                res.json({
                    success: false,
                });
            } else {
                res.json({
                    success: true,
                    data: todo,
                })
            }
        })
    } 
    catch(err){
        console.log(err);
    }
}

const viewingAllTodos = (req, res) => {

    try {

        todoModel.find().exec((err, todo) => {
            if (err || !todo || !todo.length === 0) {
                res.json({
                    success: false,
                });
            } else {
                res.json({
                    success: true,
                    data: todo,
                });
            }
        })

    } catch (err) {
        console.log(err);
    }
}

const viewingSingleTodo = (req, res) => {
    let _id = req.params._id;
    todoModel.findById(_id, (err, todo) => {
        if (err || !todo) {
            res.json({
                success: false,
            })
        }
        else {
            res.json({
                success: true,
                data: todo,
            })
        }
    })
}

const updatingTodo = (req, res) => {

    let _id = req.params._id;
    let data = req.body;
    todoModel.findByIdAndUpdate(_id, data).exec((err) => {
        if (err) {
            res.json({
                success: false,
            })
        } else {
            res.json({
                success: true,
                message: 'Updated data successfully'

            })
        }
    })

}

const deletingSingleTodo = (req, res) => {
    let _id = req.params._id;
    todoModel.findByIdAndDelete(_id).exec((err) => {
        if (err) {
            res.json({
                success: false,
            })
        } else {
            res.json({
                success: true,
                message: 'Deleted data successfully'
            })
        }
    })

}

module.exports = {
    addingTodo:addingTodo,
    viewingAllTodos:viewingAllTodos,
    viewingSingleTodo:viewingSingleTodo,
    updatingTodo:updatingTodo,
    deletingSingleTodo:deletingSingleTodo,
}