<template>
  <div class="modal" v-show="visible">
    <div class="modal-content">
      <h2>Edit Image</h2>
      <label for="imageInput">Image URL:</label>
      <input id="imageInput" v-model="imageUrl" />
      <div class="button-container">
        <button @click="saveChanges">Save Changes</button>
        <button @click="cancel">Cancel</button>
      </div>
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
    
    saveChanges() {
      // Implement your save changes logic here
      console.log('Saving changes...', this.imageUrl);

      // Emit an event to the parent component to pass the new image URL
      this.$emit('update-image', this.imageUrl);

      // Close the modal
      this.close();
    },
    cancel() {
      // Clear the input and close the modal without saving changes
      this.imageUrl = '';
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

.input-container {
  margin-bottom: 20px; /* Increased margin between URL input and buttons */
  margin-bottom: 20px; /* Padding between URL input and buttons */
}

.input-container input {
  width: 100%;
  margin-bottom: 10px;
  padding: 20px; /* Padding for the input */
}

.button-container {
  display: flex;
  justify-content: space-between; /* Spacing between buttons */
}

.button-container button {
  width: 48%; /* Adjusted width to fit buttons within the modal */
  background-color: #2c5f60; /* Dark green color */
  color: #fff; /* White text color */
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

</style>

