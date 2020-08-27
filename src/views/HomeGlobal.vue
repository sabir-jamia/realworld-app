<template>
  <ArticleList :articles="articles"></ArticleList>
</template>
<script>
import ArticleList from "../components/ArticleList";
import { mapGetters } from "vuex";

export default {
  name: "home-global",
  components: { ArticleList },
  computed: {
    ...mapGetters({ articles: "home/articles" })
  },
  created() {
    this.$store.dispatch("home/getGlobalFeedArticles");
  }
};
</script>
