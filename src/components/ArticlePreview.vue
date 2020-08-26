<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link :to="`/@${article.author.username}`">
        <img :src="article.author.image" />
      </router-link>
      <div class="info">
        <router-link :to="`/@${article.author.username}`" class="author">
          {{ article.author.username }}
        </router-link>
        <span class="date">{{ formatDate(article.createdAt) }}</span>
      </div>
      <button class="btn btn-outline-primary btn-sm pull-xs-right">
        <i class="ion-heart"></i> 29
      </button>
    </div>
    <a href="" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.body }}</p>
      <span>Read more...</span>
    </a>
  </div>
</template>

<script>
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
// import { mapGetters } from "vuex";

dayjs.extend(AdvancedFormat);

export default {
  name: "ArticlePreview",
  props: ["article"],
  methods: {
    formatDate(dateString) {
      return dayjs(dateString).format("MMMM Do, YYYY");
    }
  },
  computed: {
    // ...mapGetters({ art: "users/username" })
  }
};
</script>
