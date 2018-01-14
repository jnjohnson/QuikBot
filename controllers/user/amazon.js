var amazon = require('amazon-product-api');
var client = amazon.createClient({
    awsId: "AKIAJSHMDRSNZIWNW3GA",
    awsSecret: "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",
    awsTag: "jnjohnson-20"
});

var amazonMethods = {};

amazonMethods.createProductThumbnails = function(res, itemName){
    client.itemSearch({
        ResponseGroup: 'Images, ItemAttributes, Offers',
        SearchIndex: 'VideoGames',
        Title: itemName
    }).then(function(results){
        var html = '';
        for (var product in results){
            html += amazonMethods.generateHTML(results[product]);
        }
        res.send(html);
    }).catch(function(err){
        console.log(err);
    });
}

amazonMethods.generateHTML = function(result){
    var html =  '<div class="product-box col-12 col-md-5 col-lg-4 col-xl-2"><a target="_blank" href=' + result.DetailPageURL[0] + '>' +
                '<div class="center-element img-height"><img src=' + result.MediumImage[0]["URL"][0] + '></div></a><div class="product-title">'+
                '<h3>' + result.ItemAttributes[0]["Title"][0] + '</h3></div><p class="product-price">'+ result.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0] +'<br>'+
                '</p><div><span class="center-element a-button a-button-primary"><a target="_blank" href=' + result.DetailPageURL[0] + 
                'style="text-decoration:none"><span class="a-button-inner">'+
                '<img src="http://webservices.amazon.com/scratchpad/assets/images/Amazon-Favicon-64x64.png" class="a-icon a-icon-shop-now">'+
                '<input class="a-button-input" type="submit" value="Add to cart"><span class="a-button-text">Shop Now</span>'+
                '</span></a></span></div></div>';
    return html;
}

module.exports = amazonMethods;