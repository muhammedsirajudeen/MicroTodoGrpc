"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
async function AddTodo(Todo) {
    try {
        console.log(Todo);
        const query = `
            INSERT INTO todo (status, priority, task)
            VALUES ($1, $2, $3)
            RETURNING *;
          `;
        const result = await db_1.default.query(query, [Todo.status, Todo.priority, Todo.task]);
        if (result.rows.length !== 0) {
            return result.rows[0];
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
async function UpdateTodo(id, Todo) {
    try {
        const query = `
        UPDATE todo
        SET status = $1, priority = $2, task = $3, date = $4
        WHERE id = $5
        RETURNING *; 
      `;
        const res = await db_1.default.query(query, [Todo.status, Todo.priority, Todo.task, Todo.date ?? new Date().toDateString(), id]);
        if (res.rows.length !== 0) {
            return res.rows[0];
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
async function DeleteTodo(id) {
    try {
        const query = `
        DELETE FROM todo
        WHERE id = $1
        RETURNING *;
      `;
        const result = await db_1.default.query(query, [id]);
        console.log(result.rows);
        if (result.rows.length !== 0) {
            return result.rows[0];
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
async function GetTodoById(id) {
    try {
        const query = `
        SELECT * FROM todo WHERE id = $1;
            `;
        const result = await db_1.default.query(query, [id]);
        if (result.rows.length !== 0) {
            return result.rows[0];
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
}
async function AllTodos() {
    try {
        const query = `
            SELECT * FROM todo;
        `;
        const result = await db_1.default.query(query);
        console.log(result.rows);
        if (result.rows.length !== 0) {
            return result.rows;
        }
        else {
            return [];
        }
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
exports.default = {
    AddTodo,
    UpdateTodo,
    DeleteTodo,
    GetTodoById,
    AllTodos
};
