<template>
  <div class="navbar">
    <a href="https://www.nitpy.ac.in/" class="home-button">
      <img src="https://www.nitpy.ac.in/assets/images/logo.png" alt="Home">
    </a>
    <h2 class="head">Faculty Web Portal</h2>
    <button @click="doNothing" class="nav-button right">Login</button>
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
    // Add the following line to make the navbar sticky
    document.querySelector('.navbar').style.position = 'sticky';
  },
};
</script>

<style scoped>

.home-button {
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
}

.home-button img {
  max-height: 30px; /* Set the desired height for your home image */
}

.right {
  margin-left: auto;
}
.navbar {
  display: flex;
  justify-content: space-between;
  background-color: #3e8687;
  margin: 0; /* Remove margin */
  padding: 0; /* Remove padding */
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 100; /* Adjust the z-index as needed */
}

.nav-button {
  font-family:Arial, Helvetica, sans-serif;
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

.head {
  font-family:Arial, Helvetica, sans-serif;
  font-size: 16px; /* Set the desired font size */
  color: #fff; /* Set the desired text color */
}

</style>