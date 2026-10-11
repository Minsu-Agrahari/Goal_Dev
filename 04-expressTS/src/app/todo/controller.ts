import type { Request, Response } from "express"
import { todoValidationSchema, type Todo } from "../../validation/todo.schema.js";

class TodoController {
    private _db: Todo [];

    constructor() {
        this._db = []
    }

    public handleGetAllTodos(req: Request, res: Response) {
        const todo = this._db;
        return res.json({todo});
    }

    public handleGetTodoById(req: Request, res: Response) {
        const todo = this._db.find(({ id }) => id === req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        return res.json({ todo });
    }

    public handleInsertTodo(req: Request, res: Response) {
        const validationResult = todoValidationSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ error: "Validation Failed" });
        }

        this._db.push(validationResult.data);
        return res.status(201).json({ todo: validationResult.data });
    }

    public handleUpdateTodo(req: Request, res: Response) {
        const validationResult = todoValidationSchema.safeParse({
            ...req.body,
            id: req.params.id,
        });
        if (!validationResult.success) {
            return res.status(400).json({ error: "Validation Failed" });
        }

        const todoIndex = this._db.findIndex(({ id }) => id === req.params.id);
        if (todoIndex === -1) {
            return res.status(404).json({ error: "Todo not found" });
        }

        this._db[todoIndex] = validationResult.data;
        return res.json({ todo: validationResult.data });
    }

    public handleDeleteTodo(req: Request, res: Response) {
        const todoIndex = this._db.findIndex(({ id }) => id === req.params.id);
        if (todoIndex === -1) {
            return res.status(404).json({ error: "Todo not found" });
        }

        this._db.splice(todoIndex, 1);
        return res.status(204).send();
    }
}

export default TodoController
