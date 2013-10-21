var acfunCheckin = require('./lib');

var account = {
    username: 'username',
    password: 'password'
};

acfunCheckin.run(account, function (err, checkInfo) {
    if (err) {
        console.log(err);
    } else {
        console.log(checkInfo);
    }
});