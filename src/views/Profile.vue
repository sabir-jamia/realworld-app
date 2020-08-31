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
              <button class="btn btn-sm btn-outline-secondary action-btn">
                <i class="ion-plus-round"></i>
                &nbsp; Follow {{ profile.username }}
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
  created() {
    this.$store.dispatch("profile/getProfile", this.$route.params);
  },
  computed: {
    ...mapGetters({
      currentUser: "users/currentUser",
      profile: "profile/profile"
    }),
    isCurrentUser() {
      return this.profile.username == this.currentUser.username;
    }
  }
};
</script>
