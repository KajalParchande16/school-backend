import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/db.js';
import morgan from 'morgan';
import cors from 'cors';
import contactRoute from './routes/contact.js';
import authRoute from './routes/auth.js';
import noticeRoute from './routes/notice.js'
import gallaryRoute from './routes/gallary.js';
import eventRouter from './routes/event.js';
import teacherRouter from './routes/teacher.js';
import { swaggerUi, specs } from './config/swagger.js';

dotenv.config({ path: './config/config.env' });
const app = express();
dbConnection();
const port = process.env.PORT || 4400;;
// console.log(port);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Welcome")
});
app.use("/api/contact", contactRoute);
app.use("/api/auth/", authRoute);
app.use("/api/notice/", noticeRoute);
app.use("/api/gallary/", gallaryRoute);
app.use("/api/event/", eventRouter);
app.use("/api/teacher/", teacherRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.listen(port, () => console.log(`Server is running on port ${port}`));