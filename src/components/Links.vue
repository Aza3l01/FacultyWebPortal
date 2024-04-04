<template>
    <div class="links">
      <div class="header-container">
        <h2 class="heading">Other Links</h2>
        <div class="buttons">
          <button @click="toggleEditMode">{{ editMode ? 'Save' : '✎' }}</button>
          <button v-if="editMode" @click="addNewLink">+</button>
          <button v-if="editMode" @click="cancelEdit">Cancel</button>
        </div>
      </div>
      <ul>
        <li v-for="(link, index) in links" :key="index">
          <template v-if="editMode">
            <input type="text" v-model="link.title" placeholder="Link Title" class="edit-input" />
            <input type="text" v-model="link.url" placeholder="Link URL" class="edit-input" />
          </template>
          <template v-else>
            <a :href="link.url" target="_blank">{{ link.title }}</a>
          </template>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Datepicker from 'vue3-datepicker';
  
  export default {
    components: {
      Datepicker
    },
    data() {
      return {
        editMode: false,
        links: []
      };
    },
    methods: {
      async toggleEditMode() {
  this.editMode = !this.editMode;
  if (!this.editMode) {
    try {
      // Delete all existing links
      await Promise.all(this.links.map(link => {
        if (link._id) {
          return axios.delete(`http://localhost:3000/Links/${link._id}`);
        }
        return Promise.resolve(); // Resolve for links without _id
      }));

      // Save all links
      await axios.post('http://localhost:3000/Links', {
        Links: this.links.map(link => ({
          _id: link._id,
          title: link.title,
          url: link.url,
        }))
      }
      );

      this.fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
},

addNewLink() {
        if (this.editMode) {
          this.links.push({
            title: '',
            url: '',
          });
        }
      },
      formatDate(date) {
        return date.getFullYear().toString();
},
async fetchData() {
  try {
    const response = await axios.get('http://localhost:3000/Links');
    this.links = response.data.map(link => ({
      _id: link._id,
      title: link.title,
      url: link.url,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
},
    async deleteDetail(detailId) {
      try {
        console.log(detailId);
        await axios.delete(`http://localhost:3000/Links/${detailId}`);
        const index = this.links.findIndex((link) => link._id === detailId);
        this.links.splice(index, 1);
      } catch (error) {
        console.error('Error deleting detail:', error);
      }
    },
    cancelEdit() {
        this.fetchData();
        this.editMode = false;
      }
    },
    mounted() {
    this.fetchData(); 
  }
  };
  </script>
  <style scoped>
  /* Your existing styles */
  
  .links {
    font-family: Arial, Helvetica, sans-serif;
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
    text-align: center; /* Change this line to align left */
  }
  
  li {
    margin-bottom: 10px;
  }
  
  .edit-input {
    width: 500px;
    padding: 5px;
    border-radius: 5px;
  }
  
  a {
    text-decoration: none;
    color: #3e8687;
  }
  
  /* Your existing styles */
  </style>
  