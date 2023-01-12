import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { auth } from './middlewares/auth';
import 'express-async-errors'; // 讓非同步API也可以抓到throw的錯誤
import { errorHandler } from './middlewares/error-handler';
import { apiDemo } from './functions/api-demo';
import { getUserInfo } from './functions/getUserInfo';
import { getCountyList } from './functions/getCountyList';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(helmet());

app.get('/', (__, res) => {
  res.send('OK');
});

const router = express.Router();
app.use('/nodejs-practice', router);

router.get('/', (__, res) => {
  res.send('OK');
});

//以下接口會開始對API KEY進行檢查，以下此行請針對各自專案的需求，自行修改router與擺放位置
app.use(auth);

//!!!!!!取用此template，請將demo相關內容移除!!!!!!!!
router.post('/demo', apiDemo);

router.post('/getUserInfo', getUserInfo);

router.get('/getCountyList', getCountyList);

//錯誤處理器，需擺在所有方法最後面
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('🚀 Server ready on port', port);
});
