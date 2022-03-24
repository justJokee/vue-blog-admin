import { InjectionKey } from 'vue'
import { createStore, Store, useStore as useBaseStore } from 'vuex'
import { categorySchema } from '@/types/'
export interface State {
  userInfo: {
    name: string
    avator: string
  }
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
    categories: []
  },
  mutations: {
    setCategories(state: State, categories: categorySchema['res'][]) {
      state.categories = categories
    }
  }
})

export function useStore() {
  return useBaseStore(key)
}
