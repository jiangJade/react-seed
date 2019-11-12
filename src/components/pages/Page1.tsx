import * as React from 'react'
import './index.scss';
import UseHooksGetData from '../common/useHooksGetData/UseHooksGetData';

const Page1 = () => (
  <div className="about">
    <p className="title">关于我</p>
    <p> 两年全职前端开发经验,一年React开发经验</p>
    <p> 熟悉函数式编程,深谙自动化,组件化开发之道</p>
    <UseHooksGetData />
  </div>
)

export default Page1;