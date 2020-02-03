import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import { Container } from 'typedi';
import UserService from '../../services/user';
import { IUserInputDTO } from '../../interfaces/IUser';
const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });

  route.post(
    '/profile/edit',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        fullName: Joi.string().required(),
        password: Joi.string().allow(''),
        birthday: Joi.date().required(),
        phone: Joi.string().required(),
        picture: Joi.string().allow(null),
        securityQuestions: Joi.array()
          .items(
            Joi.object().keys({
              question: Joi.string().required(),
              answer: Joi.string().required(),
            }),
          )
          .required(),
        address: Joi.object().keys({
          street: Joi.string().required(),
          city: Joi.string().required(),
          zip: Joi.string().required(),
          state: Joi.string().required(),
          country: Joi.string().required(),
        }),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get<Logger>('logger');
      logger.debug('Calling Profile-Edit endpoint with body: %o', req.body);
      try {
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.EditProfile(req.currentUser.email, req.body as IUserInputDTO);
        return res.status(201).json({ user });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
