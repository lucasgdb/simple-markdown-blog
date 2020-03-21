import { Document } from 'mongoose';

export default interface IArticles extends Document {
    _id: string;
    title: string;
    description: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}
