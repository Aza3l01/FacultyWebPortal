<template>
  <div>
    <div class="h1-container">
      <h1 class="h1">LOGIN</h1>
    </div>
    <form @submit="login" class="form">
      <input v-model="username" placeholder="Username" class="input" />
      <br />
      <br />
      <input v-model="password" placeholder="Password" type="password" class="input" />
      <br />
      <br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    async login(e) {
      e.preventDefault();
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });
      const { user, token } = await response.json();
      this.setUser(user);
      this.setToken(token);
      if(response.ok===false){
        alert("Invalid login information")
      }
      this.$router.push("/"+this.username);
    },
  },
};
</script>

<style scoped>
    body {
      font-family: Arial, Helvetica, sans-serif;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .h1 {
      color: #3e8687;
      text-align: center;
    }

    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .input {
      width: 250px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 16px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    button {
      background: #616161;
      border: none;
      cursor: pointer;
      font-size: 18px;
      color: #ffffff;
      border-radius: 5%;
      padding: 10px 20px;
    }

    button:hover {
      background-color: #2c5f60;
    }
  </style>