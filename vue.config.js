const devConfig = require('./build/webpack.dev');
const buildConfig = require('./build/webpack.prod');

module.exports = process.env.NODE_ENV === 'development' ? devConfig : buildConfig;