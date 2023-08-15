import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HowItWorks },
  { path: "/about", component: AboutUs },
  { path: "/research", component: Research },
];

const router = new VueRouter({
  routes,
});

new Vue({
  el: "#app",
  router,
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        name: "",
        email: "",
        password: "",
      },
      healthCondition: "Normal", // Replace with dynamic data from backend
    };
  },
  methods: {
    async login(event) {
      event.preventDefault();
      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.loginForm),
        });
        if (response.ok) {
          this.$router.push("/");
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        console.error(error);
      }
      this.loginForm.email = "";
      this.loginForm.password = "";
    },
    async signup(event) {
      event.preventDefault();
      try {
        const response = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.signupForm),
        });
        if (response.ok) {
          this.$router.push("/");
        } else {
          console.error("Signup failed");
        }
      } catch (error) {
        console.error(error);
      }
      this.signupForm.name = "";
      this.signupForm.email = "";
      this.signupForm.password = "";
    },
  },
});
