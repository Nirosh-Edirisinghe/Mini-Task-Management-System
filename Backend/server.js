import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDb from "./config/db.js"
import userRouter from "./routes/AuthRoute.js"
import usersRouter from "./routes/UserRoutes.js"
import taskRouter from "./routes/TaskRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDb();

// api endpoint
app.use('/api/auth',userRouter)
app.use('/api/user',usersRouter)
app.use('/api/task',taskRouter)

app.get('/', (req, res) => {
  res.send("API is running...")
})

app.listen(port, () => console.log("server run on", port))