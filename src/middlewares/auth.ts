import { Request, Response, NextFunction } from 'express';
import { AiiiError } from '../@types/aiii-error';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const xApiKey = req.header('x-api-key');
  console.log('headers =>', JSON.stringify(req.headers));
  console.log('body =>', JSON.stringify(req.body));
  const apiKey = process.env.INTERNAL_API_KEY || 'aiii-test';

  if (xApiKey !== apiKey) {
    throw new AiiiError(401, 'Invalid API Key');
  }
  next();
};
