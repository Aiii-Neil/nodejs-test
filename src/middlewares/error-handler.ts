import { Request, Response, NextFunction } from 'express';
import { AiiiError } from '../@types/aiii-error';

/**
 * 共用的錯誤處理器，用來接收所有路由拋出來的錯誤並轉化成適當的 Response 給前端
 */
export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  //自訂的錯誤訊息
  if (err instanceof AiiiError) {
    const { statusCode, message } = err as AiiiError;
    res.status(statusCode).send(message);
    return;
  }

  //系統錯誤
  res
    .status(500)
    .send(
      'A system error occurred. Please contact the Aiii engineers to help solve this problem'
    );
};
