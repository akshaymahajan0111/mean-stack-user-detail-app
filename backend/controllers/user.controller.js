const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    let user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.mobile = req.body.mobile;
    user.save((error, doc) => {
        if (!error)
            res.send(doc);
        else {
            if (error.code == 11000)
                res.status(422).send(['Duplicate email address found.']);
            else
                return next(error);
        }
    });
}

module.exports.list = (req, res, next) => {
    console.log('inside listUsers')
    User.find({}, function (err, users) {
        let userMap = {};
        users.forEach(function (user) {
            userMap[user._id] = user;
        });
        res.send(userMap);
    });
}

module.exports.update = (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, user) {
        if (err) return next(err);
        res.send('User udpated.');
    });
};

module.exports.delete = (req, res) => {
    User.findByIdAndRemove({
        _id: req.params.id
    }, function (err, book) {
        if (err) {
            res.send('Error deleting user');
        } else {
            console.log(book);
            res.send(book);
        }
    })
};
