<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="index.html">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link to="/" class="nav-link active">Home</router-link>
        </li>
        <li v-if="username" class="nav-item">
          <router-link to="/new-post" class="nav-link">
            <i class="ion-compose"></i>&nbsp;New Post
          </router-link>
        </li>
        <li v-if="username" class="nav-item">
          <router-link to="/settings" class="nav-link">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li v-if="username == null" class="nav-item">
          <router-link to="/login" class="nav-link">Sign in</router-link>
        </li>
        <li v-if="username == null" class="nav-item">
          <router-link to="/register" class="nav-link">Sign up</router-link>
        </li>
        <li v-if="username" class="nav-item">
          <router-link :to="`/@${username}`" class="nav-link">
            {{ username }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    username() {
      return this.$store.getters["users/username"];
    }
  }
};
</script>
