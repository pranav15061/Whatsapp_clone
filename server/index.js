import express from 'express';
import Connection from "./database/db.js";
import Route from './routes/routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

const PORT=8000;

Connection();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/',Route);

app.listen(PORT,()=>{
    console.log(`listening to the PORT: ${PORT} `);
});
