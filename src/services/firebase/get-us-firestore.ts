import { getFirestore } from 'firebase-admin/firestore';
import { getUsServiceAccount } from './get-us-service-account';

/*
  @description 取得美國區的 firestore 物件
  @example
    const usFirestore = await getUsFirestore();
    const doc = await usFirestore.doc('foo/doc').get();
*/
export const getUsFirestore = async () => {
  const usServiceAccount = await getUsServiceAccount();
  return getFirestore(usServiceAccount);
};
