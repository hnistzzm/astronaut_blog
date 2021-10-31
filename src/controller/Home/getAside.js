const sendMenu = async function(req,res){
    const responce = {}
    const data = {}
    const meta = {}
    const menuList = [
        {id:'1',path:'',authName:'用户管理',children:[
            {id:'101',path:'/userManage',authName:'用户管理',children:[

            ]}
        ]},
        {id:'2',path:'',authName:'博客管理',children:[
            {id:'201',path:'/blogManage',authName:'博客管理',children:[
                
            ]},
            {id:'201',path:'/blogManage',authName:'推荐管理',children:[
                
            ]}
        ]},
    ]
    const menuIcon = {'1':'el-icon-user-solid','2':'el-icon-s-order'}
    data['menuList'] = menuList
    data['menuIcon'] = menuIcon
    meta['status'] = 201
    responce['data'] = data
    responce['meta'] = meta
    res.send(responce)

}
module.exports = sendMenu