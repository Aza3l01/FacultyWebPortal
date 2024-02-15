<script setup>
import NavBar from './components/NavBar.vue';
import EditableBanner from './components/banner/EditableBanner.vue';
import EditableProfile from './components/profile/EditProfile.vue';
</script>

<template>
  <div>
    <NavBar />
    <EditableBanner />
    <EditableProfile />
  </div>
</template>

<style scoped>
body {
  margin: 0;
}
</style>
