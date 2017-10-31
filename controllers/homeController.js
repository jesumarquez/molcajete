var homeController = {};

homeController.home = function(req, res){
    res.render('index');
};

homeController.about = function(req, res){
    res.render('about');
};

module.exports = homeController;