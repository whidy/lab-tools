# 跨域共享方案

* server-a：记录页面
* server-b：跳转页面
* server-c：第三方页面

用户User，访问b域名页面，b页面创建cookie，并请求将cookie的内容写入到a域名网站上。

用户User再去访问c域名页面，c页面是有埋点a域名的js脚本的！这个时候应该能看到读取到了a的cookie！

可以本地开三个服务器并编辑本地的host。例如本地ip：127.0.0.1

> 内部说明：用户访问跳转页（jump.com），跳转页服务器分配一个该用户的识别信息，并将识别信息以cookie形式发送给网站统计（51la.com）（iframe进行通信，相当于用户偷偷被访问了网站统计的页面），于是该用户电脑就有了网站统计域名的一段cookie。当用户访问了第三方网站（third.com），并且这个第三方网站有使用网站统计的埋点（51la.com/test.js），此时埋点内的一段代码会进行一系列较为复杂的操作，使得第三方网站能拿到网站统计的cookie，并记录下来发送到网站统计服务器，最后网站统计服务器和跳转页服务器进行数据匹配，就拿到用户的相关访问记录了。

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

1. 然后打开<http://jump.com:3000>点击红框按钮，生成想要记录的唯一id的关联到到User的cookie
2. 打开<http://third.com:8081>会显示b站已有的cookie


如果需要修改为例如`www.51la.com:8080`，也要对应调整。目前是个简单的demo，还有一些需要完善。