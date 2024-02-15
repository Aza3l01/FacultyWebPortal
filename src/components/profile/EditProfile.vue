<template>
    <div class="modal" v-show="visible">
      <div class="modal-content">
        <h2>Edit Profile</h2>
        <label for="profileImageInput">Profile Picture URL:</label>
        <input id="profileImageInput" v-model="profileImageUrl" @input="autoAppendExtension" />
        <label for="profileNameInput">Profile Name:</label>
        <input id="profileNameInput" v-model="profileName" />
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
        profileImageUrl: '',
        profileName: '',
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
        // Automatically append ".jpg" to the profile picture URL
        if (this.profileImageUrl && !this.profileImageUrl.endsWith('.jpg')) {
          this.profileImageUrl += '.jpg';
        }
      },
      saveChanges() {
        // Implement your save changes logic here
        console.log('Saving changes...', this.profileImageUrl, this.profileName);
  
        // Emit an event to the parent component to pass the new profile information
        this.$emit('update-profile', {
          imageUrl: this.profileImageUrl,
          name: this.profileName,
        });
  
        // Close the modal
        this.close();
      },
      cancel() {
        // Clear the inputs and close the modal without saving changes
        this.profileImageUrl = '';
        this.profileName = '';
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
    margin-bottom: 20px;
  }
  
  .input-container input {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .button-container button {
    width: 48%;
    background-color: #2c5f60;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  