import {
  authenticate,
  checkIfUserExists,
  createUser,
  deleteQuote,
  getAllQuotes,
  getAllUserQuotes,
  getTopVotedQuotes,
  newQuote,
  rateQuote,
} from '../services/db_service';

export class Controller {
  async register(req: any, res: any) {
    try {
      const username: string = req.body.username;
      const password: string = req.body.password;

      await createUser(username, password);
      res.status(200).json({ message: 'registration successful' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async authenticate(req: any, res: any) {
    try {
      const username: string = req.body.username;
      const password: string = req.body.password;

      const user = await authenticate(username, password, res);
      if (user) {
        req.session.signedIn = true;
        req.session.username = username;
        console.log('login successful');
        res.status(200).json({ message: 'login successful', user });
      } else {
        res.status(403).json({ message: 'invalid credentials' });
      }
    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  }

  async createQuote(req: any, res: any) {
    try {
      const quote: string = req.body.quote;
      const userID: string = req.body.userID;

      if (quote.length <= 0) {
        res.status(403).json({ message: 'Cannot leave quote field empty' });
      } else {
        await newQuote(quote, userID);
        res.status(200).json({ message: 'quote is created!' });
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllUserQuotes(req: any, res: any) {
    try {
      const userID: string = req.params.id;
      let doesUserExist = await checkIfUserExists(userID);
      let userQuoteData = await getAllUserQuotes(userID, res);

      if (!doesUserExist) {
        res.status(400).json({ message: 'user does not exist' });
      } else {
        res
          .status(200)
          .json({ message: 'fetched all user quotes', userQuoteData });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async getAllQuotes(req: any, res: any) {
    try {
      const userID: string = req.params.id;
      const allQuotesData = await getAllQuotes(userID, res);
      res.status(200).json({ message: 'all quotes are fetched', allQuotesData });
    } catch (error) {
      throw error;
    }
  }

  async rateQuote(req: any, res: any) {
    try {
      const quoteID: string = req.body.quoteID
      const rating: number = req.body.rating
      const userID: string = req.body.userID;
      await rateQuote(rating, quoteID, userID);
      res.status(200).json({ message: 'Rated quote success' });
    } catch (error) {
      throw error;
    }
  }

  async getTop5VotedQuotes(req: any, res: any) {
    try {
      const top5VotedQuotes = await getTopVotedQuotes();
      res.status(200).json({ message: 'Got top 5 voted quotes', top5VotedQuotes });
    } catch (error) {
      throw error;
    }
  }

  async deleteQuote(req: any, res: any) {
    try {
      const quoteID = req.params.id
      await deleteQuote(quoteID);
      res.status(200).json({ message: 'Delete successful' });
    } catch (error) {
      throw error;
    }
  }
}
