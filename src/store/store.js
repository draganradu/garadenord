import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    grayscale: false,
    todaysImg: '',
  },
  mutations: {
    setGrayscale (state, grayscale) {
      localStorage.setItem('grayscale', grayscale)
      state.grayscale = grayscale
    },
    setTodaysImg (state, raw) {
      state.todaysImg = raw
    }
  },
  getters: {
    grayscale: state => state.grayscale,
    todaysImgTitle: state => state.todaysImg.split('_').join(' '),
    todaysImgurl: state => '/' + state.todaysImg,
    todaysImgraw: state => state.todaysImg,
  },
})
