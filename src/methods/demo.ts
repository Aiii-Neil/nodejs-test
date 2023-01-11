import { getUsFirestore } from '../services/firebase/get-us-firestore';
import { getTwFirestore } from '../services/firebase/get-tw-firestore';

export const demo = async (exportMode: 'all' | 'us' | 'tw') => {
  if (!exportMode) {
    throw new Error('exportMode is required');
  }

  if (!['all', 'us', 'tw'].includes(exportMode)) {
    throw new Error('exportMode must be one of [ all, us, tw ]');
  }

  const usFirestore = await getUsFirestore();
  const usDoc = await usFirestore.doc('/tmp/test').get();
  console.log('usDoc', usDoc.data());

  const twFirestore = await getTwFirestore();
  const twDoc = await twFirestore.doc('/tmp/test').get();
  console.log('twDoc', twDoc.data());

  switch (exportMode) {
    case 'tw':
      return {
        twData: twDoc.data()
      };

    case 'us':
      return {
        usData: usDoc.data()
      };

    case 'all':
    default:
      return {
        usData: usDoc.data(),
        twData: twDoc.data()
      };
  }
};
