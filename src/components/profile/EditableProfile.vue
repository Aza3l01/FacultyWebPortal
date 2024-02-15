<template>
    <div class="editable-profile-container">
      <div class="editable-profile">
        <img :src="profileImageUrl || defaultProfileImageUrl" alt="Profile Picture" class="profile-image" @click="openEditModal">
        <EditModal ref="editModal" @update-image="updateProfileImage" />
        <button class="edit-button" @click="openEditModal">✎</button>
      </div>
    </div>
  </template>
  
  <script>
  import EditModal from '@/components/banner/EditProfile.vue';
  
  export default {
    data() {
      return {
        defaultProfileImageUrl: 'https://imgur.com/gTVVh3h.jpg',
        profileImageUrl: '', // Initial profile image URL
      };
    },
    methods: {
      openEditModal() {
        this.$refs.editModal.open();
      },
      updateProfileImage(newImageUrl) {
        this.profileImageUrl = newImageUrl;
      },
    },
    components: {
      EditModal,
    },
  };
  </script>
  
  <style scoped>
  .editable-profile-container {
    width: 200px; /* Set the width of the profile picture container */
    height: 200px; /* Set the height of the profile picture container */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .editable-profile {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    color: #007bff;
  }
  </style>
  