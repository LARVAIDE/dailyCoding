import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './index.css';
import MyEditor from './pages/draftTest/index.jsx';
import Floor from './pages/floor/index.tsx';
import Tree from './pages/Tree/index.tsx';
import reportWebVitals from './reportWebVitals';

ReactDOM.render( 
  <BrowserRouter>
    <Routes>
      <Route path="/aaa" element={<MyEditor></MyEditor>}/>
      <Route path="/bbb" element={<Floor></Floor>}></Route>
      <Route path='/ccc' element={<Tree></Tree>}></Route>
      <Route path="/" element={<div>
        <Link to='/aaa'>aaa</Link>
        <Link to='/bbb'>bbb</Link>
        <Link to='/ccc'>ccc</Link>
      </div>}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
