import express, { Request, Response } from 'express';

const routes = express.Router();

import Articles from './Articles';

routes.get('/', (req: Request, res: Response) => {
    return res.status(200).render('index');
});

routes.use('/articles', Articles);

routes.use('*', (req: Request, res: Response) => {
    return res.status(400).render('pages/Error/index');
});

export default routes;
