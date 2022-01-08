import express from 'express';
import { Controller } from '../controllers/controller';

export const router = express.Router();
const controller = new Controller()

router.post('/register', controller.register)
