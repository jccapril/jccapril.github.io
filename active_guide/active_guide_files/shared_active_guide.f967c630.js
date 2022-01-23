$(function () {
  var actionBtn = $('.action-btn')
  var clicked = sessionStorage.getItem("clicked");
  if (clicked) {
    actionBtn.addClass('no-disable')
  }

  function appendUrlParams (url, params) {
    var append = []
    var seperator = url.split('?').length > 1 ? '&' : '?'
    _.each(params, function (v, k) {
      append.push(`${k}=${encodeURIComponent(v)}`)
    })
    return [url, append.join('&')].join(seperator)
  }

  // 获取参数
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return encodeURIComponent(r[2])
    }
  }

  $('.btn-download').on('click', function() {

    sessionStorage.setItem("clicked", 1)
    clicked = 1
    actionBtn.addClass('no-disable')
    var isNew = getUrlParam('new')
    if (isNew) {
      sendToCrius()
    }
    new ClipboardJS('.btn-download')
    setTimeout(function () {
      window.location.href = appendUrlParams($('.btn-download')[0].getAttribute('download-url'), {
        'return_url': encodeURIComponent(window.location.href)
      })
    })

  })

  $('.action-btn').on('click', function() {
    if (!clicked) {
      toast('请先下载助手')
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

function sendToCrius(){
  try {
    var uuid = localStorage.getItem('qk:biz:uuid');

    if (!uuid) {
      uuid = $crius.UUID();
      localStorage.setItem('qk:biz:uuid', uuid);
    }

    var msg = {
      url: encodeURIComponent(location.href),
      a: 'qianka',
      t: 'EVENT',
      c: 'download_btn_click'
    };

    msg.u = 0;
    if (uuid) msg.uu = uuid;

    var referer = $.cookie('qk_referer') || '';
    if (referer) msg.ap = JSON.stringify({referer_code: referer})
    $crius.send(msg);
  } catch (e) {
    console.log(e);
  }
}
