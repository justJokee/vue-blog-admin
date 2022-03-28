import { InjectionKey } from 'vue'
import { createStore, Store, useStore as useBaseStore } from 'vuex'
import { categorySchema } from '@/types/'
import api from '@/api/news'
export interface State {
  userInfo: {
    name: string
    avator: string
  }
  unreadNewsTotal: number
  categories: categorySchema['res'][]
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    userInfo: {
      name: 'Marco',
      avator: 'https://avatars.githubusercontent.com/u/35912907?v=4'
    },
    categories: [],
    unreadNewsTotal: 0
  },
  mutations: {
    setCategories(state: State, categories: categorySchema['res'][]) {
      state.categories = categories
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
