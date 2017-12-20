
const spawn = require('child_process').spawn;

module.exports = {

    start: function (engine) {

        return spawn(engine);
    }

};