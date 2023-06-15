import {reqAddress,reqOrder} from '../../api'
const state = {
    addressList:[],
    orderList:{}
}
const actions = {
    async getAddress ({commit}){
        const result = await reqAddress()
        if(result.code === 200){
            commit('GETADDRESS',result.data)
        }
    },
    async getOrder ({commit}){
        const result = await reqOrder()
        if(result.code === 200){
            commit('GETORDER',result.data)
        }
    }
}
const mutations = {
    GETADDRESS(state,addressList){
        state.addressList = addressList
    },
    GETORDER(state, orderList){
        state.orderList = orderList
    }
}
const getters = {}
export default{
    state,
    actions,
    mutations,
    getters
}