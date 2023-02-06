import React, { Component, Suspense, useState } from "react";
import "./css/index.css";
import MarkdownToHtml from "./pages/MarkdownToHtml/index";
import jsobj from "./img/jsobj.jpg";

const App = () => {
  const [title, setTitle] = useState("深圳今天下雨了");
  const [showDymic, setShowDymic] = useState(false);

  if (module.hot) {
    module.hot.accept(["./js/foo.js", "./js/utils.js"]);
  }
  const OtherComponent = React.lazy(() =>
    import(
      /* webpackChunkName: 'utils' */
      /* webpackPrefetch: true */
      "./js/utils"
    )
  );

  const dymicModule = () => {
    import(
      /*webpackChunkName: 'foo'*/
      /* webpackPrefetch: true */
      "./js/foo"
    ).then(({ default: el }) => {
      return el;
    });
  };

  return (
    <>
      <div>
        <h2 className="title">{title}</h2>
        <input name="hmr" type="text" />
        <button onClick={dymicModule}>动态加载模块</button>
        <Suspense fallback={<div>Loading...</div>}>
          <button onClick={() => setShowDymic(true)}>动态加载组件</button>
          {showDymic && <OtherComponent />}
        </Suspense>
        <MarkdownToHtml />
      </div>
      <picture>
        <source srcSet={jsobj} media="(min-width: 800px)" />
        <img src={jsobj} alt="404" />
      </picture>
    </>
  );
};

export default App;
