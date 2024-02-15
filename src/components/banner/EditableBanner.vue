<template>
  <div class="editable-banner-container">
    <div class="editable-banner">
      <img :src="imageUrl || defaultImageUrl" alt="Banner Image" class="banner-image" @click="openEditModal">
      <EditModal ref="editModal" @update-image="updateImage" />
      <button class="edit-button" @click="openEditModal">✎</button>
    </div>
  </div>
</template>

<script>
import EditModal from '@/components//banner/EditModal.vue';

export default {
  data() {
    return {
      defaultImageUrl: 'https://i.imgur.com/bruuczo.jpg', // Replace with your default image path
      imageUrl: '', // Initial image URL
    };
  },
  methods: {
    openEditModal() {
      this.$refs.editModal.open();
    },
    updateImage(newImageUrl) {
      this.imageUrl = newImageUrl;
    },
  },
  components: {
    EditModal,
  },
};
</script>

<style scoped>
.editable-banner-container {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.editable-banner {
  position: relative;
  display: inline-block;
  height: 100%; /* Set the height to 100% to limit the vertical space */
  overflow: hidden; /* Hide content that overflows the container */
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cut off and cover the container */
  cursor: pointer;
  object-fit: cover; /* Crop the image to cover the container */
  object-position: center
}

.edit-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #007bff; /* Change color as needed */
}
</style>