<template>
  <ArticleList :articles="articles" />
</template>
<script>
import ArticleList from "../components/ArticleList";
import { mapGetters } from "vuex";

export default {
  components: {
    ArticleList
  },
  computed: {
    ...mapGetters({
      articles: "home/articles",
      profile: "users/profile"
    })
  },
  created() {
    this.$store.dispatch("home/getArticles", {
      author: this.profile.username,
      page: 1
    });
  }
};
</script>
