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

app.get('/', (req: Request, res: Response) => {
    return res.status(200).render('index');
});

app.use(routes);

app.get('*', (req: Request, res: Response) => {
    return res.status(400).render('pages/Error/index');
});

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/md-blog', {
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
