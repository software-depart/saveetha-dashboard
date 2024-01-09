const PROXY_CONFIG = [{
    context: ['/auth', '/restaurant', '/category', '/food-court', '/campus'],
    target: 'http://localhost:8081',
    changeOrigin: true,
    secure: false
}]
module.exports = PROXY_CONFIG