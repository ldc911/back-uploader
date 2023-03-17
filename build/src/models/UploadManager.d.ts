import mongoose from "mongoose";
declare const Upload: mongoose.Model<{
    label: {
        count?: number;
        title?: string;
        confidence?: number;
    }[];
    path?: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    label: {
        count?: number;
        title?: string;
        confidence?: number;
    }[];
    path?: string;
}> & Omit<{
    label: {
        count?: number;
        title?: string;
        confidence?: number;
    }[];
    path?: string;
} & {
    _id: mongoose.Types.ObjectId;
}, never>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    label: {
        count?: number;
        title?: string;
        confidence?: number;
    }[];
    path?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    label: {
        count?: number;
        title?: string;
        confidence?: number;
    }[];
    path?: string;
}>> & Omit<mongoose.FlatRecord<{
    label: {
        count?: number;
        title?: string;
        confidence?: number;
    }[];
    path?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>>;
export default Upload;
