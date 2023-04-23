# 学习CDP协议

## 安装工具

### [chrome-devtools-frontend](https://www.npmjs.com/package/chrome-devtools-frontend)

```shell
   npm i chrome-devtools-frontend
```

## 使用

### 创建一个 websocket 服务

```js
    // code
    const ws = require('ws');

    const wss = new ws.Server({ port: 8080 });

    wss.on('connection', function connection(ws) {
        ws.on('message', function message(data) {
            console.log('received: %s', data);  
        });
    });
```

### 启动 chrome-devtools-frontend

```json
    cd node_modules/chrome-devtools-frontend 
    npx http-server .
```

然后就能在控制台看到CDP数据了
