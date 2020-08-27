<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <router-link :to="`/@${comment.author.username}`" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img" />
      </router-link>
      &nbsp;
      <router-link :to="`/@${comment.author.username}`" class="comment-author">
        {{ comment.author.username }}
      </router-link>
      <span class="date-posted">{{ formatDate(comment.createdAt) }}</span>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(AdvancedFormat);

export default {
  name: "article-comment",
  props: ["comment"],
  methods: {
    formatDate(dateString) {
      return dayjs(dateString).format("MMMM Do, YYYY");
    }
  }
};
</script>
