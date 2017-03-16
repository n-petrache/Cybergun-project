$(function(){
  var items = "";
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
          items = JSON.parse(rawFile.responseText);
        }
      }
    }
    rawFile.send(null);
  }
  //j'appelle la fonction qui va lire mon fichier json
  readTextFile( 'js/items.json' );

  var categoryArray = ["accessoires","repliques","consommables","protections"];
  var typeArray = [];
  for (var i = 4; i > 0; i--) {
    var randI = Math.floor(Math.random() * i);
    var useCat = categoryArray[randI];
    for (var j = 0; j < items[useCat].length; j++) {
      typeArray[j] = j;
    }
    for (var j = items[useCat].length; j > 0; j--) {
      var randJ = Math.floor(Math.random() * j);
      var index = typeArray[randJ];
      $("#content").append("<div class=\"col-xs-8 col-sm-6 col-md-3 col-lg-2 col-xs-offset-2 col-sm-offset-0\"><div class=\"thumbnail box\"><img src="+items[useCat][index].image + " alt=" + items[useCat][index].nom + " title=" + items[useCat][index].nom + "><div class=\"overbox\"><div class=\"tagline overtext\">" + items[useCat][index].detail + "</div></div><div class=\"caption\"><p>" + items[useCat][index].nom + "</p><p>" + items[useCat][index].prix + "</p><div class=\"btn btn-primary glyphicon glyphicon-shopping-cart toCart\"> Ajouter</div></div></div></div>");
      typeArray.splice(randJ, 1);
    }
    categoryArray.splice(randI, 1);
  }



  $("#nav a").click(function(){
    var category = $(this).attr("class");
    var type = $(this).attr("id");
    $("#content").empty();
    if(typeof type !== "undefined")
    {
      for (var i = 0; i < items[category].length; i++) {
        if(items[category][i].type == type)
        {
          $("#content").append("<div class=\"col-xs-8 col-sm-6 col-md-3 col-lg-2 col-xs-offset-2 col-sm-offset-0\"><div class=\"thumbnail box\"><img src="+items[category][i].image + " alt=" + items[category][i].nom + " title=" + items[category][i].nom + "><div class=\"overbox\"><div class=\"tagline overtext\">" + items[category][i].detail + "</div></div><div class=\"caption\"><p>" + items[category][i].nom + "</p><p>" + items[category][i].prix + "</p><div class=\"btn btn-primary glyphicon glyphicon-shopping-cart toCart\"> Ajouter</div></div></div></div>");
        }
      }
    }
    else
    {
      for (var i = 0; i < items[category].length; i++) {
        $("#content").append("<div class=\"col-xs-8 col-sm-6 col-md-3 col-lg-2 col-xs-offset-2 col-sm-offset-0\"><div class=\"thumbnail box\"><img src="+items[category][i].image + " alt=" + items[category][i].nom + " title=" + items[category][i].nom + "><div class=\"overbox\"><div class=\"tagline overtext\">" + items[category][i].detail + "</div></div><div class=\"caption\"><p>" + items[category][i].nom + "</p><p>" + items[category][i].prix + "</p><div class=\"btn btn-primary glyphicon glyphicon-shopping-cart toCart\"> Ajouter</div></div></div></div>");
      }
    }
  });
});
