<template>
    <div class="modal" v-show="visible">
      <div class="modal-content">
        <h2>Edit Image</h2>
        <label for="imageInput">Image URL:</label>
        <input id="imageInput" v-model="imageUrl" @input="autoAppendExtension" />
        <button @click="saveChanges">Save Changes</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        visible: false,
        imageUrl: '',
      };
    },
    methods: {
      open() {
        this.visible = true;
      },
      close() {
        this.visible = false;
      },
      autoAppendExtension() {
        // Automatically append ".jpg" to the URL
        if (this.imageUrl && !this.imageUrl.endsWith('.jpg')) {
          this.imageUrl += '.jpg';
        }
      },
      saveChanges() {
        // Implement your save changes logic here
        console.log('Saving changes...', this.imageUrl);
  
        // Emit an event to the parent component to pass the new image URL
        this.$emit('update-image', this.imageUrl);
  
        // Close the modal
        this.close();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Your modal styles go here */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
  }
  
  input {
    width: 100%;
    margin-bottom: 10px;
  }
  </style>
  