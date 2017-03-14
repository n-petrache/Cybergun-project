$(function(){
  /*je déclare variable regex pour le nom afin de verifier si des tirets ou des lettres*/
  var regexName = /^\D+[-]?\D+/i;
  /*je declare variable regex mail(qui recherche la synthaxe d'une adresse mail) */
  var regexMail = /^[\w\-\.]+[a-z0-9]@[\w\-\.]+[a-z0-9]\.[a-z]+/i;
  var regexAddress = /^\d{1,5}([ ]?bis|[ ]?ter)?[,]?[ ]\w{2,9}[a-z ]+\d{5}\D+/i;
  $("#validForm").click(function(){
    if (!regexName.test($('#pseudo').val())){
      $(".pseudo .glyphicon-remove").show();
      $(".pseudo .glyphicon-ok").hide();
    }else{
      $(".pseudo .glyphicon-ok").show();
      $(".pseudo .glyphicon-remove").hide();
    }
    if (!$.isNumeric($("#age").val()) || $("#age").val() < 18){
      $(".age .glyphicon-remove").show();
      $(".age .glyphicon-ok").hide();
    }else{
      $(".age .glyphicon-ok").show();
      $(".age .glyphicon-remove").hide();
    }
    if (!regexAddress.test($('#address').val())){
      $(".address .glyphicon-remove").show();
      $(".address .glyphicon-ok").hide();
    }else{
      $(".address .glyphicon-ok").show();
      $(".address .glyphicon-remove").hide();
    }
    /*si le test de la regex confirme synthaxe mail fausse*/
    if (!regexMail.test($('#email').val())){
      $(".email .glyphicon-remove").show();
      $(".email .glyphicon-ok").hide();
    }else{
      $(".email .glyphicon-ok").show();
      $(".email .glyphicon-remove").hide();
    }
    if($("#password").val().length < 4){
      $(".password .glyphicon-remove").show();
      $(".password .glyphicon-ok").hide();
    }else{
      $(".password .glyphicon-ok").show();
      $(".password .glyphicon-remove").hide();
      if($("#password").val() != $("#confirm").val()){
        $(".confirm .glyphicon-remove").show();
        $(".confirm .glyphicon-ok").hide();
      }else{
        $(".confirm .glyphicon-ok").show();
        $(".confirm .glyphicon-remove").hide();
      }
    }
  });
});
