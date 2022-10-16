const express = require('express');
const router = express.Router();
const todoctrl = require('../controllers/todo-ctrl');

router.post('/todo',todoctrl.addingTodo );
router.get('/todos', todoctrl.viewingAllTodos);
router.get('/todo/:_id', todoctrl.viewingSingleTodo);
router.put('/todo/:_id', todoctrl.updatingTodo);
router.delete('/todo/:_id', todoctrl.deletingSingleTodo);

module.exports = router;
