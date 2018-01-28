user = {}

var searchValidation = /^[-\sa-zA-Z0-9]+$/;
var carouselHTML = '<div id="amznCarousel" class="carousel slide" data-ride="false" data-interval="false"><div class="carousel-inner">' + 
'<div class="carousel-item active"></div><div class="carousel-item"></div>' +
'</div><a class="carousel-control-prev hidden" href="#amznCarousel" role="button" data-slide="prev">' +
'<img src="/public/images/back.png" class="prev" aria-hidden="true">' +
'<span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#amznCarousel" role="button" data-slide="next">' +
'<img src="/public/images/next-1.png" class="next" aria-hidden="true">' + 
'<span class="sr-only">Next</span></a></div>';

user.init = function(){
    var itemName;
    var pageNum;
	if (document.getElementById("searchBtn")){
		document.getElementById("searchBtn").addEventListener("click", function(){
            clearErrorMsgs();

            itemName = document.getElementById("searchBox").value;
            pageNum = 1;

            if (itemName == ''){
                createErrorMsg("You need to input an item!");
            }
            else if (!searchValidation.test(itemName)) {
                createErrorMsg("Invalid characters used in search");
            }
            else if (isNaN(pageNum)){
                createErrorMsg("An error occurred");
            }
            else {
                var promise = sendSearch(itemName, pageNum);
                //generate the next page of search results, and attach an event listener to the 'next' button

                promise.then(function(result){
                    document.getElementById("searchResults").innerHTML = carouselHTML;
                    document.getElementsByClassName("carousel-item")[0].innerHTML = result;

                    var page1Promise = sendSearch(itemName, pageNum+1);

                    page1Promise.then(function(page1Result){
                        document.getElementsByClassName("carousel-item")[1].innerHTML = page1Result;
                        document.getElementsByClassName("carousel-control-next")[0].addEventListener("click", function(){getNewSlide(itemName, ++pageNum)}, false);
                        document.getElementsByClassName("carousel-control-prev")[0].addEventListener("click", function(){checkPrevSlide(--pageNum)}, false);
                    }).catch(function(e){
                        createErrorMsg(e);
                    });

                }).catch(function(e){
                    createErrorMsg(e);
                });
            }
        }, false);
	}
}

function sendSearch(itemName, pageNum){
    return new Promise(function(resolve, reject){
        var data = {};
        data.itemName   = itemName;
        data.pageNum    = pageNum;

        data = JSON.stringify(data);
        Ajax.sendRequest('/', function(res){
            if (res.responseText == "no item"){
                reject("You need to input an item!");
            }
            else if (res.responseText == "invalid input"){
                reject("Invalid characters used in search");
            }
            else if (res.responseText == "An error occurred"){
                reject("An error occurred");
            }
            else {
                resolve(res.responseText);
            }
        }, data);
    });
}

function getNewSlide(itemName, newPageNum){
    if (newPageNum === 2){
        document.getElementsByClassName("carousel-control-prev")[0].classList.remove("hidden");
    }

    if (newPageNum == document.getElementsByClassName("carousel-item").length){
        var promise = sendSearch(itemName, newPageNum+1);
        promise.then(function(result){
            var newSlide = document.createElement('div');
            newSlide.className = "carousel-item";
            newSlide.innerHTML = result;
            document.getElementsByClassName("carousel-inner")[0].appendChild(newSlide);
        }).catch(function(e){
            createErrorMsg(e);
        });
    }
}

function checkPrevSlide(newPageNum){
    if (newPageNum === 1){
        document.getElementsByClassName("carousel-control-prev")[0].classList.add("hidden");
    }
}

function createErrorMsg(errorMsg){
    var parent      = document.getElementById("formError");
    var errorNode   = document.createElement("p");

    errorNode.id = "errorNode";
    errorNode.className = "text-danger error";
    errorNode.innerHTML = errorMsg;
    parent.appendChild(errorNode);
}

function clearErrorMsgs(){
    var parent = document.getElementById("formError");
    if (document.getElementById("errorNode")){
        parent.removeChild(document.getElementById("errorNode"));
    }
}

user.init();