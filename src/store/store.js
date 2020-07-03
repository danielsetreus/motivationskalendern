import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        config: null,
    },
    mutations: {
        initialiseStore(state) {
            if(localStorage.getItem('mkConfig')) {
                this.replaceState(Object.assign(state, {
                    ...state,
                    config: JSON.parse(localStorage.getItem('mkConfig'))
                }));
            }
            console.log('Initilized store to', this.state)
        },
        setConfig (state, payload) {
            console.log('Set config to', payload)
            state.config = payload
        }
    }
})
