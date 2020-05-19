module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer:{
        port: '8087',
        proxy: {
            '/api': {
                target: 'http://localhost:8086/api',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
}
