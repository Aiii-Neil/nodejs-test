import { App, initializeApp } from 'firebase-admin/app';

let usFirebaseApp: App;

/*
  @description This function is used to get the firebase service account for US.
  @example
    const usServiceAccount = await getUsServiceAccount();
    const usStorage = getStorage(usServiceAccount); // getStorage is from firebase-admin/storage
 */
export const getUsServiceAccount = async () => {
  if (!usFirebaseApp) {
    usFirebaseApp = initializeApp({}, 'usServiceAccount');
  }
  return usFirebaseApp;
};
