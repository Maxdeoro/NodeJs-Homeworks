import mongoose from 'mongoose';

const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/todos');

const todoSchema = new Schema ({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

todoSchema.static.addTodo = async function (todoData) {
    try {
        const todo = new Todo(todoData);
        await todo.save();
        return 'Todo item added!';
    } catch(error) {
        throw new Error(error);
    };
};

todoSchema.static.updateTodo = async function(id, todoNewData) {
    try {
        const todo = await this.findById(id);
        if (todo) {
            await todo.update(todoNewData);
            return 'Todo list updated.';
        } else {
            return 'There is not todo';
        }
    } catch(error) {
        throw new Error(error);
    };
};

todoSchema.static.todoToggleCompleted = async function(id) {
    try {
        const todo = await Todo.findById(id);
        if(todo) {
            await todo.update({completed: !todo.completed});
            return `Todo completed set to ${todo.completed}`;
        } else {
            return 'There is not todo';
        }
    } catch (error) {
        throw new Error(error);
    }
};

todoSchema.static.deleteTodo = async function(id) {
    try {
        let message = '';
        const result = await this.remove({_id: id});
        if(result.ok === 1 && result.n === 1) {
            message = 'Todo deleted!';
        } else {
            message = 'There is not todo';
        }
        return message;
    } catch(error) {
        throw new Error(error);
    }
};

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;