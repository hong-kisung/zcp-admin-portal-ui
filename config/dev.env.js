'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ZCP_ESTIMATE_BACKEND_SERVICE_HOST: '"localhost"',
  ZCP_ESTIMATE_BACKEND_SERVICE_PORT: '"8088"'
})
