import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

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
        slug: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

ArticleSchema.pre<IArticles>('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }

    next();
});

const Articles = mongoose.model<IArticles>('Articles', ArticleSchema);

export default Articles;
