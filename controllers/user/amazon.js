var amazon = require('amazon-product-api');
var client = amazon.createClient({
    awsId: "AKIAJSHMDRSNZIWNW3GA",
    awsSecret: "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",
    awsTag: "jnjohnson-20"
});

var amazonMethods = {};

amazonMethods.searchForItem = function(itemName){
    client.itemSearch({
        ResponseGroup: 'Images, ItemAttributes, Offers',
        SearchIndex: 'VideoGames',
        Title: itemName
    }).then(function(results){
        console.log(results[0]);
        console.log(results[0].ItemAttributes.Title);
        console.log(results[0].DetailPageURL[0]);
        console.log(results[0].MediumImage[0]["URL"][0]);
    }).catch(function(err){
        console.log(err);
    });
};

amazonMethods.createProductThumbnail = function(result){
    var html =  '<div class="product-box"><a target="_blank" href=' + result.DetailPageURL[0] + '>' +
                '<img src=' + result.MediumImage[0]["URL"][0] + '></a><div class="product-title">'+
                '<h3>' + result.ItemAttributes.Title[0] + '</h3></div><p class="product-price">'+ result.OfferSummary.LowestNewOffer[0] +'<br>'+
                '</p><div><span class="a-button a-button-primary"><a target="_blank" href=' + result.DetailPageURL[0] + 
                'style="text-decoration:none"><span class="a-button-inner">'+
                '<img src="http://webservices.amazon.com/scratchpad/assets/images/Amazon-Favicon-64x64.png" class="a-icon a-icon-shop-now">'+
                '<input class="a-button-input" type="submit" value="Add to cart"><span class="a-button-text">Shop Now</span>'+
                '</span></a></span></div></div>';
}

exports.data = amazonMethods;