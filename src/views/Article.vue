<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :article="article" />
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div>
            <div v-html="parseMarkdown(article.body)"></div>
          </div>
        </div>
      </div>
      <hr />
      <div class="article-actions">
        <ArticleMeta :article="article" />
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <CommentEditor v-if="isAuthenticated" :article="article" />
          <p v-else>
            <router-link to="/login">Sign in</router-link> or
            <router-link to="/register">sign up</router-link> to add comments on
            this article.
          </p>
          <ArticleComment
            v-for="comment of comments"
            :key="comment.id"
            :comment="comment"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ArticleMeta from "../components/ArticleMeta";
import ArticleComment from "../components/ArticleComment";
import CommentEditor from "../components/CommentEditor";
import marked from "marked";

export default {
  name: "Article",
  components: { ArticleMeta, ArticleComment, CommentEditor },

  computed: {
    ...mapGetters({
      currentUser: "users/currentUser",
      isAuthenticated: "users/isAuthenticated",
      article: "article/article",
      comments: "article/comments"
    }),
    slug() {
      return this.$route.params.slug;
    }
  },
  created() {
    this.$store.dispatch("article/getArticle", this.slug).then(() => {
      this.$store.dispatch("article/getComments", this.article.slug);
    });
  },
  methods: {
    parseMarkdown(content = "") {
      return marked(content);
    }
  }
};
</script>
