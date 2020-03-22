import mongoose, { Schema } from 'mongoose';

import IArticles from '../helpers/interfaces/IArticles';

const ArticleSchema: Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            required: true,
        },
        sanitizedHTML: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Articles = mongoose.model<IArticles>('Articles', ArticleSchema);

export default Articles;
