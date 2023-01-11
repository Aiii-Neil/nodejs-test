/*
 @description 將整份從 firestore 取出的 document 中所有的 timestamp 物件轉換成 Date 物件
 @example
  const doc = await firestore.doc('foo/doc').get();
  const docData = doc.data();
  console.log(docData); // { createdAt: Timestamp { seconds: 1620000000, nanoseconds: 0 } }
  firestoreDeepTimestampConversion(docData);
  console.log(docData); // { createdAt: Date }
 */
export const firestoreDeepTimestampConversion = (object: any) => {
  if (object !== null && typeof object === 'object') {
    Object.keys(object).forEach((item) => {
      if (typeof object[item]?.toDate === 'function') {
        object[item] = object[item].toDate();
      }
      if (typeof object[item] === 'object') {
        firestoreDeepTimestampConversion(object[item]);
      }
    });
  }
};
