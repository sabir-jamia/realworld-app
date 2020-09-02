<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <div v-if="isCurrentUser">
              <router-link
                to="/settings"
                class="btn btn-sm btn-outline-secondary action-btn"
              >
                <i class="io-gear-a"></i>Edit Profile Settings
              </router-link>
            </div>
            <div v-else>
              <button
                @click="toggleFollow"
                class="btn btn-sm btn-outline-secondary action-btn"
              >
                <i class="ion-plus-round"></i>&nbsp;
                <span v-text="followUserLabel"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  exact-active-class="active"
                  :to="{ name: 'profile' }"
                >
                  My Articles
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  exact-active-class="active"
                  :to="{ name: 'profile-favorites' }"
                >
                  Favorited Articles
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters({
      currentUser: "users/currentUser",
      isAuthenticated: "users/isAuthenticated",
      profile: "profile/profile"
    }),
    isCurrentUser() {
      return this.profile.username == this.currentUser.username;
    },
    followUserLabel() {
      return `${this.profile.following ? "Unfollow" : "Follow"} ${
        this.profile.username
      }`;
    }
  },
  methods: {
    toggleFollow() {
      if (!this.isAuthenticated) {
        return this.$router.push("/login");
      }
      const action = this.profile.following
        ? "profile/unfollow"
        : "profile/follow";
      this.$store.dispatch(action, { username: this.profile.username });
    }
  },
  created() {
    this.$store.dispatch("profile/getProfile", this.$route.params);
  },
  watch: {
    $route(to) {
      this.$store.dispatch("profile/getProfile", to.params);
    }
  }
};
</script>
