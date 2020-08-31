<template>
  <span>
    <button
      @click="toggleFollow"
      :class="{ active: profile.following }"
      class="btn btn-sm btn-outline-secondary"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      {{ profile.following ? "Unfollow " : "Follow " + profile.username }}
    </button>
    &nbsp;&nbsp;
    <button
      @click="toggleFavorite"
      :class="{ active: article.favorited }"
      class="btn btn-sm btn-outline-primary"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Article
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </span>
</template>
<script>
export default {
  name: "article-actions",
  props: ["article", "profile"],
  methods: {
    toggleFavorite() {
      const action = this.article.favorited
        ? "article/removeFavorite"
        : "article/addFavorite";

      this.$store.dispatch(action, { username: this.profile.username });
    },
    toggleFollow() {
      const action = this.profile.following
        ? "profile/unfollow"
        : "profile/follow";
      this.$store.dispatch(action, { username: this.profile.username });
    }
  }
};
</script>
