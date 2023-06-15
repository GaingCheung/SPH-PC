import {reqPhoneCode, reqRegisterUser,reqLogin,reqUserInfo, reqLogout} from '../../api'
const state = {
    code: '',
    token: localStorage.getItem("TOKEN"),
    userInfo: {}
}
const actions = {
    async getPhoneCode ({ commit }, phone){
        const result = await reqPhoneCode(phone)
        if(result.code === 200){
            commit('GETPHONECODE', result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async registerUser ({commit}, data){
        const result = await reqRegisterUser(data)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async loginToken ({commit}, data){
        const result = await reqLogin(data)
        if(result.code === 200){
            commit('LOGINTOKEN', result.data.token)
            localStorage.setItem('TOKEN', result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async getUserInfo ({commit}){
        const result = await reqUserInfo()
        if(result.code === 200){
            commit('GETUSERINFO', result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async logout ({commit}){
        const result = await reqLogout()
        if(result.code === 200){
            commit('LOGOU')
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    GETPHONECODE(state, code){
        state.code = code
    },
    LOGINTOKEN(state, token){
        state.token = token
    },
    GETUSERINFO(state, userInfo){
        state.userInfo = userInfo
    },
    LOGOU(state){
        state.token = ''
        state.userInfo = {}
        localStorage.removeItem("TOKEN")
    }
}
const getters = {}
export default{
    state,
    actions,
    mutations,
    getters
}