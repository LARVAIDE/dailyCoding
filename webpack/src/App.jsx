import React, { useState } from "react";

const App = () => { 
    const [title, setTitle] = useState('深圳今天下雨了')
    const foo = (a,b) => { 
        return a+b
    }
    console.log(foo(1, 2))
    const obj = {
        say() { 
            return '一个方法'
        }
    }

    return (
        <div>
            <h2>{ title }</h2>
        </div>
    )
}

export default App;