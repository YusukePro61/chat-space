$(function(){

  function buildUser(user){
    console.log(user.name)
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html
  }

  $('#user-search-field').on("keyup", function(){
    var input = $('#user-search-field').val();
    $('.chat-group-user').empty()
    console.log(input)

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      users.forEach(function(user){
      console.log(user)
      var user_name = buildUser(user);
      if (user.length !== 0)
        $('#user-search-result').append(user_name)
      else{
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
      })
    })
    .fail(function(){
      alert('error');
    });
  });
});