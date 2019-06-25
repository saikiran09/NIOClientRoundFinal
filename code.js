function loadCurrencyData() {
   $.ajax({
       url: 'https://api.coinranking.com/v1/public/coins',
       dataType: 'json',
       success: function(response) {
     document.getElementById("currency-container").innerHTML="";
        var data = response.data.coins;
        for(var i=0; i <data.length; i++) {
            addToView(data[i]);
        }
       }
   });
}
function setTitle(elem,id){
    $.ajax({
        url: 'https://api.coinranking.com/v1/public/coin/'+id,
        dataType: 'json',
        success: function(response) {
         var toolTipText ="Name :"+ response.data.coin.name+"\nDescription :"+response.data.coin.description;
        elem.title=toolTipText;
        }
    }); 
}
setInterval(function(){
    loadCurrencyData();
},60*1000)

function addToView(dataObj){
    var currencyValue=parseFloat(parseFloat(parseFloat(dataObj.price).toFixed(2))/parseFloat(parseFloat(dataObj.volume.toFixed(2))));
    var row = '<div class="row" onmouseover="setTitle(this,'+dataObj.id+')">' +
    '<div class="col-md-4">' + dataObj.name +'</div><div class="col-md-4">$'+currencyValue +'</div><div class="col-md-4" style="color:'+ dataObj.color +'">'+ dataObj.change +'% <i class="fas fa-arrow-down"></i>' + '</div>';
    $('#currency-container').append(row);
}