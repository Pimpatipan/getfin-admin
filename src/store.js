import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    asideShow: false,
    darkMode: false,
    globalLanguages: [],
    email:""
}

const mutations = {
    toggleSidebarDesktop(state) {
        const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
        state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile(state) {
        const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
        state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set(state, [variable, value]) {
        state[variable] = value
    },
    toggle(state, variable) {
        Vue.set(state, variable, !state[variable])
            // state[variable] = !state[variable]
    },
    setGlobalLanguages(state, list){
        list.forEach(item => {
            state.globalLanguages.push({...item});
        });
    },
    setEmail(state, val) {
        state.email = val
    },
}

export default new Vuex.Store({
    state,
    mutations
})