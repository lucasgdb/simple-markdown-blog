import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { SERVER_PORT } from './configs/default.json';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/v1/data', (req: Request, res: Response) =>
    res.status(200).json({ response: 'hello-world' })
);

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });

        app.listen(SERVER_PORT, () => console.log('connected.'));
    } catch (err) {
        throw err;
    }
}

main();
