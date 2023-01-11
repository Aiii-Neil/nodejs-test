import { getFirestore } from 'firebase-admin/firestore';
import { getTwServiceAccount } from './get-tw-service-account';

/*
  @description 取得台灣區的 firestore 物件
  @example
    const twFirestore = await getTwFirestore();
    const doc = await twFirestore.doc('foo/doc').get();
*/
export const getTwFirestore = async () => {
  const twServiceAccount = await getTwServiceAccount();
  return getFirestore(twServiceAccount);
};
