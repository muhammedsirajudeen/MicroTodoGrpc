import express, { Request, Response } from 'express';
import router from './route/route';
import cors from "cors"


const app = express();
const PORT = 3000;
app.use(cors())
app.use(express.json());
app.use("/",router)
app.listen(PORT,()=>console.log(`Server started in port ${PORT}`))