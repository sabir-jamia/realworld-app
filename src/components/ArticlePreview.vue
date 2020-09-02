<template>
  <div class="article-preview">
    <div class="article-meta">
      <router-link :to="`/@${author.username}`">
        <img :src="author.image" />
      </router-link>
      <div class="info">
        <router-link :to="`/@${author.username}`" class="author">
          {{ author.username }}
        </router-link>
        <span class="date">{{ formatDate(article.createdAt) }}</span>
      </div>
      <button
        @click="toggleFavorite"
        :class="{
          'btn-primary': article.favorited,
          'btn-outline-primary': !article.favorited
        }"
        class="btn btn-sm pull-xs-right"
      >
        <i class="ion-heart"></i> {{ article.favoritesCount }}
      </button>
    </div>
    <router-link :to="`/articles/${article.slug}`" class="preview-link">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
    </router-link>
  </div>
</template>

<script>
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import { mapGetters } from "vuex";

dayjs.extend(AdvancedFormat);

export default {
  name: "ArticlePreview",
  props: ["article"],
  computed: {
    ...mapGetters({ isAuthenticated: "users/isAuthenticated" }),
    author() {
      return this.article.author;
    }
  },
  methods: {
    formatDate(dateString) {
      return dayjs(dateString).format("MMMM Do, YYYY");
    },
    toggleFavorite() {
      if (!this.isAuthenticated) {
        return this.$router.push("/login");
      }

      const action = this.article.favorited
        ? "article/removeFavorite"
        : "article/addFavorite";
      this.$store.dispatch(action, this.article);
    }
  }
};
</script>
