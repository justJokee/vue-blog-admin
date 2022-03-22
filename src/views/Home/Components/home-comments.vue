<template>
  <div class="home-comments">
    <n-card title="最新留言" :bordered="false">
      <n-scrollbar>
        <div class="home-comments__content">
          <div class="home-comments__body">
            <div class="body-item" v-for="(comment, index) in newComments" :key="index">
              <div class="body-pic">
                <router-link :to="{ name: 'comments' }">
                  <img :src="comment.imgUrl" alt="" />
                </router-link>
              </div>
              <div class="body-info">
                <div class="body-info__title">
                  <router-link :to="{ name: 'comments' }">
                    {{ comment.content }}
                  </router-link>
                </div>
                <div class="body-info__name">{{ comment.name }}</div>
                <div class="body-info__date">发表于：{{ formatDate(comment.date) }}</div>
              </div>
            </div>
          </div>
        </div>
      </n-scrollbar>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { formatDate } from '@/utils/formatDate'
import { commentSchema } from '@/types/'
import api from '@/api/home'

const newComments = ref<commentSchema['res'][]>()

onMounted(async () => {
  const { data, status } = await api.getComments({
    page: 1,
    limit: 5
  })
  if (status === 200) {
    newComments.value = data
  }
})
</script>

<style lang="scss">
@import '@/style/';
.home-comments {
  width: 100%;
  height: 100%;
  &__body {
    .body-item {
      display: flex;
      padding: 8px 0;
    }
    .body-pic {
      flex: 0 0 auto;
      width: 60px;
      height: 60px;
      overflow: hidden;
      img {
        transition: all ease 0.38s;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      img:hover {
        transform: scale(1.2);
      }
    }
    .body-info {
      margin-left: 12px;
      &__title a {
        transition: all 0.38s ease-in-out;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      &__title:hover a,
      &__title:hover {
        @include themeify() {
          color: themed('color-ele-primary');
        }
      }
      &__name {
        @include themeify() {
          color: themed('color-home-article-detail');
        }
        font-size: 12px;
      }
      &__date {
        @include themeify() {
          color: themed('color-home-article-detail');
        }
        font-size: 12px;
        padding: 4px 0;
      }
    }
  }
}
</style>
