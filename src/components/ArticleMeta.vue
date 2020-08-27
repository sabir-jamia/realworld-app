<template>
  <div class="article-meta">
    <router-link :to="`/@${author.username}`">
      <img :src="author.image" />
    </router-link>
    <div class="info">
      <router-link :to="`/@${author.username}`" class="author">
        {{ author.username }}
      </router-link>
      <span class="date">{{ formatDate(createdAt) }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary">
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{ author.username }} <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary">
      <i class="ion-heart"></i>
      &nbsp; Favorite Post <span class="counter">(29)</span>
    </button>
  </div>
</template>

<script>
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(AdvancedFormat);

export default {
  name: "article-meta",
  props: ["author", "createdAt"],
  methods: {
    formatDate(dateString) {
      return dayjs(dateString).format("MMMM Do, YYYY");
    }
  }
};
</script>
