import { reqShopCart, reqDelete,reqChecked } from '../../api'
const state = {
    shopcartList:[]
}
const actions = {
    async getShopCart ({commit}){
        const result = await reqShopCart()
        if(result.code === 200){
            commit('GETSHOPCART', result.data)
        }
    },
    async deleteShopCart ({commit}, skuId){
        const result = await reqDelete(skuId)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async changeChecked ({commit}, {skuId, isChecked}){
        const result = await reqChecked(skuId, isChecked)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    deleteAllChecked({getters,dispatch}){
        let promiseAll = []
        getters.shopcartList.cartInfoList.forEach((item) => {
            let promise = item.isChecked == 1? dispatch('deleteShopCart',item.skuId):''
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    },
    changeAllChecked({getters,dispatch},checked){
        let promiseAll = []
        getters.shopcartList.cartInfoList.forEach((item) => {
            let promise = dispatch('changeChecked',{skuId: item.skuId, isChecked: checked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const mutations = {
    GETSHOPCART(state, shopcartList){
        state.shopcartList = shopcartList
    }
}
const getters = {
    shopcartList(state){
        return state.shopcartList[0] || {}
    }
}
export default{
    state,
    actions,
    mutations,
    getters
}