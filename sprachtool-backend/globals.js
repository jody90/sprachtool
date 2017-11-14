const ARGS = process.argv.slice(2);

switch (ARGS[0]) {
    case "codeninja" :
        var sshPrivateKeyPath = '/data/ssh/id_rsa'
        var host = '10.255.48.21';
        var username = 'sortimo';
        var pathTest = '/cache/sprachtool/test';
        var pathLive = '/cache/sprachtool/live';
        var mongoUrl = 'mongodb://mongodb:27017/myproject';
    break;
    case "codeninja-dev" :
        var sshPrivateKeyPath = '/data/ssh/id_rsa'
        var host = '10.255.48.21';
        var username = 'sortimo';
        var pathTest = '/cache/sprachtool/test';
        var pathLive = '/cache/sprachtool/live';
        var mongoUrl = 'mongodb://mongodb-dev/myproject-dev';
    break;
    case "local" :
        var sshPrivateKeyPath = '';
        var host = '165.227.163.32';
        var username = 'root';
        var pathTest = '/var/www/html/test';
        var pathLive = '/var/www/html/live';
        var mongoUrl = 'mongodb://172.22.2.159:27018/myproject-dev';
    case "localhost" :
        var sshPrivateKeyPath = '';
        var host = 'localhost';
        var username = 'root';
        var pathTest = '/var/www/html/test';
        var pathLive = '/var/www/html/live';
        var mongoUrl = 'mongodb://mongodb:27017/sprachtool';
    break;
    default:

}

var Globals = {
    url: mongoUrl,
    sshPrivateKeyPath: sshPrivateKeyPath,
    sshDestinations: {
        test: {
            host: host,
            username: username,
            path: pathTest
        },
        live: {
            host: host,
            username: username,
            path: pathLive
        }
    }
}

module.exports = Globals;
