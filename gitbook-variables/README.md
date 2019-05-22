# 介绍

> 首先你需要安装[gitbook-cli](https://github.com/GitbookIO/gitbook/blob/master/docs/setup.md)，然后才能进行以下测试。

这是一个自动本地调试和发布来设置变量的一个gitbook小Demo！

## 说明

> 该项目仅展示书写过程中，用到的全局变量（本项目以`imgurl`变量名示例），来解决发布环境的一些处理。可以特别关注`book.js`和`book.json`和`book.dev.json`文件。

想要预览项目，你只需要运行`npm run dev`就可以本地预览你的gitbook效果了。

如果需要发布，执行`npm run build`就编译成了一个可直接发布到正式线的文档了！

**当然，编译出来的`statics`目录只是在当前项目中，你依然需要自己创建一个脚本自动将statics目录内的文件上传到你预设的cdn路径。**

因此你完全可以添加一个脚本例如：`npm run publish`，让他执行`gitbook build && node upload`，此时你需要一个`upload.js`脚本来执行上传至CDN的操作，这里省略了。

I love javascript

![logo]({{book.imgurl}}/javascript-logo.jpg "logo")

> 注意，这张图片你在github的该项目目录下是看不到的。你要拉取他，然后运行上面提到的命令就能看到了。嘿嘿嘿。

## 其他

gitbook的其他的一些资料：

* [Add an option to specify config file](https://github.com/GitbookIO/gitbook/issues/753)
* [Gitbook Variables](https://github.com/GitbookIO/gitbook/blob/master/docs/templating/variables.md)
* [Gitbook Templating](https://github.com/GitbookIO/gitbook/tree/master/docs/templating)
