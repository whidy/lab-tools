# lab-tools
make tools

## tools list and introduction

各种工作中要写的小工具，比较简陋。以实现业务优先，后期有空再优化。

### watermark

给很多张相同的图片分别添加不同的文字小水印的简单版本。

### watermark-in-one

给一张图片加上重复的水印的临时处理方案。

* [getImageData循环方案](./watermark-in-one/index.html)
* [图形循环后旋转方案](./watermark-in-one/index_2.html)

相关canvas教程：<https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial>

> 可以修改 `0 ~ 90 度`角度，水印的单条文本长度最大不能超过图片的宽度。可调整字体`大小`，`颜色`，可调整每个文本之间x，y`间距`等，有空封装一下。