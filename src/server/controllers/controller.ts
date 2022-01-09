import { authenticate, createUser } from '../services/db_service';

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

      if (username && password) {
        await authenticate(username, password);
        res.status(200).json({ message: 'login successful' });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
