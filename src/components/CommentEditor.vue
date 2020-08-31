<template>
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
</template>
<script>
export default {
  props: ["article"],
  data() {
    return { activeComment: "" };
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
  }
};
</script>
