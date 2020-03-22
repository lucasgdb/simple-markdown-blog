import express, { Request, Response } from 'express';

const routes = express.Router();

import Articles from './Articles';

routes.use('/articles', Articles);

export default routes;
