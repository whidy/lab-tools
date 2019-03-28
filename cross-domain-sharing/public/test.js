console.log('starting magical ..............')
console.log(' === next log is from:', location.host, ' === ')
console.log('cookie:', document.cookie)
console.log(' === seems nothing, log end === ')


let frame = document.createElement('iframe')
// frame.name = 'yaola'
// frame.id = location.host
frame.id = 'yaola'
/**
 * 给iframe挂上第三方网站的地址，虽然是我们js执行的，为了保证通信的信任，挂上的
 * 但是，这样一来所有使用埋点的网站都能拿到我们的cookie了。所以这里安全问题？！？！
 * 所以要思考我为什么信任你这个埋点的网站？
 * 不过，你要得到什么，是由我们的test页面控制的，所以也没有什么安全问题？
 * 如果这样就太好了！
 */
frame.name = location.host
frame.src = 'http://51la.com:8080/test'
document.body.append(frame)




let script = document.createElement('script')
script.innerHTML = `
  /**
   * 这里是51la.com埋点生成的代码，我只能接受我允许的域名http://51la.com:8080匹配，
   * 启动监听，接收允许的域名
   */
  function receiveMessage(event) {
    // 2. 监听到了有人向站长埋点的网站发送了message
    console.log('receiving cookie', event.origin)
    if (event.origin !== "http://51la.com:8080") return;
    console.log('bingo! get cookie', event.data)
    // alert(event.data)
    document.getElementById('cookie').style.color = "red"
    document.getElementById('cookie').innerHTML = event.data + '<br/>啊，头发又少了好多。烧脑啊！'
  }
  window.addEventListener("message", receiveMessage, false);


  // console.log(document.getElementById('yaola'))
  // 1. 尝试向51la通信，这里我们自己定义好的指令，getCookie。其他人伪造通信指令也没用！因为test页面只执行这个指令相关代码！
  var frames = window.frames;
  for (var i = 0; i < frames.length; i++) {
    (function() {
      try {
        window.frames[i].postMessage(
          'getCookie',
          "http://51la.com:8080"
        );
      } catch (error) {
        // console.log('这个不是我想要搞的iframe') // 似乎没起作用
        // console.log(error);
      }
    }(i))
  }
  console.log('magic show done ...........')
`

setTimeout(() => {
  document.body.append(script)
}, 100);

