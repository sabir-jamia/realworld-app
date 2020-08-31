<template>
  <div class="article-meta">
    <router-link :to="`/@${profile.username}`">
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link :to="`/@${profile.username}`" class="author">
        {{ profile.username }}
      </router-link>
      <span class="date">{{ formatDate(article.createdAt) }}</span>
    </div>
    <ArticleActions :article="article" :profile="profile" />
  </div>
</template>

<script>
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import ArticleActions from "./ArticleActions";

dayjs.extend(AdvancedFormat);

export default {
  name: "article-meta",
  components: { ArticleActions },
  props: ["article"],
  computed: {
    profile() {
      return this.article.author;
    }
  },
  methods: {
    formatDate(dateString) {
      return dayjs(dateString).format("MMMM Do, YYYY");
    }
  }
};
</script>
