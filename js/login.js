$(function(){
  //je déclare variable regex pour le nom afin de verifier si des tirets ou des lettres
  var regexName = /^\D+[-]?\D+/i;
  //je declare variable regex mail(qui recherche la synthaxe d'une adresse mail)
  var regexMail = /^[\w\-\.]+[a-z0-9]@[\w\-\.]+[a-z0-9]\.[a-z]+/i;
  //je declare variable regex adresse qui recherche synthaxe adresse mail)
  var regexAddress = /^\d{1,5}([ ]?bis|[ ]?ter)?[,]?[ ]\w{2,9}[a-z ]+\d{5}\D+/i;
  //je déclare ma variable users qui va servir à stocker la structure json
  var users = 0;
  //je déclare ma fonction permettant de lire un fichier
  function readTextFile(file)
  {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
      if(rawFile.readyState === 4)
      {
        if(rawFile.status === 200 || rawFile.status == 0)
        {
          users = JSON.parse(rawFile.responseText);
        }
      }
    }
    rawFile.send(null);
  }
  //j'appelle la fonction qui va lire mon fichier json
  readTextFile( 'js/users.json' );
  //je déclare ma fonction qui permet de vérifier si un pseudo ou email existe déjà
  function hasMatchInput(type, inputVal) {
    //je déclare un booléen pour connaître
    var hasMatch =false;
    //je crée une boucle de la taille de ma structure json
    for (var index = 0; index < users.user.length; index++) {
      var user = users.user[index];
      //si le json dont la clé est email ou pseudo correscpond à mon input alors existe déjà il stoppe la fonction
      if(user[type] == inputVal){
        hasMatch = index;
        break;
      }
    }
    return hasMatch;
  }
  //je démarre ma fonction au click du bouton Ok
  $("#validForm").click(function(){
    //variable qui vérifie que tous mes champs sont remplis correctement
    var isCorrect = true;
    /*je teste la valeur de mon champs pseudo avec une regex qui prend en compte les caractères alphanumériques,
    si fausse cela affiche croix rouge et cela cache le tick vert */
    if (!regexName.test($('#pseudo').val()) || hasMatchInput("pseudo", $('#pseudo').val()) !== false){
      $(".pseudo .glyphicon-remove").show();
      $(".pseudo .glyphicon-ok").hide();
      isCorrect = false;
      //alors si vraie cela affiche le tick vert sinon si fausse affiche la croix rouge
    }else{
      $(".pseudo .glyphicon-ok").show();
      $(".pseudo .glyphicon-remove").hide();
    }//je teste la valeur dans le champs age si faux(!) qu'il soit numérique ou inférieur à 18 ans
    if (!$.isNumeric($("#age").val()) || $("#age").val() < 18){
      $(".age .glyphicon-remove").show();
      $(".age .glyphicon-ok").hide();
      isCorrect = false;
    }else{
      $(".age .glyphicon-ok").show();
      $(".age .glyphicon-remove").hide();
    }
    if (!regexAddress.test($('#address').val())){
      $(".address .glyphicon-remove").show();
      $(".address .glyphicon-ok").hide();
      isCorrect = false;
    }else{
      $(".address .glyphicon-ok").show();
      $(".address .glyphicon-remove").hide();
    }
    if (!regexMail.test($('#email').val()) || hasMatchInput("email", $('#email').val())!== false){
      $(".email .glyphicon-remove").show();
      $(".email .glyphicon-ok").hide();
      isCorrect = false;
    }else{
      $(".email .glyphicon-ok").show();
      $(".email .glyphicon-remove").hide();
    }//je teste la valeur dans le champs password qu'il ait une longueur de 4 caractères
    if($("#password").val().length < 4){
      $(".password .glyphicon-remove").show();
      $(".password .glyphicon-ok").hide();
      isCorrect = false;
    }else{
      $(".password .glyphicon-ok").show();
      $(".password .glyphicon-remove").hide();
      //je teste que la valeur dans le champs confirm est égale à la valeur du champs password
      if($("#password").val() != $("#confirm").val()){
        $(".confirm .glyphicon-remove").show();
        $(".confirm .glyphicon-ok").hide();
        isCorrect = false;
      }else{
        $(".confirm .glyphicon-ok").show();
        $(".confirm .glyphicon-remove").hide();
      }
    }
    if(isCorrect){
      //je crée un nouvel utilisateur (objet pour le Json)
      users.user[users.user.length] = {
        "pseudo": $("#pseudo").val(),
        "age": $("#age").val(),
        "address": $("#address").val(),
        "email": $("#email").val(),
        "password": $("#password").val()
      };
      //tout est correct donc la fenêtre se ferme
      $("#signIt").modal("toggle")
    }
  });
  //je démarre ma fonction au click du bouton ok (formulaire connexion) idem formulaire inscription
  $("#validFormUp").click(function(){
    var hasMatchPseudo = hasMatchInput("pseudo", $("#pseudoUp").val());
    var isCorrect = true;
    if(hasMatchPseudo === false)
    {
      $(".pseudoUp .glyphicon-remove").show();
      $(".pseudoUp .glyphicon-ok").hide();
    }
    else {
      $(".pseudoUp .glyphicon-ok").show();
      $(".pseudoUp .glyphicon-remove").hide();
      var hasMatchPassword = users.user[hasMatchPseudo].password;
      if($("#passwordUp").val() == hasMatchPassword)
      {
        $("#signUp").modal("toggle");
      }
      else
      {
        $(".passwordUp .glyphicon-remove").show();
        $(".passwordUp .glyphicon-ok").hide();
      }
    }
  });
  $('#buttonUp').click(function() {
    var clickNumber = $('#buttonUp').val();
    $('#buttonUp').val(parseInt(clickNumber) + 1);
  });
  $('#buttonDown').click(function() {
    var clickNumber = $('#buttonDown').val();
    $('#buttonDown').val(parseInt(clickNumber) - 1);
  });
  $('#trashButton').click(function() {
    var reset = $('#trashButton').val();
    $('#trashButton').val(remove(reset));
  });
});
