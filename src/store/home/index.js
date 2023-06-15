import { reqCategoryList,reqBanner,reqFloor } from "../../api"

// home模块的store
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}
const actions = {
    // 请求三级联动数据
    async categoryList({commit}){
        const result = await reqCategoryList()
        if(result.code === 200){
            commit('CATAGORYLIST', result.data)
        }
    },
    async getBanner({commit}){
        const result = await reqBanner()
        if(result.code === 200){
            commit('BANNERLIST', result.data)
        }
    },
    async getFloor({commit}){
        const result = await reqFloor()
        if(result.code === 200){
            commit('FLOORLIST', result.data)
        }
    }
}
const mutations = {
    CATAGORYLIST(state, categoryList){
        state.categoryList = categoryList
    },
    BANNERLIST(state, bannerList){
        state.bannerList = bannerList
    },
    FLOORLIST(state, floorList){
        state.floorList = floorList
    }
}
const getters = {}
export default{
    state,
    actions,
    mutations,
    getters
}
