

const switchName = function(name){
    const re=/_(\w)/g;
    name=name.replace(re,function($0,$1){
      return $1.toUpperCase();
    });
    return name
}
module.exports = {
    switchName
}