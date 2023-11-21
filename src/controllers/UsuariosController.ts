import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import emailSender from '../libs/emailSender';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();

config();
class UsuariosController {
  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const userExists = await prisma.usuario.findUnique({
        where: {
          email: email,
        },
      });
      if (!userExists) return res.status(500).json({ error: 'Email not found.' });
      const jwtSecret = process.env.JWT_SECRET;
      const secret = jwtSecret + userExists.senha;
      const payload = {
        name: userExists.nome,
        email: userExists.email,
      };
      const token = jwt.sign(payload, secret, { expiresIn: '2h' });
      const link = `https://jdg-site-vet.onrender.com/resetpassword/${userExists.id}/${token}`;
      const send = await emailSender(email, link);
      if (send) {
        res.status(200).json({ msg: 'Message sent successfully.' });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: 'Error sending message.' });
    }
  }

  async resetPassword(req: Request, res: Response) {
    const { id, token } = req.params;
    const userExists = await prisma.usuario.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!userExists) {
      res.status(404).json({ msg: 'Invalid ID.' });
    }
    const jwtSecret = process.env.JWT_SECRET;
    const secret = jwtSecret + userExists.senha;

    try {
      const payload = jwt.verify(token, secret);
      res.render('recoverPassword.ejs', { payload });
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  }

  async changePassword(req: Request, res: Response) {
    const { id, token } = req.params;
    const { password, password2 } = req.body;

    const userExists = await prisma.usuario.findById(id);
    if (!userExists) {
      res.status(404).json({ msg: 'Invalid ID.' });
    }
    if (password !== password2) {
      return res.status(400).json({ msg: 'The passwords are not the same.' });
    }
    const jwtSecret = process.env.JWT_SECRET;
    const secret = jwtSecret + userExists.password;
    try {
      jwt.verify(token, secret);
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await prisma.usuario.updatePassword(userExists.id, hashedPassword);
      console.log(result);
      res.redirect('https://hospital-veteririo-front-end-gray.vercel.app/login');
    } catch (error) {
      res.status(401).json({ msg: error.message });
    }
  }
}

export default new UsuariosController();
