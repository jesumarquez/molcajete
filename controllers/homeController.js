var homeController = {};

homeController.home = function(req, res){
    res.render('home/');
};

homeController.about = function(req, res){
    res.render('home/about');
};

module.exports = homeController;