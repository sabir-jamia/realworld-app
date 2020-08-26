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
      articles: "articles/articles",
      profile: "users/profile"
    })
  },
  created() {
    this.$store.dispatch("articles/getArticles", {
      page: 1,
      favorited: this.profile.username
    });
  }
};
</script>
