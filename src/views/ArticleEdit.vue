<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keypress.enter="addToTagList"
                  v-model="currentTag"
                />
                <div class="tag-list">
                  <span
                    v-for="tag of article.tagList"
                    :key="tag"
                    class="tag-default tag-pill"
                  >
                    <i class="ion-close-round"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                @click="updateArticle"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "../store";

export default {
  name: "article-edit",
  data() {
    return { currentTag: null };
  },
  computed: {
    ...mapGetters({
      article: "article/article",
      isAuthenticated: "users/isAuthenticated"
    }),
    slug() {
      return this.$route.params.slug;
    }
  },
  async beforeRouteEnter(to, from, next) {
    console.log("BEFORE ENTER");
    const { slug } = to.params;
    store.dispatch("article/resetArticleState");
    if (slug) {
      await store.dispatch("article/getArticle", slug);
    }

    return next();
  },
  methods: {
    updateArticle() {
      this.$store.dispatch("article/updateArticle", this.article).then(() => {
        this.$router.push("/");
      });
    },
    addToTagList() {
      this.article.tagList.push(this.currentTag);
      this.currentTag = null;
    }
  }
};
</script>
