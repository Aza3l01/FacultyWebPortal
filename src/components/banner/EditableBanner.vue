<template>
  <div class="editable-banner-container">
    <div class="editable-banner">
      <img :src="imageUrl" alt="Profile" class="banner-image" @click="openEditModal">
      <EditModal ref="editModal" @update-image="updateImage" />
      <button v-if="isLoggedIn" class="edit-button" @click="openEditModal">✎</button>
    </div>
  </div>
</template>

<script>
import EditModal from '@/components//banner/EditModal.vue';
import axios from 'axios';
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      defaultImageUrl: 'https://imgur.com/UY0js48.jpg', // Replace with your default image path
      imageUrl: '', // Initial image URL
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState({
      token: (state) => state.token,
    }),
  },
  methods: {
    openEditModal() {
      this.$refs.editModal.open();
    },
    async fetchUserImage() {
      try {
        const response = await axios.get(`http://localhost:3000/image/${this.$route.params.id}`);
        if (response.data.length > 0) {
          this.imageUrl = response.data[0].imageUrl;
        } else {
          this.imageUrl = this.defaultImageUrl; // or handle no image case
        }
        console.log(response.data[0].imageUrl);
      } catch (error) {
        console.error('Error fetching user image:', error);
      }
    },
    async updateImage(newImageUrl) {
      this.imageUrl = newImageUrl;
      try {
        await axios.post('http://localhost:3000/image', {
          username: this.$route.params.id,
          imageUrl: newImageUrl,
        });
        console.log('Image URL saved successfully');
      } catch (error) {
        console.error('Error saving image URL:', error);
      }
    },
  },
  components: {
    EditModal,
  },
  mounted() {
    this.fetchUserImage();
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