import express, { Request, Response } from 'express';
import Articles from '../../controllers/Article.controller';

const routes = express.Router();

routes.get('/', Articles.index);
routes.get('/new', Articles.new);
routes.get('/:slug/edit', Articles.edit);
routes.get('/:slug', Articles.show);

routes.post('/', Articles.create);
routes.put('/:_id', Articles.update);
routes.delete('/:_id', Articles.destroy);

export default routes;
