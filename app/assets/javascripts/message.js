$(function(){

  function buildAnotherMSG(message){
    var images = (message.image) ? `<img class="lower-message__image" src="${message.image}">` : '';
    var userHTML = `<div class="main-display" data-id=${message.id}>
                        <div class="main-display__username">
                          ${message.user_name}
                        <div class="main-display__username__date">
                          ${message.created_at}
                          </div>
                        </div>
                      <div class="main-display__comment">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                          ${images}
                      </div>
                    </div>`
    return userHTML
  }

  var reloadMessages = (function(){
    var last_message_id = $('.main-display').last().data('id');
    console.log(last_message_id);

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })

    .done(function(messages){
      // console.log('success')
      // console.log(messages)
      messages.forEach(function(message) {
        var usermsg = buildAnotherMSG(message)
        $('.main-content').append(usermsg)
      })
      $('.main-content').animate({ scrollTop: $('.main-content')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      console.log('error');
    })
});

  function buildMessage(message){
    var img = (message.img) ? `<img class="lower-message__image" src="${message.img}">` : '';
    var html = `<div class="main-display" data-id='message.id'>
                    <div class="main-display__username">
                      ${message.name}
                    <div class="main-display__username__date">
                      ${message.date}
                    </div>
                    </div>
                    <div class="main-display__comment">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                        ${img}
                    </div>
                </div>`
    return html;
  }


  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var insert_html = buildMessage(message);
      $('.main-content').append(insert_html)
      $('form')[0].reset();
      $('.main-content').animate({ scrollTop: $('.main-content')[0].scrollHeight});
      $('.chat-box__form__submit').attr('disabled', false);
    })

    .fail(function(){
      $('form')[0].reset();
      $('.chat-box__form__submit').attr('disabled', false);
      alert('入力して下さい');
    });

  });
  if (document.URL.match(/messages/)) {
    setInterval(reloadMessages, 5000);
  }
});