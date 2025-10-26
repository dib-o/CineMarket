import mongoose, { Schema, Model, Document } from "mongoose";

interface MovieData extends Document {
  id: number;
  name: string;
  type: string;
  ratings: number;
  overview: string;
  poster: string;
  backdrop: string;
  date: string;
  genreIds: any[];
}

const dataSchema = new Schema<MovieData>(
  {
    id: { type: Number },
    name: { type: String },
    type: { type: String },
    ratings: { type: Number },
    overview: { type: String },
    poster: { type: String },
    backdrop: { type: String },
    date: { type: String },
    genreIds: [{ type: Schema.Types.Mixed }],
  },
  { timestamps: true }
);

export function getUserModel(userId: string, username: string): Model<MovieData> {
  const collectionName = `${userId}-${username}-movies`;
  return (
    mongoose.models[collectionName] ||
    mongoose.model<MovieData>(collectionName, dataSchema, collectionName)
  );
}
