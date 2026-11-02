import express, { Router } from 'express';
import { translate } from './translate';

const translateRouter = Router();

translateRouter.get("/", translate);

export { translateRouter };