var amazon = require('amazon-product-api');
var client = amazon.createClient({
    awsId: "AKIAJSHMDRSNZIWNW3GA",
    awsSecret: "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",
    awsTag: "jnjohnson-20"
});

var amazonMethods   = {};
var resultsPageHTML = [];   // An array which caches the generated HTML from each page of results, so the API doesn't need to be called for pages the user revisits
var searchName      = '';   // The string that was searched for by the user

amazonMethods.createProductThumbnails = function(res, itemName, pageNum){
   /* if (searchName == ''){
        searchName = itemName;
    }
    else if (searchName != itemName){
        searchName = itemName;
        resultsPageHTML = [];
    }
    else if (resultsPageHTML[pageNum-1] !== undefined){
        res.send(resultsPageHTML[pageNum-1]);
    }*/
    client.itemSearch({
        itemPage: pageNum,
        ResponseGroup: 'Images, ItemAttributes, Offers',
        SearchIndex: 'VideoGames',
        Title: itemName
    }).then(function(results){
        var html = '<div id="carouselExampleControls" class="carousel slide"><div class="carousel-inner"><div class="carousel-item active"><div class="row results-page">';
        for (var product in results){
            html += amazonMethods.generateHTML(results[product]);
        }
        //resultsPageHTML[pageNum-1] = html;
        html += '</div></div>';

        html += '</div><a class="carousel-control-prev" href="#carouselExampleControls" role="button">' +
        '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a>' + 
        '<a class="carousel-control-next" href="#carouselExampleControls" role="button">' +
        '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>';

        res.send(html);
    }).catch(function(err){
        console.log(err);
    });
}

amazonMethods.searchForItems = function(itemName, pageNum){
    var promise = client.itemSearch({
            itemPage: pageNum,
            ResponseGroup: 'Images, ItemAttributes, Offers',
            SearchIndex: 'VideoGames',
            Title: itemName
        }).then(function(results){
            var html = '<div id="carouselExampleControls" class="carousel slide" data-ride="carousel"><div class="carousel-inner"><div class="carousel-item active">';
            for (var product in results){
                html += amazonMethods.generateHTML(results[product]);
            }
            html += '</div><div class="carousel-item"><img class="d-block w-100" src="http://placehold.it/400x400" alt="Second slide"></div><div class="carousel-item"><img class="d-block w-100" src="http://placehold.it/400x400" alt="Third slide"></div>';

            html += '</div><a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">' +
            '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a>' + 
            '<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">' +
            '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>';

            resultsPageHTML[pageNum-1] = html;
            return html;
        }).catch(function(err){
            console.log(err);
        });
    return promise;
}

amazonMethods.generateHTML = function(result){
    var html =  '<div class="product-box col-12 col-md-5 col-lg-4 col-xl-2"><a target="_blank" href=' + result.DetailPageURL[0] + '>' +
                '<div class="set-amazon-img-height"><img class="center-element" src=' + result.MediumImage[0]["URL"][0] + '></div></a><div class="product-title">'+
                '<h3>' + result.ItemAttributes[0]["Title"][0] + '</h3></div><p class="product-price">'+ result.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0] +'<br>'+
                '</p><div><span class="center-element a-button a-button-primary"><a target="_blank" href=' + result.DetailPageURL[0] + 
                'style="text-decoration:none"><span class="a-button-inner">'+
                '<img src="http://webservices.amazon.com/scratchpad/assets/images/Amazon-Favicon-64x64.png" class="a-icon a-icon-shop-now">'+
                '<input class="a-button-input" type="submit" value="Add to cart"><span class="a-button-text">Shop Now</span>'+
                '</span></a></span></div></div>';
    return html;
}

module.exports = amazonMethods;