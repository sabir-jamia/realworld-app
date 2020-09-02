<template>
  <span v-if="canModify">
    <router-link
      :to="`/editor/${article.slug}`"
      :class="{ active: profile.following }"
      class="btn btn-sm btn-outline-secondary"
    >
      <i class="ion-edit"></i>
      &nbsp; EditArticle
    </router-link>
    &nbsp;&nbsp;
    <button
      @click="deleteArticle"
      :class="{ active: article.favorited }"
      class="btn btn-sm btn-outline-danger"
    >
      <i class="ion-trash-a"></i>
      &nbsp; Delete Article
    </button>
  </span>
  <span v-else>
    <button
      @click="toggleFollow"
      :class="{ active: profile.following }"
      class="btn btn-sm btn-outline-secondary"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      <span v-text="followUserLabel"></span>
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
import { mapGetters } from "vuex";
export default {
  name: "article-actions",
  props: ["article", "profile", "canModify"],
  methods: {
    toggleFavorite() {
      if (!this.isAuthenticaed) {
        return this.$router.push("/login");
      }
      const action = this.article.favorited
        ? "article/removeFavorite"
        : "article/addFavorite";
      this.$store.dispatch(action, { username: this.profile.username });
    },
    toggleFollow() {
      if (!this.isAuthenticaed) {
        return this.$router.push("/login");
      }
      const action = this.profile.following
        ? "profile/unfollow"
        : "profile/follow";
      this.$store.dispatch(action, { username: this.profile.username });
    },
    deleteArticle() {
      this.$store.dispatch("article/deleteArticle", this.article).then(() => {
        this.$router.push("/");
      });
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticaed: "users/isAuthenticated"
    }),
    followUserLabel() {
      return `${this.profile.following ? "Unfollow " : "Follow "} ${
        this.profile.username
      } `;
    }
  }
};
</script>
