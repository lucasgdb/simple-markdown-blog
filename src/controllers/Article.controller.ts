import { Request, Response } from 'express';

import Articles from '../models/Article';

export default {
    async index(req: Request, res: Response) {
        const articles = await Articles.find();

        return res.status(200).render('pages/Articles/index', { articles });
    },

    async show(req: Request, res: Response) {
        const { slug } = req.params;

        const article = await Articles.findOne({ slug });

        if (article) {
            return res
                .status(200)
                .render('pages/Articles/article', { article });
        } else {
            return res.status(400).render('pages/Error/index');
        }
    },

    async new(req: Request, res: Response) {
        return res.status(200).render('pages/Articles/new');
    },

    async create(req: Request, res: Response) {
        const { title, description, slug } = req.body;

        const created = await Articles.create({ title, description, slug });

        if (created) {
            res.redirect(`/pages/articles/${created.slug}`);
        } else {
            res.redirect('/pages/articles/new');
        }
    },

    async update(req: Request, res: Response) {
        return res.status(200).json({});
    },

    async destroy(req: Request, res: Response) {
        const { _id } = req.params;

        await Articles.findByIdAndDelete(_id);

        return res.status(200).redirect('/articles');
    },
};
