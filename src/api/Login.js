import fetch from 'src/util/fetch'
export function loginByUserName(params) {

    return fetch({
        url: '/login_submit',
        method: 'post',
        data: params
    })
}
