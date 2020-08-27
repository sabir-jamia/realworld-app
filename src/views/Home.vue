<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="true" class="nav-item">
                <router-link
                  :to="{ name: 'home-my-feed' }"
                  exact-active-class="active"
                  class="nav-link"
                >
                  Your Feed
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'home' }"
                  exact-active-class="active"
                  class="nav-link"
                >
                  Global Feed
                </router-link>
              </li>
              <li v-if="currentTag" class="nav-item">
                <router-link
                  :to="{ name: 'home-tag' }"
                  exact-active-class="active"
                  class="nav-link"
                >
                  #{{ currentTag }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <router-link
                v-for="tag of tags"
                :key="tag"
                :to="`/feed/${tag}`"
                class="tag-pill tag-default"
              >
                {{ tag }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapGetters({ username: "users/username", tags: "home/tags" }),
    currentTag() {
      return this.$route.params.tag;
    }
  },
  created() {
    this.$store.dispatch("home/getTags");
  }
};
</script>
