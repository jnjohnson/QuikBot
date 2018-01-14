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

        if (data == ''){
            res.send("no item");
        }
        else if (!searchValidation.test(data)) {
            res.send("invalid input");
        }
        else {
            amazon.createProductThumbnails(res, data);
        }
    }
}