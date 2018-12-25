module.exports = function(app) {
    // Models
    var User =  require('../models/user');

    // Routes
    //User.methods(['get', 'put', 'post', 'delete']);
    User.register(app, '/users');
    
    app.get('/users', function(req, res) {
        User.find({}, function (err, cn_users) {
            if (err) {
                res.send(cn_users);
            }
            res.json(cn_users);
        });
    });

    app.get('/users', (req, res) => {
        User.getUsers((err, cn_users) => {
            if(err){
                throw err;
            }
            res.json(cn_users);
        });
    });

    app.get('/users/:_id', (req, res) => {
        User.getUserById(req.params._id, (err, cn_user) => {
            if(err){
                throw err;
            }
            res.json(cn_user);
        });
    });
    
    app.post('/users', (req, res) => {
        var _user = req.body;
        User.addUser(_user, (err, cn_user) => {
            if(err){
                throw err;
            }
            res.json(cn_user);
        });
    });
    
    app.put('/users/:_id', (req, res) => {
        var id = req.params._id;
        var user = req.body;
        User.updateProfile(id, user, {}, function (err, cn_user) {
            if(err){
                throw err;
            }
            res.json(cn_user);
        });
    });
    
    app.delete('/users/:_id', (req, res) => {
        var id = req.params._id;
        User.deleteUser(id, (err, cn_user) => {
            if(err){
                throw err;
            }
            res.json(cn_user);
        });
    });

    // Return app
    return app;
}