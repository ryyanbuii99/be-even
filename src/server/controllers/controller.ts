import { authenticate, createUser, newQuote } from '../services/db_service';

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
      const quote: string = req.body.quote
      const userID: string = req.body.userID

      if (quote.length <= 0) {
        res.status(403).json({ message: 'invalid credentials' });
      } else {
        await newQuote(quote, userID)
        res.status(200).json({ message: 'quote is created!' });
      }
    } catch (error) {
      
    }
  }
}
