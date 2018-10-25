const InitImg = () => {
  let imgs = document.getElementsByClassName('pic-c-c')
  setTimeout(function () {
    for (var i = 0, l = imgs.length; i < l; i++) {
      if (imgs.length !== 0) {
        let a = new Image()
        a.src = imgs[i].getAttribute('data');
        if (a.width < a.height) {
          imgs[i].style.width = '100%'
        } else {
          imgs[i].style.height = '100%'
        }
      }
    }
  }, 200)
}
export default {
  InitImg
}