<template>
  <ArticleList :articles="articles" />
</template>
<script>
import ArticleList from "../components/ArticleList";
import { mapGetters } from "vuex";

export default {
  name: "home-tag",
  components: {
    ArticleList
  },
  computed: {
    ...mapGetters({ articles: "home/articles" }),
    tag() {
      return this.$route.params.tag;
    }
  },
  created() {
    this.$store.dispatch("home/getArticles", { tag: this.tag });
  }
};
</script>
