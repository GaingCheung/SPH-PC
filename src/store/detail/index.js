import {reqDetail, reqAddSku} from '../../api'
import {getUUID} from '../../utils/uuid_token.js'
const state = {
    detailList:{},
    uuid_token: getUUID()
}
const actions = {
    async getDetail({commit}, skuId){
        const result = await reqDetail(skuId)
        if(result.code === 200){
            commit('GETDETAIL', result.data)
        }
    },
    async addSku({commit}, {skuId, skuNum} ){
        const result = await reqAddSku(skuId, skuNum)
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    GETDETAIL(state, detailList){
        state.detailList = detailList
    }
}
const getters = {
    categoryView(state){
        return state.detailList.categoryView || {}
    },
    skuInfo(state){
        return state.detailList.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.detailList.spuSaleAttrList || []
    }
}
export default{
    state,
    actions,
    mutations,
    getters
}