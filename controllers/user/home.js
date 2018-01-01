var searchValidation = /^[-\sa-zA-Z0-9]+$/;

module.exports = {
	/*THIS PROVIDES THE CONTENT FOR THE INDEX PAGE*/
    index: function(req, res){
          res.render('user/home');
     },
     
     /* This function is called when a user clicks the 'Search' button */
    search: function(req, res){
        console.log(req.body.itemName);

        var item = req.body.itemName;
        if (item == ''){
            res.send("no item");
        }
        else if (!searchValidation.test(item)) {
            res.send("invalid input");
        }
        else {
            res.send("valid input");
        }
    }
}