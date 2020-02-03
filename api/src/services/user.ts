import { Service, Inject } from 'typedi';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import cloudinary from '../loaders/cloudinary';
import argon2 from 'argon2';

@Service()
export default class UserService {
  constructor(@Inject('userModel') private userModel: Models.UserModel, @Inject('logger') private logger) {}

  public async EditProfile(email: string, userInputDTO: IUserInputDTO): Promise<{ user: IUser }> {
    try {
      let userRecord = await this.userModel.findOne({ email: email });

      if (!userRecord) {
        throw new Error('User cannot be found');
      }

      if (userInputDTO.picture) {
        const result: Express.CloudinaryResult = await cloudinary.uploader.upload(userInputDTO.picture, {
          width: 500,
          height: 500,
          crop: 'pad',
        });

        if (!result) throw new Error("Couldn't upload image to Cloudinary");

        userInputDTO.picture = result.secure_url;
      }

      if (userInputDTO.password) {
        this.logger.silly('Hashing password');
        const hashedPassword = await argon2.hash(userInputDTO.password, { salt: userRecord.salt as any });
        userInputDTO.password = hashedPassword;
      } else {
        Reflect.deleteProperty(userInputDTO, 'password');
      }

      userRecord = await this.userModel.findOneAndUpdate({ email: email }, { $set: userInputDTO }, { new: true });

      if (!userRecord) {
        throw new Error('User cannot be updated');
      }

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
