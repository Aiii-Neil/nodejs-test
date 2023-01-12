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

export const getLineUserInfo = async (req: any): Promise<any> => {
  const usFirestore = await getUsFirestore();
  const doc = await usFirestore
    .collection('lineUsers')
    .where('userId', '==', req.body.userId)
    .get();

  const data = {
    name: doc.docs[0].data().displayName,
    phone: doc.docs[0].data().members.linePhone
  };

  return data;
};

export const getCountyArray = async (): Promise<any> => {
  const countyArray = [
    { county: '台北市', value: '0' },
    { county: '基隆市', value: '1' },
    { county: '新北市', value: '2' },
    { county: '宜蘭縣', value: '3' },
    { county: '新竹縣市', value: '4' },
    { county: '桃園縣', value: '5' },
    { county: '苗栗縣', value: '6' },
    { county: '台中市', value: '7' },
    { county: '彰化縣', value: '8' },
    { county: '南投縣', value: '9' },
    { county: '嘉義縣', value: '10' },
    { county: '雲林縣', value: '11' },
    { county: '台南市', value: '12' },
    { county: '高雄市', value: '13' },
    { county: '澎湖縣', value: '14' },
    { county: '屏東縣', value: '15' },
    { county: '台東縣', value: '16' },
    { county: '花蓮縣', value: '17' },
    { county: '金門縣', value: '18' },
    { county: '花蓮縣', value: '19' },
    { county: '澎湖縣', value: '20' },
    { county: '連江縣', value: '21' },
    { county: '南海諸島', value: '22' },
    { county: '釣魚台列嶼', value: '23' }
  ];

  return countyArray;
};
