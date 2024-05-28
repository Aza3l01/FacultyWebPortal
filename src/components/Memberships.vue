<template>
    <div class="memberships">
      <div class="header-container">
        <h2 class="heading">Memberships of Professional Societies</h2>
        <div class="buttons">
          <button v-if="isLoggedIn" @click="toggleEditMode">{{ editMode ? 'Save' : '✎' }}</button>
          <button v-if="editMode" @click="addNewArea">+</button>
          <button v-if="editMode" @click="cancelEdit">Cancel</button>
        </div>
      </div>
      <ul>
        <li v-for="(area, index) in researchAreas" :key="index">
          <template v-if="editMode">
            <input type="text" v-model="researchAreas[index].researchAreas" class="edit-input" />
            <button @click="deletearea(area._id)">Delete</button>
          </template>
          <template v-else>
            <span>{{ area.researchAreas}}</span>
          </template>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { mapGetters, mapState } from "vuex";

  export default {
    data() {
      return {
        editMode: false,
        researchAreas: []
      };
    },
    computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState({
      token: (state) => state.token,
    }),
  },
    methods: {
      async toggleEditMode() {
        if (this.editMode) {
        try {
          await Promise.all(this.researchAreas.map(area => {
        if (area._id) {
          return axios.delete(`http://localhost:3000/Memberships/${area._id}`);
        }
        return Promise.resolve(); // Resolve for researchAreas without _id
      }));

      // Save all researchAreas
      await axios.post('http://localhost:3000/Memberships', {
        researchAreas: this.researchAreas.map(area => ({
          _id: area._id,
          researchAreas: area.researchAreas,
        }))
      }
      );

          this.fetchData();
        } catch (error) {
          console.error('Error saving researchAreas:', error);
        }
      }
        this.editMode = !this.editMode;
      },
      addNewArea() {
        if (this.editMode) {
        this.researchAreas.push({ researchAreas: '' });
      }
      },
      async fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/Memberships');
        this.researchAreas = response.data.map(area => ({
      _id: area._id,
      researchAreas: area.researchAreas,
    }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async deletearea(areaId) {
      try {
        await axios.delete(`http://localhost:3000/Memberships/${areaId}`);
        const index = this.researchAreas.findIndex((area) => area._id === areaId);
        this.researchAreas.splice(index, 1);
      } catch (error) {
        console.error('Error deleting area:', error);
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
  .memberships {
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
 