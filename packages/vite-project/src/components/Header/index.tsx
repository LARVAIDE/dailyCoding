import { useEffect } from 'react';
import { devDependencies } from '../../../package.json';
import logoSrc from '@assets/imgs/bkg.jpg';
import './index.module.scss';

import Worker from './example.js?worker';
// 1. 初始化 Worker 实例
const worker = new Worker();
// 2. 主线程监听 worker 的信息
worker.addEventListener('message', (e) => {
  console.log(e);
});

export function Header() {
  useEffect(() => {
    const img = document.getElementById('logo') as HTMLImageElement;
    img.src = logoSrc;
  }, []);
  return (
    <div className="p-20px text-center header">
      <h1 className="font-bold text-2xl mb-2">
        vite version: {devDependencies.vite}
      </h1>
      <button
        bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
        text="sm white"
        font="mono light"
        p="y-2 x-4"
        border="2 rounded blue-200"
      >
        Button
      </button>

      <img id="logo" className="m-auto mb-4" alt="" />
    </div>
  );
}
