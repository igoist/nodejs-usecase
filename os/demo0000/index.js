const log = console.log.bind(this);

const os = require('os');

log(os.arch());

// log(typeof os.EOL);

// log(os.constants);
// log(os.constants.signals);
// log(os.constants.errno);

// log(os.cpus());

// log(os.endianness());

// log(os.freemem());
// log(os.freemem() / 1024 / 1024);

// log(os.homedir());

// log(os.hostname());

// log(os.loadavg());

// log(os.networkInterfaces());

// log(os.platform());

// log(os.release());

// log(os.tmpdir());

log(os.totalmem());
log(os.totalmem() / 1024 / 1024 / 1024.0);

// log(os.type());

// log(os.uptime());
// log(os.uptime() / 60 / 60 / 24);

// log(os.userInfo());

