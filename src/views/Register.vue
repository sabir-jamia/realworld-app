<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href="">Have an account?</a>
          </p>

          <ul class="error-messages">
            <li v-for="(error, index) of errors" :key="index">
              {{ error.message }}
            </li>
          </ul>

          <form @submit.prevent>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
              />
            </fieldset>
            <button
              @click="storeUser()"
              class="btn btn-lg btn-primary pull-xs-right"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      errors: [],
      user: { username: "", email: "", password: "" }
    };
  },
  methods: {
    storeUser() {
      this.$store
        .dispatch("users/storeUser", { user: this.user })
        .then(() => {
          this.errors = [];
          this.$router.push("/login");
        })
        .catch(err => {
          this.errors.push(err);
        });
    }
  }
};
</script>
