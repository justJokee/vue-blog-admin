<template>
  <div class="mp-home">
    <comp-layout :column="1">
      <div class="mp-home__left">
        <div class="mp-home__count">
          <home-count />
        </div>
        <div class="mp-home__device">
          <home-device />
        </div>
        <div class="mp-home__history">
          <home-history />
        </div>
      </div>
      <template #col-1>
        <div class="mp-home__right">
          <div class="mp-home__comments">
            <home-comments />
          </div>
          <div class="mp-home__site">
            <home-site />
          </div>
        </div>
      </template>
    </comp-layout>
  </div>
</template>

<script setup lang="ts">
import homeCount from './Components/home-count.vue'
import homeDevice from './Components/home-device.vue'
import homeHistory from './Components/home-history.vue'
import homeComments from './Components/home-comments.vue'
import homeSite from './Components/home-site.vue'
</script>

<style lang="scss">
.mp-home {
  height: 100%;
  &__left {
    height: 100%;
    .n-grid {
      height: 100%;
    }
    .n-card {
      height: 100%;
    }
  }
  &__right {
    height: 100%;
    .n-card {
      height: 100%;
    }
  }
  &__count {
    padding: 14px 0;
    height: 20%;
  }
  &__device {
    height: 40%;
    padding: 14px 0;
  }
  &__history {
    height: 40%;
    padding: 14px 0;
  }
  &__comments {
    padding: 14px 0;
    height: 60%;
    .n-card__content {
      overflow: hidden;
      padding-right: 4px;
    }
  }
  &__site {
    padding: 14px 0;
    height: 40%;
  }
}
</style>
