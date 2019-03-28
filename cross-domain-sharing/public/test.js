console.log('starting magical ..............')
console.log(' === next log is from:', location.host, ' === ')
console.log('cookie:', document.cookie)
console.log(' === seems nothing, log end === ')


let frame = document.createElement('iframe')
// frame.name = 'yaola'
// frame.id = location.host
frame.id = 'yaola'
frame.name = location.host
frame.src = 'http://51la.com:8080/test'
document.body.append(frame)



let script = document.createElement('script')
script.innerHTML = `
  // console.log(document.getElementById('yaola'))
  window.frames[0].postMessage(
    'getCookie',
    "http://51la.com:8080"
  );
  function receiveMessage(event) {
    console.log('receving cookie', event.origin)
    if (event.origin !== "http://51la.com:8080") return;
    console.log('bingo! get cookie', event.data)
    alert(event.data)
  }
  window.addEventListener("message", receiveMessage, false);
  console.log('magic show done ...........')
  // console.log(document.cookie)
  // let win = window.frames.example;
  // win.postMessage("message", "*");
`

setTimeout(() => {
  document.body.append(script)
}, 100);

