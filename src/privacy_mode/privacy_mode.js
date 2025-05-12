const fs = require('fs');
module.exports = p => fs.existsSync(p)&&fs.unlinkSync(p);
