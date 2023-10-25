import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';


const secretKey = 'P9[V2XvJB567'; // Substitua por sua chave secreta
const prisma = new PrismaClient();

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  if (!token) {
    return res.sendStatus(401); // Sem token, acesso não autorizado
  }

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403); // Token inválido
    }
    req = user; // Armazena as informações do usuário no objeto de requisição
    next(); // Continue com a próxima função de middleware
  });
}







export { authenticateToken };
