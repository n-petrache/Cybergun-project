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
  //replique, accessoires, consommables, ....
  $("#nav a").click(function(){
    var category = $(this).attr("class");
    var type = $(this).attr("id");
    $("#content").empty(); //Créer une div row avec un id content qui contiendra tous les objets
    if(typeof type !== "undefined")
    {
      for (var i = 0; i < items[category].length; i++) {
        if(items[category][i].type == type)
        {
          $("#content").append("<div class=\"col-xs-8 col-sm-6 col-md-3 col-lg-2 col-xs-offset-2 col-sm-offset-0\"><div class=\"thumbnail box\"><img src="+items[category][i].image + " alt=" + items[category][i].nom + " title=" + items[category][i].nom + "><div class=\"overbox\"><div class=\"title overtext\"> Description </div><div class=\"tagline overtext\">" + items[category][i].detail + "</div></div><div class=\"caption\"><p>" + items[category][i].nom + "</p><p>" + items[category][i].prix + "</p><div class=\"btn btn-primary glyphicon glyphicon-shopping-cart toCart\"> Ajouter</div></div></div></div>");
        }
      }
    }
    else
    {
      for (var i = 0; i < items[category].length; i++) {
        $("#content").append("<div class=\"col-xs-8 col-sm-6 col-md-3 col-lg-2 col-xs-offset-2 col-sm-offset-0\"><div class=\"thumbnail box\"><img src="+items[category][i].image + " alt=" + items[category][i].nom + " title=" + items[category][i].nom + "><div class=\"caption\"><p>" + items[category][i].nom + "</p><p>" + items[category][i].prix + "</p><div class=\"btn btn-primary glyphicon glyphicon-shopping-cart toCart\"> Ajouter</div></div></div></div>");
      }
    }
  });
});
