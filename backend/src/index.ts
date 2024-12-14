import express, { Request, Response } from 'express';
import router from './route/route';



const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/",router)
app.listen(PORT,()=>console.log(`Server started in port ${PORT}`))