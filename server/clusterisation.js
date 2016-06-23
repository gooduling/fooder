require('dotenv').load();

var env = process.env.NODE_ENV;
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var log = function () {
    console.log.apply(console, arguments);
}

if (cluster.isMaster) {
    log('This is the master process');

    for (var i = 0; i < numCPUs; i++)
    {
        cluster.fork();
    }

    cluster
        .on('exit', function(worker)
        {
            error(worker.process.pid + ' died');
            cluster.fork();
        })

        .on('online', function(worker) {
            log('Worker ' + worker.process.pid + ' has been spinned');
        });

} else {
    require('./app');
}