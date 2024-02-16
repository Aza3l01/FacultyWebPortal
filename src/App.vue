<script setup>
import NavBar from './components/NavBar.vue';
import EditableBanner from './components/banner/EditableBanner.vue';
import Details from './components/Details.vue';
import Experience from './components/Experience.vue';
import Research from './components/Research.vue';
import Academic from './components/Academic.vue';
</script>

<template>
  <div>
    <NavBar />
    <EditableBanner />
    <Details />
    <Experience />
    <Research />
    <Academic />
  </div>
</template>

<style scoped>
body {
  margin: 0;
  font-family:Arial, Helvetica, sans-serif;
}
</style>
