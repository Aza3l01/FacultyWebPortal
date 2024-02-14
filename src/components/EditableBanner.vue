<template>
    <div class="editable-banner">
      <img :src="imageUrl || defaultImageUrl" alt="Banner Image" class="banner-image" @click="openEditModal">
      <EditModal ref="editModal" @update-image="updateImage" />
      <button class="edit-button" @click="openEditModal">✎</button>
    </div>
  </template>
  
  <script>
  import EditModal from '@/components/EditModal.vue';
  
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
  .editable-banner {
    position: relative;
    display: inline-block;
  }
  
  .banner-image {
    width: 100%;
    height: auto;
    cursor: pointer;
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
  