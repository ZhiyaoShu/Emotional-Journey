// app.js
new Vue({
  el: "#app",
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
    login(event) {
      event.preventDefault();
      // Implement login logic here
      console.log("Login:", this.loginForm);
      // Reset the form
      this.loginForm.email = "";
      this.loginForm.password = "";
    },
    signup(event) {
      event.preventDefault();
      // Implement signup logic here
      console.log("Signup:", this.signupForm);
      // Reset the form
      this.signupForm.name = "";
      this.signupForm.email = "";
      this.signupForm.password = "";
    },
  },
});
