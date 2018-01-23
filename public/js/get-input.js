user = {}

var searchValidation = /^[-\sa-zA-Z0-9]+$/;
var carouselHTML = '<div id="amznCarousel" class="carousel slide"><div class="carousel-inner">' + 
'<div class="carousel-item active"></div><div class="carousel-item"><img src="http://placehold.it/1000x592">' +
'</div><div class="carousel-item"><img src="http://placehold.it/1000x592">' +
'</div></div><a class="carousel-control-prev" href="#amznCarousel" role="button" data-slide="prev">' +
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
                var searchResult = sendSearch(itemName, pageNum);

                //Need sendSearch to return a promise as it is an async function
                //In the success function of the promise, insert carousel code and generated html from amazon,
                //generate the next page of search results, and attach an event listener to the 'next' button

                if (searchResult != false){
                    document.getElementById("searchResults").innerHTML = carouselHTML;
                    document.getElementsByClassName("carousel-item")[0].innerHTML = searchResult;
                }
            }
        }, false);
	}
}

function sendSearch(itemName, pageNum){
    var data = {};
    data.itemName   = itemName;
    data.pageNum    = pageNum;

    data = JSON.stringify(data);
    Ajax.sendRequest('/', function(res){
        if (res.responseText == "no item"){
            createErrorMsg("You need to input an item!");
        }
        else if (res.responseText == "invalid input"){
            createErrorMsg("Invalid characters used in search");
        }
        else if (res.responseText == "An error occurred"){
            createErrorMsg("An error occurred");
        }
        else {
            return res.responseText;
        }
        return false;
    }, data);
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