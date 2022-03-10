import { ref } from 'vue'

export function say(w: string) {
  return w
}
const a: demo = {
  a: '44'
}
export const obj = {
  say1: ref('555'),
  say2: ref('777'),
  e: a
}
