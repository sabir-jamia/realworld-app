<template>
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
    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{ article.author.username }}
      <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button
      @click="toggleFavorite"
      :class="{ active: article.favorited }"
      class="btn btn-sm btn-outline-primary"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(AdvancedFormat);

export default {
  name: "article-meta",
  props: ["article"],
  methods: {
    formatDate(dateString) {
      return dayjs(dateString).format("MMMM Do, YYYY");
    },
    toggleFavorite() {
      if (this.article.favorited) {
        this.$store.dispatch("article/removeFavorite", {
          slug: this.article.slug
        });
      } else {
        this.$store.dispatch("article/addFavorite", {
          slug: this.article.slug
        });
      }
    }
  }
};
</script>
