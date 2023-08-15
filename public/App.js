import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.14";

new Vue({
  el: "#app",
  data() {
    return {
      showLoginForm: true,
      formType: "Login",
      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        name: "",
        email: "",
        password: "",
      },
      // healthCondition: "Normal", // Replace with dynamic data from backend
    };
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
      this.formType = this.showLoginForm ? "Login" : "Signup";
    },
    async submitForm(event) {
      event.preventDefault();
      if (this.showLoginForm) {
        await this.login(event);
      } else {
        await this.signup(event);
      }
    },
    async login(event) {
      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.loginForm),
        });
        if (response.ok) {
          // Redirect to the portal.html page
          window.location.href = "userportal.html";
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
          window.location.href = "userportal.html";
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
