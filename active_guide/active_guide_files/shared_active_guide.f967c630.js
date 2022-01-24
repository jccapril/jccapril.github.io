$(function () {
  var actionBtn = $('.action-btn')
  var clicked = sessionStorage.getItem("clicked");
  if (clicked) {
    actionBtn.addClass('no-disable')
  }

  $('.btn-download').on('click', function() {

    sessionStorage.setItem("clicked", 1)
    clicked = 1
    actionBtn.addClass('no-disable')
    new ClipboardJS('.btn-download')
    setTimeout(function () {
      window.location.href = $('.btn-download')[0].getAttribute('download-url')
    })

  })

  $('.action-btn').on('click', function() {
    if (!clicked) {
      toast('请先下载悦聚')
      return
    }
    window.location.href = scheme

  })
})

function toast(message, classed) {
  var messages = document.getElementsByClassName('message') || div
  if (messages.length) return
  var str='<div class="message ' + classed + '"><span></span></div>'
  $('body').append(str);
  $(".message").fadeIn().find("span").html(message);
  setTimeout(function(){
    $(".message").fadeOut();
    $("body .message").remove();
  }, 2000)
}

