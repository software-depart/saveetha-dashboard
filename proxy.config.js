const PROXY_CONFIG = [{
    context: ['/auth', '/restaurant'],
    target: 'http://localhost:8081',
    changeOrigin: true,
    secure: false
}]
module.exports = PROXY_CONFIG