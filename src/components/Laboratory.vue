<template>
    <div class="laboratory">
      <div class="header-container">
        <h2 class="heading">Laboratory Developed</h2>
        <div class="buttons">
          <button @click="toggleEditMode">{{ editMode ? 'Save' : '✎' }}</button>
          <button v-if="editMode" @click="addNewArea">+</button>
          <button v-if="editMode" @click="cancelEdit">Cancel</button>
        </div>
      </div>
      <ul>
        <li v-for="(area, index) in researchAreas" :key="index">
          <template v-if="editMode">
            <input type="text" v-model="researchAreas[index]" class="edit-input" />
          </template>
          <template v-else>
            <span>{{ area }}</span>
          </template>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        editMode: false,
        researchAreas: [
          'Artificial Intelligence and High-Performance Computing Lab, Powered by nVidia DGX A100 40GB Server',
        ]
      };
    },
    methods: {
      toggleEditMode() {
        if (this.editMode) {
          // Remove empty areas if they exist
          this.researchAreas = this.researchAreas.filter(area => area.trim() !== '');
          // You can add logic here to save changes to a database or perform other actions
        }
        this.editMode = !this.editMode;
      },
      addNewArea() {
        if (this.editMode) {
          this.researchAreas.push('');
          // If you have a default value for new areas, you can assign it here
        }
      },
      cancelEdit() {
        this.editMode = false;
        // You may want to reset the input values or revert changes if needed
      }
    }
  };
  </script>
  
  <style scoped>
  .laboratory {
    font-family:Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .header-container {
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: center;
    width: 100%;
    background-color: #c2d8d8;
    padding: 10px 20px;
    height: 70px;
    box-sizing: border-box; 
  }
  
  .heading {
    color: #3e8687;
    margin: 0;
    text-align: center;
  }
  
  .buttons {
    display: flex;
  }
  
  button {
    background: #616161;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #ffffff;
    border-radius: 15%;
    margin-left: 10px;
    margin-right: 5px;
  }
  
  button:hover {
    background-color: #2c5f60;
  }
  
  ul {
    list-style-type: none;
    padding: 25px;
    margin: 0;
    text-align: left; /* Change this line to align left */
  }
  
  
  li {
    margin-bottom: 10px;
  }
  
  .edit-input {
    width: 500px;
    padding: 5px;
    border-radius: 5px;
  }
  
  li {
    margin-bottom: 10px;
    list-style-type: disc; /* Add this line to set bullet points */
  }
  
  </style>