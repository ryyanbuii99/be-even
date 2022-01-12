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
  updateQuote,
} from '../services/db_service';

export class Controller {
  async register(req: any, res: any) {
    try {
      const username: string = req.body.username;
      const password: string = req.body.password;

      if (password.length < 8) {
        res.status(403).json({ message: 'Password must be longer than 8' });
      } else {
        const response = await createUser(username, password, res);
        if (!response) {
          res.status(403).json({ message: 'user aldreay exists' });
        } else {
          res.status(200).json({ message: 'registration successful' });
        }
      }
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
        res.status(200).json({ message: 'login successful', user });
      } else {
        res.status(403).json({ message: 'invalid credentials' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
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
    } catch (error: any) {
      res.status(400).json({ message: error.message });
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
      res
        .status(200)
        .json({ message: 'all quotes are fetched', allQuotesData });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async rateQuote(req: any, res: any) {
    try {
      const quoteID: string = req.body.quoteID;
      const rating: number = req.body.rating;
      const userID: string = req.body.userID;
      await rateQuote(rating, quoteID, userID);
      res.status(200).json({ message: 'Rated quote success' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async getTop5VotedQuotes(req: any, res: any) {
    try {
      const top5VotedQuotes = await getTopVotedQuotes();
      res
        .status(200)
        .json({ message: 'Got top 5 voted quotes', top5VotedQuotes });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async deleteQuote(req: any, res: any) {
    try {
      const quoteID = req.body.quoteID;
      const userID = req.params.id;
      await deleteQuote(quoteID, userID);
      res.status(200).json({ message: 'Delete successful' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  async updateQuote(req: any, res: any) {
    try {
      const userID = req.params.id;
      const quote = req.body.quote;
      const quoteID = req.body.quoteID;
      await updateQuote(quote, userID, quoteID);
      res.status(200).json({ message: 'upadte successful' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
