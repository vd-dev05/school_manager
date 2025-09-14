import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { ConnectDb } from './db/index.js';
import TeacherController from './controller/teachers/index.js';
import TeacherMiddleware from './middleware/teacher.js';
import PositionController from './controller/positions/index.js';
import path from 'path';

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json())
const __dirname = path.resolve();


app.post('/teachers', TeacherMiddleware.create, TeacherController.create)
app.get('/teachers', TeacherController.getAllTeachers)
app.post ('/teacher-positions' ,  PositionController.create)
app.get('/teacher-positions', PositionController.getAll)


if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
}

app.listen(process.env.PORT,() =>{
    ConnectDb.mongoose()
    console.log(`Server is running on port ${process.env.PORT}`)
})