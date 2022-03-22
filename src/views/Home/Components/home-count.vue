<template>
  <div class="home-count">
    <n-grid x-gap="24" :cols="4">
      <n-gi>
        <n-card :bordered="false">
          <div class="home-count__content">
            <div class="home-count__info">
              <div class="info-total">{{ count.total.article }}</div>
              <div class="info-name">文章总数</div>
            </div>
            <div class="home-count__icon icon-article">
              <i class="el-icon-document" />
            </div>
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :bordered="false">
          <div class="home-count__content">
            <div class="home-count__info">
              <div class="info-total">{{ count.total.visitor }}</div>
              <div class="info-name">注册用户</div>
            </div>
            <div class="home-count__icon icon-visitor">
              <i class="el-icon-s-custom" />
            </div>
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :bordered="false">
          <div class="home-count__content">
            <div class="home-count__info">
              <div class="info-total">{{ count.total.comment }}</div>
              <div class="info-name">文章评论</div>
            </div>
            <div class="home-count__icon icon-comments">
              <i class="el-icon-chat-dot-square" />
            </div>
          </div>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :bordered="false">
          <div class="home-count__content">
            <div class="home-count__info">
              <div class="info-total">{{ count.total.msgBoard }}</div>
              <div class="info-name">留言</div>
            </div>
            <div class="home-count__icon icon-msgboard">
              <i class="el-icon-chat-dot-round" />
            </div>
          </div>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { countSchema } from '@/types/'
import api from '@/api/home'
const count = reactive<countSchema['res']>({
  total: {
    article: '-',
    visitor: '-',
    comment: '-',
    msgBoard: '-'
  }
})
onMounted(async () => {
  const { data, status } = await api.count()
  if (status === 200) {
    count.total = data.total
  }
})
</script>

<style lang="scss">
.home-count {
  width: 100%;
  height: 100%;
  .n-card__content {
    display: flex;
    overflow: hidden;
    // justify-content: center;
  }
  &__content {
    padding: 0 28px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .info-total {
      font-size: 22px;
    }
    .info-name {
      margin-top: 12px;
    }
  }
  .icon-article {
    background: rgba(57, 157, 251, 0.2);
    color: rgba(57, 157, 251, 1);
  }
  .icon-visitor {
    background: rgba(181, 72, 198, 0.2);
    color: rgba(181, 72, 198, 1);
  }

  .icon-comments {
    background: rgba(255, 135, 0, 0.2);
    color: rgba(255, 135, 0, 1);
  }
  .icon-msgboard {
    background: rgba(34, 176, 125, 0.2);
    color: rgba(34, 176, 125, 1);
  }
  &__icon {
    flex: 0 0 auto;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    [class^='el-icon'] {
      font-size: 22px;
    }
  }
  &__info {
    .info-name,
    .info-total {
      transition: all 0.38s ease-in-out;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}
</style>
