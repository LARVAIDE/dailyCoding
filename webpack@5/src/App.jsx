import React, { Component, Suspense, useState } from "react";
import './css/index.css';
import "./js/foo";
import MarkdownToHtml from "./pages/MarkdownToHtml/index";
import jsobj from './img/jsobj.jpg'

const App = () => {
    const [title, setTitle] = useState('深圳今天下雨了')
    const [showDymic, setShowDymic] = useState(false) 

    if(module.hot){
        module.hot.accept(['./js/foo.js', './js/utils.js'])
    }
    const OtherComponent = React.lazy(() => import(
        /* webpackChunkName: 'utils' */
        /* webpackPrefetch: true */
        './js/utils'));

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <h2 className="title">{title}</h2>
                <input name='hmr' type="text" />
                <button onClick={() => setShowDymic(true)}>动态加载</button>
                { showDymic &&  <OtherComponent /> }
                <MarkdownToHtml />
            </div>
            <picture>
                <source srcSet={jsobj} media="(min-width: 800px)" />
                <img src={jsobj} alt="404" />
            </picture>
        </Suspense>
    )
}

export default App;