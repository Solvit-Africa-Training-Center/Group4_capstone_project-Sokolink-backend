
import { Router } from 'express';
import { userRouter } from './userRoutes';
import { profileRouter } from "./profileRoutes";

const routers = Router();
const allRoutes = [userRouter, profileRouter];
// routers.use('/api', ...allRoutes);
routers.use("/", profileRouter);
routers.use("/", userRouter);

export { routers };
