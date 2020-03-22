import { Document } from 'mongoose';

export default interface IArticles extends Document {
    _id: string;
    title: string;
    description: string;
    content: string;
    slug: string;
    sanitizedHTML: string;
    createdAt: Date;
    updatedAt: Date;
}
