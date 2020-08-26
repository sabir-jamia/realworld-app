<template>
  <div>
    <ArticlePreview
      v-for="(article, index) of articles"
      :key="index"
      :article="article"
    ></ArticlePreview>
  </div>
</template>
<script>
import ArticlePreview from "./ArticlePreview";

export default {
  name: "ArticleList",
  components: {
    ArticlePreview
  },
  props: ["articles"]
};
</script>
