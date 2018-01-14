var searchValidation = /^[-\sa-zA-Z0-9]+$/;
var amazon = require('./amazon.js');

module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
        res.render('user/home');
     },
     
     /* This function is called when a user clicks the 'Search' button */
    search: function(req, res){
        var data = JSON.parse(req.body.data);
        if (data.itemName == ''){
            res.send("no item");
        }
        else if (!searchValidation.test(data.itemName)) {
            res.send("invalid input");
        }
        else if (isNaN(data.pageNum)){
            res.send("An error occurred");
        }
        else {
            amazon.createProductThumbnails(res, data.itemName, data.pageNum);
        }
    }
}