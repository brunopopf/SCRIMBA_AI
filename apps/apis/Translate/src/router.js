import { Router } from 'express';
import { translate } from './translate.js';

const translateRouter = Router();

translateRouter.post("/", translate);

export { translateRouter };