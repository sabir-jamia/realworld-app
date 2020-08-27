<template>
  <ArticleList :articles="articles" />
</template>
<script>
import ArticleList from "../components/ArticleList";
import { mapGetters } from "vuex";

export default {
  name: "home-my-feed",
  components: { ArticleList },
  computed: {
    ...mapGetters({ articles: "home/articles" })
  },
  created() {
    this.$store.dispatch("home/getUserFeedArticles");
  }
};
</script>
