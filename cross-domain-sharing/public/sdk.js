// console.log('starting magical ..............')
// console.log(' === next log is from:', location.host, ' === ')
// console.log('cookie:', document.cookie)
// console.log(' === seems nothing, log end === ')

/**
 * SDK中的部分代码，运行于第三方网站上。
 * checkIframeLoaded: 全局变量，用于检测通信窗口加载并是否执行成功
 */
var checkIframeLoaded = false
// 创建iframe用于和51la进行通信，获取cookie
var frame = document.createElement('iframe')
frame.id = 'yaola'
frame.name = location.host
frame.setAttribute('style', 'width:0;height:0;border:0;')
frame.src = 'http://51la.com:8080/test'
document.body.appendChild(frame)
// 
setTimeout(function() {
  console.log(checkIframeLoaded)
}, 5000);

function receiveMessage(event) {
  alert(event.data)
  if (event.origin !== "http://51la.com:8080") return;
  checkIframeLoaded = true
  document.getElementById('cookie').style.color = "red"
  document.getElementById('cookie').innerHTML = event.data + '<br/>啊，头发又少了好多。烧脑啊！'
}
window.addEventListener("message", receiveMessage, false);
setTimeout(function() {
  try {
    window.frames[location.host].postMessage(
      'getCookie',
      "http://51la.com:8080"
    );
  } catch (error) {
    throw '通信失败：' + error
  }
}, 50)
// var script = document.createElement('script')
// script.innerHTML = `
//   function receiveMessage(event) {
//     if (event.origin !== "http://51la.com:8080") return;
//     checkIframeLoaded = true
//     document.getElementById('cookie').style.color = "red"
//     document.getElementById('cookie').innerHTML = event.data + '<br/>啊，头发又少了好多。烧脑啊！'
//   }
//   window.addEventListener("message", receiveMessage, false);
//   try {
//     window.frames[location.host].postMessage(
//       'getCookie',
//       "http://51la.com:8080"
//     );
//   } catch (error) {
//     throw '通信失败：' + error
//   }
// `

// setTimeout(() => {
//   document.body.append(script)
// }, 50);

