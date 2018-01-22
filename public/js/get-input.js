user = {}

var searchValidation = /^[-\sa-zA-Z0-9]+$/;

user.init = function(){
    var itemName;
    var pageNum;
	if (document.getElementById("searchBtn")){
		document.getElementById("searchBtn").addEventListener("click", function(){
            clearErrorMsgs();

            itemName = document.getElementById("searchBox").value;
            pageNum = 1;

            var data = {};
            data.itemName   = itemName;
            data.pageNum    = pageNum;

            if (data.itemName == ''){
                createErrorMsg("You need to input an item!");
            }
            else if (!searchValidation.test(data.itemName)) {
                createErrorMsg("Invalid characters used in search");
            }
            else if (isNaN(data.pageNum)){
                createErrorMsg("An error occurred");
            }
            else {
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
                        document.getElementById("searchResults").innerHTML = res.responseText;
                    }
                }, data);
            }
        }, false);
	}
}

function newPage(itemName, pageNum){
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
            //do stuff?
        }
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