<template>
    <div class="home">
        <TypeNav/>
        <ListContainer/>
        <TodayRecommend/>
        <Rank/>
        <Like/>
        <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"/>
        <Brand/>
    </div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import { mapState } from 'vuex'
export default {
    components:{
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    mounted(){
        this.$store.dispatch('getFloor')
        this.$store.dispatch('getUserInfo')
    },
    computed:{
        ...mapState({
            floorList: (state) => state.home.floorList,
        })
    }
}
</script>

<style>

</style>