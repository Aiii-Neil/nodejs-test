import { App, cert, initializeApp } from 'firebase-admin/app';
import { getSecret } from '../gcp/get-secret';

let twFirebaseApp: App;
let certification = '';

/*
  @description This function is used to get the firebase service account for Taiwan.
  @example
    const twServiceAccount = await getTwServiceAccount();
    const twStorage = getStorage(twServiceAccount); // getStorage is from firebase-admin/storage
 */
export const getTwServiceAccount = async () => {
  if (!certification) {
    if (!process.env.TW_FIREBASE_CERTIFICATE_PATH) {
      throw new Error('TW_FIREBASE_CERTIFICATE_PATH is not defined.');
    }
    const secret = await getSecret(process.env.TW_FIREBASE_CERTIFICATE_PATH);
    certification = JSON.parse(secret);
  }

  if (!twFirebaseApp) {
    twFirebaseApp = initializeApp(
      {
        credential: cert(certification)
      },
      'twServiceAccount'
    );
  }
  return twFirebaseApp;
};
