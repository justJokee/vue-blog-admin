import { ref } from "vue";

export function say(w: string) {
  return w;
}

export const obj = {
  say1: ref("555"),
  say2: ref("777"),
};
