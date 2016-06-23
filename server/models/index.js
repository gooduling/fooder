var fs = require('fs');

fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        var model = require('./' + file);
        module.exports[model.modelName] = model;
    });