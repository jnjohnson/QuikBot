user = {}

var searchValidation = /^[-\sa-zA-Z0-9]+$/;

user.init = function(){
	if (document.getElementById("searchBtn")){
		document.getElementById("searchBtn").addEventListener("click", function(){
            clearErrorMsgs();

            var data = document.getElementById("searchBox").value;
            if (data == ''){
                console.log("no item submitted");
                createErrorMsg("You need to input an item!");
            }
            else if (!searchValidation.test(data)) {
                console.log("invalid input");
                createErrorMsg("Invalid characters used in search");
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
                });
            }
        }, false);
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