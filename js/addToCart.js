$(function(){
  var myCart = [];
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
  $(".toCart").click(function(){
    var exist = false;
    var category = $(this).attr("class").split(" ");
    category = category[category.length-1];
    for (var i = 0; i < myCart.length; i++) {
      if(myCart[i].name == $(this).attr("id")){
        exist = true;
        myCart[i].quantite++;
      }
    }
    if(!exist){
      for (var i = 0; i < items[category].length; i++) {
        if (items[category][i].nom == $(this).attr("id")) {
          myCart.push({"name":items[category][i].nom, "ref":items[category][i].reference, "quantite":1, "price":items[category][i].prix});
          break;
        }
      }
    }
  });
});
