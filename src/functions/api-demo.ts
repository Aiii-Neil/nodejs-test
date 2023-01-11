import type { Request, Response } from 'express';
import { AiiiError } from '../@types/aiii-error';
import { demo } from '../methods/demo';

/*
  @description 此 function 用於測試 API key 、錯誤處理 及 是否擁有 tw 及 us 的 firestore 物件權限
 */
export const apiDemo = async (req: Request, resp: Response) => {
  console.log('process env => ', JSON.stringify(process.env));
  try {
    console.log('demo start', req.headers.origin || req.headers.referer);

    const result = await demo(req.body.mode || 'all');

    resp.status(200).json({
      status: 200,
      message: result
    });
  } catch (err: any) {
    console.error(err);
    throw new AiiiError(422, err?.message);
  }
};
