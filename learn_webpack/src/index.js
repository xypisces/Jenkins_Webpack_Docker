import './css/index.css';
import './css/login.scss';
import * as _ from 'lodash';
import { a } from './login';

const add = () => {
  a();
  const b = _.assign({ c:1 })
  console.log(b)
  console.log('hello,world')
  console.log('===========')
}

add();

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
  // 实现热更新
  module.hot.accept();
}