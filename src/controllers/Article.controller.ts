import { Request, Response } from 'express';
import slugify from 'slugify';
import marked from 'marked';
import createDOMPurify from 'dompurify';
import { JSDOM, DOMWindow } from 'jsdom';

import Articles from '../models/Article';

const domWindow: DOMWindow = new JSDOM().window;
// @ts-ignore
const domPurify = createDOMPurify(domWindow);

export default {
    async index(req: Request, res: Response) {
        try {
            const articles = await Articles.find();

            return res.status(200).render('pages/Articles/index', { articles });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async show(req: Request, res: Response) {
        try {
            const { slug } = req.params;

            const article = await Articles.findOne({ slug });

            if (article) {
                return res
                    .status(200)
                    .render('pages/Articles/article', { article });
            } else {
                return res.status(400).render('pages/Error/index');
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async new(req: Request, res: Response) {
        return res.status(200).render('pages/Articles/new');
    },

    async edit(req: Request, res: Response) {
        try {
            const { slug } = req.params;

            const article = await Articles.findOne({ slug });

            if (article) {
                return res
                    .status(200)
                    .render('pages/Articles/edit', { article });
            } else {
                return res.status(400).redirect('pages/Articles');
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async create(req: Request, res: Response) {
        try {
            const { title, description, content } = req.body;

            const created = await Articles.create({
                title,
                description,
                content,
                slug: slugify(title, { lower: true, strict: true }),
                sanitizedHTML: domPurify.sanitize(marked(content)),
            });

            if (created) {
                return res.status(200).redirect(`/articles/${created.slug}`);
            } else {
                return res.status(400).redirect('/articles/new');
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async update(req: Request, res: Response) {
        const { _id } = req.params;

        try {
            const { title, description, content } = req.body;

            const article = await Articles.findByIdAndUpdate(
                _id,
                {
                    title,
                    description,
                    content,
                    slug: slugify(title, { lower: true, strict: true }),
                    sanitizedHTML: domPurify.sanitize(marked(content)),
                },
                { new: true }
            );

            if (article) {
                return res.status(200).redirect(`/articles/${article.slug}`);
            } else {
                return res.status(400).redirect(`/articles`);
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    async destroy(req: Request, res: Response) {
        try {
            const { _id } = req.params;

            await Articles.findByIdAndDelete(_id);

            return res.status(200).redirect('/articles');
        } catch (err) {
            return res.status(200).json(err);
        }
    },
};
