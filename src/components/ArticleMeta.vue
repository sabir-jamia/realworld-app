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
    <ArticleActions
      :article="article"
      :profile="profile"
      :canModify="isCurrentUser"
    />
  </div>
</template>

<script>
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import ArticleActions from "./ArticleActions";
import { mapGetters } from "vuex";

dayjs.extend(AdvancedFormat);

export default {
  name: "article-meta",
  components: { ArticleActions },
  props: ["article"],
  computed: {
    ...mapGetters({ currentUser: "users/currentUser" }),
    profile() {
      return this.article.author;
    },
    isCurrentUser() {
      return this.profile.username == this.currentUser.username;
    }
  },
  methods: {
    formatDate(dateString) {
      return dayjs(dateString).format("MMMM Do, YYYY");
    }
  }
};
</script>
