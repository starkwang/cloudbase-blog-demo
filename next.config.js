//next.config.js
const withLess = require('@zeit/next-less')
module.exports = withLess({
    webpack: function (config, { isServer }) {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty'
            }
        }
        return config
    },
})