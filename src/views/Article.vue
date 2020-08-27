<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <ArticleMeta :author="article.author" :createdAt="article.createdAt" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>
            {{ article.title }}
          </p>
          <h2 id="introducing-ionic">{{ article.description }}</h2>
          <p>{{ article.body }}</p>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :author="article.author" :createdAt="article.createdAt" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form @submit.prevent class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="activeComment"
              ></textarea>
            </div>
            <div class="card-footer">
              <img :src="article.author.image" class="comment-author-img" />
              <button @click="storeComment" class="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>
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

export default {
  name: "Article",
  components: { ArticleMeta, ArticleComment },
  data() {
    return { activeComment: "" };
  },
  computed: {
    ...mapGetters({
      article: "article/article",
      comments: "article/comments"
    }),
    slug() {
      return this.$route.params.slug;
    }
  },
  methods: {
    storeComment() {
      this.$store
        .dispatch("article/storeComment", {
          comment: { body: this.activeComment },
          slug: this.article.slug
        })
        .then(() => {
          this.activeComment = "";
        });
    }
  },
  created() {
    this.$store.dispatch("article/getArticle", this.slug).then(() => {
      this.$store.dispatch("article/getComments", this.article.slug);
    });
  }
};
</script>
