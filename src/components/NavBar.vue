<template>
    <div class="navbar">
      <button @click="goToHome" class="nav-button">Home</button>
      <button @click="doNothing" class="nav-button">Login</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goToHome() {
        window.location.href = 'https://www.nitpy.ac.in/';
      },
      doNothing() {
        console.log("Button does nothing");
      },
    },
    mounted() {
        document.body.style.margin = '0';
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    background-color: #616161;
    margin: 0; /* Remove margin */
    padding: 0; /* Remove padding */
  }
  
  .nav-button {
    background-color: #3e8687;
    border: none;
    color: #fff;
    padding: 10px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .nav-button:hover {
    background-color: #2c5f60; /* Darker Blue on hover */
  }
  </style>
  