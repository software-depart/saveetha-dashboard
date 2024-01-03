const PROXY_CONFIG = [{
    context: ['/auth'],
    target: 'https://ecommerce-9hcx.onrender.com',
    changeOrigin: true,
    secure: false
}]
module.exports = PROXY_CONFIG