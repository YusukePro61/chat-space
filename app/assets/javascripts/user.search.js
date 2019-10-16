$(function(){

  function buildUser(user){
    // console.log(user.name)
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html
  }

  function buildMember(mem_id, mem_name){
   console.log(mem_name)
    var chatmember = `<div class='chat-group-user'>
                        <input name='group[user_ids][]' type='hidden' value=${mem_id}>
                        <p class='chat-group-user__name'>${mem_name}</p>
                        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                      </div>`
    return chatmember
  }

  $('#user-search-field').on("keyup", function(){
    var input = $('#user-search-field').val();
    $('.chat-group-user').remove()
    // console.log(input)

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      users.forEach(function(user){
      // console.log(user)
      var user_name = buildUser(user);

        if (user.length !== 0)
          $('#user-search-result').append(user_name)
        else {
          var ErrMsgToHTML = "一致するユーザーが見つかりません"
          $('#user-search-result').append(ErrMsgToHTML);
        }
      })
    })
    .fail(function(){
      alert('error');
    });
  });

  $(document).on("click", '.chat-group-user__btn--add', function () {
    console.log(this)
    var mem_id = $(this).attr('data-user-id')
    var mem_name = $(this).attr('data-user-name')
    console.log(mem_id, mem_name)
    var member = buildMember(mem_id, mem_name)
    // console.log(user)
    $('#chat-group-users').append(member)
    $(this).parent().remove()
    // var chatmember = this.parent
    // $('.chat-group-form__field--right').append(this.parent)
    // console.log(this)

  })

  $(document).on("click", '.js-remove-btn', function(){
    // console.log("click2")
    $(this).parent().remove()
  })
});