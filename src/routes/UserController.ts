import { Controller, Inject, Middleware, Post, Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { validateUserUpdate } from '../validations/UserUpdateValidation';
import { User } from '../models/User';

@Controller('/users')
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Middleware('auth')
  @Post('/me/update')
  async updateMe(req: Request, res: Response): Promise<void> {
    const { user } = req.user as { user: User };
    const body = req.body as Partial<User>;

    const errors = validateUserUpdate(body);
    if (errors.length > 0) {
      res.status(422).json({ errors });
      return;
    }

    const updatedUser = await this.userService.update(user.id, body);
    res.json(updatedUser);
  }

  @Middleware('auth')
  @Post('/update')
  async update(req: Request, res: Response): Promise<void> {
    const { user } = req.user as { user: User };
    const body = req.body as Partial<User>;

    const errors = validateUserUpdate(body);
    if (errors.length > 0) {
      res.status(422).json({ errors });
      return;
    }

    if (user.id !== body.id) {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }

    const updatedUser = await this.userService.update(body.id, body);
    res.json(updatedUser);
  }
}
