import db from "./db"
export interface TodoRequest {
    id?: number
    date?: string
    status: boolean
    priority: string
    task: string
}
async function AddTodo(Todo: TodoRequest) {
    try {

        console.log(Todo)
        const query = `
            INSERT INTO todo (status, priority, task)
            VALUES ($1, $2, $3)
            RETURNING *;
          `;
        const result=await db.query(query, [Todo.status, Todo.priority, Todo.task])
        if(result.rows.length!==0){
            return result.rows[0] as TodoRequest
        }else{
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}
async function UpdateTodo(id: number, Todo: TodoRequest) {
    try {
        const query = `
        UPDATE todo
        SET status = $1, priority = $2, task = $3, date = $4
        WHERE id = $5
        RETURNING *; 
      `;
        const res = await db.query(query, [Todo.status, Todo.priority, Todo.task, Todo.date ?? new Date().toDateString(), id]);
        if (res.rows.length !== 0) {
            return res.rows[0] as TodoRequest
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}
async function DeleteTodo(id: number) {
    try {
        const query = `
        DELETE FROM todo
        WHERE id = $1
        RETURNING *;
      `;
        const result = await db.query(query, [id])
        console.log(result.rows)
        if (result.rows.length !== 0) {
            return result.rows[0] as TodoRequest
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

async function GetTodoById(id: number) {
    try {
        const query =
            `
        SELECT * FROM todo WHERE id = $1;
            `
        const result = await db.query(query, [id])
        if (result.rows.length !== 0) {
            return result.rows[0] as TodoRequest
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

async function AllTodos(){
    try {
        const query=`
            SELECT * FROM todo;
        `
        const result=await db.query(query)
        console.log(result.rows)
        if(result.rows.length!==0){
            return result.rows as TodoRequest[]
        }else{
            return []
        }
    } catch (error) {
        console.log(error)
        return []
    }
}

export default {
    AddTodo,
    UpdateTodo,
    DeleteTodo,
    GetTodoById,
    AllTodos
}