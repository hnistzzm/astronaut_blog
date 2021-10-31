
module.exports = {
    lintOnSave:false,
    devServer: {
    port: 8085,   
    proxy:{
      '/admin':{
        target:'http://localhost:9000',
        ws:true,
        changeOrigin:true,
        pathRewrite:{'^/admin':''}
      }
    }
  }
}

  