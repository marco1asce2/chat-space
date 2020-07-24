$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Chat__Main__Message__Box" data-message-id=${message.id}>
          <ul class="MessageData">
            <li class="UserName">
              ${message.user_name}
            </li>
            <li class="CreatedAt">
              ${message.created_at}
            </li>
          </ul>
          <p class="Type_A_Message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </p>
        </div>`
      return html;
    } else {
      let html =
        `<div class="Chat__Main__Message__Box" data-message-id=${message.id}>
          <ul class="MessageData">
            <li class="UserName">
              ${message.user_name}
            </li>
            <li class="CreatedAt">
              ${message.created_at}
            </li>
          </ul>
          <p class="Type_A_Message">
            <p class="Message__content">
              ${message.content}
            </p>
          </p>
        </div>`
      return html;
    };
  }

  $('.NewMessage').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Chat__Main__Message').append(html);
      $('.Chat__Main__Message').animate({ scrollTop: $('.Chat__Main__Message')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
    .always(() => {
      $(".SubmitBtn").removeAttr("disabled");
    });
  });
});