import admin from 'firebase-admin';

export const firestore = admin.firestore();
export const { Timestamp, FieldValue } = admin.firestore;

export const getUserList = async (): Promise<any> => {
  const doc = await firestore
    .collection('lineUsers')
    .doc('Ua2ce0d48e4f8b4cbd1367bfce896ddef')
    .get();

  return doc;
};
