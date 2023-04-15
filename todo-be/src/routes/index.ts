import { Express } from 'express';
import userRouter from './user.route';
export default (app: Express) => {
  app.use('/api/users', userRouter);
};
