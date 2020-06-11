module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  devServer: {
    open: true, //浏览器自动打开页面
    host: "192.168.0.1", //如果是真机测试，就使用这个IP
    port: 8081,
    https: false,
    hotOnly: false, //热更新（webpack已实现了，这里false即可）
    proxy: {
      //配置跨域
      '/api': {
        target: "http://192.168.0.36/thinkphp/tp5.1/public/index.php/home/",
        ws:true,
        changOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
}

