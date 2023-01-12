import type { Request, Response } from 'express';
import { AiiiError } from '../@types/aiii-error';
import { getCountyArray } from '../methods/demo';

export const getCountyList = async (req: Request, resp: Response) => {
  try {
    const result = await getCountyArray();

    resp.status(200).json({
      status: 200,
      message: result
    });
  } catch (err: any) {
    console.error(err);
    throw new AiiiError(422, err?.message);
  }
};
