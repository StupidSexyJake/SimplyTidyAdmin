const withSize = require('next-size')
const withOptimizedImages = require('next-optimized-images')

module.exports = withSize(withOptimizedImages({
    serverRuntimeConfig: {
        HOST: '108.61.96.127',
        PORT: '3000',
        PGDATABASE: 'goldcoastmaids',
        PGHOST: '108.61.96.127',
        PGPORT: '5432',
        DBUSER: 'goldcoastmaids',
        PGPASSWORD: 'Bof9sd3i123zebra',
    },
    assetPrefix: '/admin'
}))