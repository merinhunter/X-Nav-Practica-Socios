function addMessages(file, element) {
  $.getJSON(file).done(function(data) {
    for(message of data) {
      var button = document.createElement('button');
      button.className = "accordion";

      var avatar = document.createElement('img');
      avatar.src = message.avatar;
      button.appendChild(avatar);

      var author = document.createElement('h3');
      author.innerHTML = message.author;
      button.appendChild(author);

      var title = document.createElement('h2');
      title.innerHTML = message.title;
      button.appendChild(title);

      document.getElementById(element).appendChild(button);

      var div = document.createElement('div');
      div.className = "panel";

      var text = document.createElement('h3');
      text.innerHTML = message.content.text;
      div.appendChild(text);

      if(message.content.att != undefined) {
        var att = document.createElement('img');
        att.src = message.content.att;
        div.appendChild(att);
      }

      if(message.content.location != undefined) {
        var location = document.createElement('h5');
        location.innerHTML = message.content.location;
        div.appendChild(location);
      }

      var date = document.createElement('h5');
      date.innerHTML = message.date;
      div.appendChild(date);

      document.getElementById(element).appendChild(div);

      button.onclick = function() {
        this.classList.toggle("active");

        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      }
    }
  });
};

function addUpdate() {
  $.getJSON("json/update.json").done(function(data) {
    if(data.length > 0) {
      var button = document.createElement('button');
      button.typeName = "button";
      button.className = "btn btn-primary";

      var h4 = document.createElement('h4');
      h4.innerHTML = "Nuevos mensajes ";

      var span = document.createElement('span');
      span.className = "badge";
      span.innerHTML = data.length;
      h4.appendChild(span);

      button.appendChild(h4);

      document.getElementById('home').prepend(button);

      button.onclick = function() {
        $(this).hide('fade', {}, 250);

        addMessages("json/update.json", 'update');
      }
    }
  });
};

$(document).ready(function() {
  addMessages("json/myline.json", 'profile');
  addMessages("json/timeline.json", 'home');
  addUpdate();
});
