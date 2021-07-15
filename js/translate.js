var langs = ['en', 'es'];
var current_lang_index = 1;
var current_lang = langs[current_lang_index];

var request = new XMLHttpRequest();
request.responseType = 'json';
request.open("GET", "./langs/es.json", true);
request.onload  = function() {
   translate(request);
};
request.send(null)

window.change_lang = function() {
  current_lang_index = ++current_lang_index % langs.length;
  current_lang = langs[current_lang_index];
  request.open("GET", "./langs/" + current_lang + ".json", true)
  request.onload  = function() {
    translate(request);
 };
 request.send(null)
}

function translate(request) {
  $("[data-translate]").each(function(){
    var key = $(this).data('translate');
    $(this).html(request.response[key] || "N/A");
  });
}

$("#change_lang").click(function(e){
  e.preventDefault();
  change_lang();
});