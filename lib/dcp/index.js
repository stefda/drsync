yaml = require('js-yaml');
fs = require('fs');

module.exports = {
  parse: function (options) {
    const dockerComposeFile = options.file;
    const serviceName = options.service;
    if (!fs.existsSync(dockerComposeFile)) {
      throw new Error(`docker-compose file ${dockerComposeFile} doesn't exit`);
    }

    // find docker compose
    const dockerCompose = yaml.safeLoad(fs.readFileSync(dockerComposeFile, 'utf8'));
    if (!dockerCompose.services) {
      throw new Error(`no services found in ${dockerComposeFile}`);
    }
    if (!dockerCompose.services[serviceName]) {
      throw new Error(`service ${serviceName} not found in ${dockerComposeFile}`);
    }

    let service = dockerCompose.services[serviceName];
    if (!service.ports) {
      throw new Error(`service ${serviceName} doesn't have any open ports, open port 873 to allow drsync connect`);
    }

    let port = service.ports.reduce((port, ports) => {
      let match = ports.match(/(\d+):(\d+)/);
      if (match && match[2] === '873') {
        return match[1];
      }
      return port;
    }, null);

    if (!port) {
      throw new Error(`service ${serviceName} doesn't have port 873 open and so won't allow drsync to connect`);
    }

    return Object.assign({}, options, { port });
  }
};
