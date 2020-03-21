import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import methodOverride from 'method-override';

import routes from './routes';
import { SERVER_PORT } from './configs/default.json';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));
app.use(methodOverride('_method'));
app.use(routes);

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mini-blog', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });

        app.listen(SERVER_PORT, () =>
            // tslint:disable-next-line: no-console
            console.log('the server has been started.')
        );
    } catch (err) {
        throw err;
    }
}

main();
