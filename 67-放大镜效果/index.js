$(document).ready(function() {
  const zoomHolder = $('.zoom-holder');
  const zoomOverlay = $('.zoom-img-overlay');
  const originContainer = $('.inner');
  const originImg = originContainer.find('img');
  let orgW, orgH, newW, newH;

  const orgImg = new Image();
  orgImg.onload = function() {
    console.log(orgImg.width, 'loaded')
    orgW = orgImg.width;
    orgH = orgImg.height;
  }
  orgImg.src = originImg[0].src;
  const newImg = new Image();
  newImg.onload = function() {
    newW = newImg.width;
    newH = newImg.height;
  }
  newImg.src = zoomHolder.find('.img_wrapper img')[0].src;

  let timeoutId;
  originImg.on('mouseenter', function(ev) {
    zoomOverlay.css({
      left: originImg.offset().left,
      top: originImg.offset().top,
      width: originImg.width(),
      height: originImg.height(),
      display: 'block'
    })
    zoomHolder.show();
  })
  zoomOverlay.on('mouseleave', function(ev) {
    zoomHolder.hide();
    zoomOverlay.css({ 'left': 'auto', 'top': 'auto', 'width': 'auto', 'height': 'auto', display: "none" });
  })
  zoomOverlay.on('mousemove', function(ev) {
    const moveX = ev.pageX - parseInt(zoomOverlay.css('left'));
    const moveY = ev.pageY - parseInt(zoomOverlay.css('top'));
    const lastX = moveX / (orgW / newW);
    const lastY = moveY / (orgH / newH);

    zoomHolder.css({
      left: ev.pageX - 150,
      top: ev.pageY - 150
    })
    zoomHolder.find('.img_wrapper img').css({
      left: -(lastX - 150),
      top: -(lastY - 150)
    })
  })
})