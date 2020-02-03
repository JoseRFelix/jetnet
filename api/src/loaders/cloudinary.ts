import * as c from 'cloudinary';
import config from '../config';

const cloudinary = c.v2;

cloudinary.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

export default cloudinary;
