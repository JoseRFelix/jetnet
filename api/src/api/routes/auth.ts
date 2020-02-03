import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth';
import { IUserInputDTO } from '../../interfaces/IUser';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
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
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.SignUp(req.body as IUserInputDTO);
        return res.status(201).json({ user, token });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get<Logger>('logger');
      logger.debug('Calling Sign-In endpoint with body: %o', req.body);
      try {
        const { email, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.SignIn(email, password);
        return res.json({ user, token }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/available',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get<Logger>('logger');
      logger.debug('Calling Availability endpoint with body: %o', req.body);
      try {
        const { email } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const isAvailable = await authServiceInstance.isAvailable(email);
        return res.json({ isAvailable }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
