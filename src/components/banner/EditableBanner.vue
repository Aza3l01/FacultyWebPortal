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
      defaultImageUrl: 'https://i.imgur.com/gTVVh3h.jpg', // Replace with your default image path
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
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
}

.editable-banner {
  position: relative;
  display: inline-block;
  width: 200px;
  height: 100%;
  overflow: hidden;
  border-radius: 5%;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

.edit-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 20px;
  background-color: #616161;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 15%;
}

button:hover {
  background-color: #2c5f60;
}

</style>