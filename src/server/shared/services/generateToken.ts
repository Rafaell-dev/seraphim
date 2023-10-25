import * as jwt from 'jsonwebtoken';

// Sua chave secreta
const secretKey = 'P9[V2XvJB567';

// Dados do usuário a serem incluídos no token (por exemplo, ID do usuário)
const userData = {
  userId: 123,
  username: 'exemplo_usuario',
};

// Opções do token, como a duração da validade (em segundos)
const tokenOptions: jwt.SignOptions = {
  expiresIn: '1min', // O token expira em 1 hora
};

// Gere o token JWT
const token = jwt.sign(userData, secretKey, tokenOptions);

console.log('Token JWT gerado:', token);
