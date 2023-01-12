import type { Request, Response } from 'express';
import { AiiiError } from '../@types/aiii-error';
import { getLineUserInfo } from '../methods/demo';

/*
  @description 此 function 用於測試 API key 、錯誤處理 及 是否擁有 tw 及 us 的 firestore 物件權限
 */
export const getUserInfo = async (req: Request, resp: Response) => {
  //   console.log('process env => ', JSON.stringify(process.env));
  try {
    // console.log('demo start', req.headers.origin || req.headers.referer);

    console.log(req);

    const result = await getLineUserInfo(req);

    resp.status(200).json({
      status: 200,
      message: result
    });
  } catch (err: any) {
    console.error(err);
    throw new AiiiError(422, err?.message);
  }
};
