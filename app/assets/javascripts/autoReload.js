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

  let reloadMessages = function() {
    let last_message_id = $('.Chat__Main__Message__Box:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    }).done(function(messages){
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.Chat__Main__Message').append(insertHTML);
        $('.Chat__Main__Message').animate({ scrollTop: $('.Chat__Main__Message')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});