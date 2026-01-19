

import express from "express";
import usersRouter from "./routes/users.routes.js";
import todosRouter from "./routes/todos.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.use("/users", usersRouter);
app.use("/todos", todosRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
