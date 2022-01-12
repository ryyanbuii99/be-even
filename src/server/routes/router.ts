import express from 'express';
import { Controller } from '../controllers/controller';

export const router = express.Router();
const controller = new Controller();

router.post('/register', controller.register);
router.post('/login', controller.authenticate);
router.post('/createQuote', controller.createQuote);
router.post('/rateQuote', controller.rateQuote);
router.get('/getAllQuotes/:id', controller.getAllQuotes);
router.get('/getAllUserQuotes/:id', controller.getAllUserQuotes);
router.get('/getTop5', controller.getTop5VotedQuotes);
router.delete('/deleteQuote/:id', controller.deleteQuote);
router.put('/updateQuote/:id', controller.updateQuote);
