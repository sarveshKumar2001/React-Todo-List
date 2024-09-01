import express from "express";
import pg from "pg";
import cors from "cors";

const app  = express();
const port = 3001;

//DATABASES
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "TodoList",
    password: "",
    port: 5432,
    });
db.connect();

//MIDDLEWARE
app.use(cors())
app.use(express.json())

//ROUTES

app.post("/add", async (req, res) => {
    const task = req.body.task;
    try {
      await db.query("INSERT INTO todolist (tasks) VALUES ($1) RETURNING *", [task]);
    } catch (err) {
      console.log(err);
  }
});


app.get("/get", async (req,res) => {
try {
    const todos = await db.query("SELECT * FROM todolist  ORDER BY todo_id DESC");
    res.json(todos.rows);
  }catch (error) {
   console.log(error)
   res.status(500).send("Server Error");
  } 
}) 

app.put("/update/:id", async(req, res) => {
  const id = req.params.id;
  const task = req.body.task;
 
  try {
    const todos = await db.query("UPDATE todolist SET tasks = ($1) WHERE todo_id = ($2)", [task, id])
    res.json(todos.rows);

  } catch (error) {
    console.error('Error updating record:', error);
    res.status(500).json({ message: "Server error" });
  }
})

app.delete("/delete/:id", async(req, res) => {
  try {
    const id = req.params.id;
    await db.query("DELETE FROM todolist Where todo_id = ($1)", [id])
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
})

app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`);
})