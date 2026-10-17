import type { Request, Response } from "express";
import { todoValidationSchema, type Todo} from "../../validation/todo.schema.js";

class TodoController {

    // inmemory DB
    private _db : Todo [];

    constructor (){
        this._db = [];
    }

    public handleGetAllTodos (req: Request, res: Response) {
        const todos = this._db;
        return res.status(200).json({todos});
    }

    public handleGetTodoById (req: Request, res: Response) {
        const getTodo = this._db.find(({id}) => id === req.params.id);

        if(!getTodo) {
            return res.status(404).json({error: 'Todo Not Found'});
        }

        return res.status(200).json({getTodo});
    }

    public handleInsertTodo (req: Request, res: Response) {
        const validateTodo = todoValidationSchema.safeParse(req.body);

        if(!validateTodo.success) {
            return res.status(400).json({error: 'Validation Failed'});
        }

        this._db.push(validateTodo.data);
        return res.status(201).json({Todo: validateTodo.data});
    }

    public handleUpdateTodo (req: Request, res: Response) {
        const validateTodo = todoValidationSchema.safeParse({
            ...req.body,
            id: req.params.id,
        });

        if (!validateTodo.success) return res.status(400).json({error: 'Validation Failed'});

        const todoIndex = this._db.findIndex(({id}) => id === req.params.id);

        if (todoIndex === -1){
            return res.status(400).json({error: 'Todo Absent'});
        }

        this._db[todoIndex] = validateTodo.data;
        return res.status(201).json({todo: validateTodo.data});
    }

    public handleDeleteTodo (req: Request, res: Response) {
        const todoIndex = this._db.findIndex(({id}) => id === req.params.id);

        if (todoIndex === -1) return res.status(400).json({error: "Todo not found"});

        this._db.splice(todoIndex, 1);
        return res.status(204).send();
    }
}

export default TodoController;
