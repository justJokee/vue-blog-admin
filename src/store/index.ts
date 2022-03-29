import { InjectionKey } from 'vue'
import { createStore, Store, useStore as useBaseStore } from 'vuex'
import { categorySchema, userSchema } from '@/types/'
import api from '@/api/news'
export interface State {
  userInfo: userSchema['res']
  unreadNewsTotal: number
  categories: categorySchema['res'][]
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    userInfo: {
      account: '',
      avatar: ''
    },
    categories: [],
    unreadNewsTotal: 0
  },
  mutations: {
    setCategories(state: State, categories: categorySchema['res'][]) {
      state.categories = categories
    },
    setUserInfo(state: State, info: userSchema['res']) {
      state.userInfo = info
    },
    removeUserInfo(state: State) {
      state.userInfo = {
        account: '',
        avatar: ''
      }
    }
  },
  actions: {
    // 获取未读消息
    async getUnreadNewsTotal({ state }) {
      const { status, total } = await api.getUnreadNewsTotal()
      if (status === 200) {
        state.unreadNewsTotal = total as number
      }
    }
  }
})

export function useStore() {
  return useBaseStore(key)
}
