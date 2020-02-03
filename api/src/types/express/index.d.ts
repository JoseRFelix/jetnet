import { Document, Model } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }

    export interface CloudinaryResult {
      public_id: string;
      version: number;
      signature: string;
      width: number;
      height: number;
      format: string;
      resource_type: string;
      url: string;
      secure_url: string;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
  }
}
