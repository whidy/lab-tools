# 跨域共享方案

* server-a：记录页面
* server-b：跳转页面
* server-c：第三方页面

用户User，访问a域名页面，a页面创建cookie，并请求将cookie的内容写入到b域名网站上。

用户User再去访问c域名页面，c页面是有埋点b域名的js脚本的！这个时候应该能看到读取到了b的cookie！

可以本地开三个服务器并编辑本地的host。例如本地ip：127.0.0.1

## 如何运行

nodemon用于自动重启node的工具

```
sudo npm i -g nodemon
```

项目目录下执行安装依赖：

```
yarn install
```

> 你也可以尝试npm install，我还没测试过。

在当前页面`cross-domain-sharing`，开三个终端，分别执行：

```
npm run sa
npm run sb
npm run sc
```

## 说明

三台服务器端口分别为：

* server-a：8080
* server-b：3000
* server-c：8081

对应host可以配置为：

* 127.0.0.1 51la.com
* 127.0.0.1 jump.com
* 127.0.0.1 third.com

1. 然后打开<http://jump.com:8080>点击红框按钮
2. 打开<http://third.com:8081>会弹出cookie！


如果需要修改为例如`www.51la.com:8080`，也要对应调整。目前是个简单的demo，还有一些需要完善。