// search模块的store
import {reqSearch} from '../../api/index'
const state = {
    searchList : {}
}
const actions = {
    async getSearchList ({commit}, params = {}){
        const result = await reqSearch(params)
        if(result.code === 200){
            commit('GETRESEARCHLIST', result.data)
        }
    }
}
const mutations = {
    GETRESEARCHLIST(state, searchList){
        state.searchList = searchList
    }
}
const getters = {
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    }
}
export default{
    state,
    actions,
    mutations,
    getters
}
