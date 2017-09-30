const requestConfig = {
    // request_prefix: 'http://127.0.0.1',
    request_prefix:'http://192.168.107.33:9999',
    fetch_menu: '/fzzx/jjd/diclist', //初始化选择菜单
    fetch_list: '/fzzx/jjd/data/', //查询数据
    fetch_list_byid: '/fzzx/jjd/selectid?id=', //根据id查询数据
    del_case_byid: '/fzzx/jjd/deleteid?id=', //根据id删除一条记录
    edit: '/fzzx/jjd/edit', //编辑，id不为空就是更新
    valcode_img: '/kaptch', //验证码图片
    login_submit: '/login_submit', //登录
    fetch_mobile_info: '/fzzx/jjd/mobileAttribution?sj=', //获取手机号码归属地
    fetch_bankcard_info: '/fzzx/jjd/bankSearch?yhk=', //获取银行卡号归属信息
    fetch_statistics: '/fzzx/jjd/dataStatistical', //获取搜索结果
    fetch_analysis: '/fzzx/jjd/caseAnalysis' //案情描述分析
}

export { requestConfig }
