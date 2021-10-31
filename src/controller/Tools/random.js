//生成随机数的工具类
var express=require('express');

const GenerateID = function(e){
    var chars = ['0','1','2','3','4','5','6','7','8','9'];
    var res = ''
    for(let i = 0; i < e;i++){
        var num = Math.ceil(Math.random()*9);
        res += chars[num]
    }
    return res

}

module.exports={
    GenerateID
}
