<template>
    <div class="dresponsibilities">
      <div class="header-container">
        <h2 class="heading">Department Responsibilities</h2>
        <div class="buttons">
          <button v-if="isLoggedIn" @click="toggleEditMode">{{ editMode ? 'Save' : '✎' }}</button>
          <button v-if="editMode" @click="addNewExperience">+</button>
        </div>
      </div>
      <ul>
        <li v-for="(experience, index) in experiences" :key="index">
          <template v-if="editMode">
            <input type="text" v-model="experience.designation" class="edit-input" placeholder="Designation"  />
            <datepicker v-model="experience.fromDate" class="date-picker" placeholder="From Date" :config="{ format: 'dd/MM/yyyy' }" :editable="true"></datepicker>
            <datepicker v-model="experience.toDate" class="date-picker" placeholder="Till Date" :config="{ format: 'dd/MM/yyyy' }" :editable="true"></datepicker>
            <button @click="deleteDetail(experience._id)">Delete</button>
          </template>
          <template v-else>
            <span>{{ experience.designation }}, {{ formatDate(experience.fromDate)}} - {{ formatDate(experience.toDate) }}</span>
          </template>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Datepicker from 'vue3-datepicker';
  import { mapGetters, mapState } from "vuex";

  export default {
    components: {
      Datepicker
    },
    data() {
      return {
        editMode: false,
        experiences: []
      };
    },computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState({
      token: (state) => state.token,
    }),
  },
    methods: {
      async toggleEditMode() {
  this.editMode = !this.editMode;
  if (!this.editMode) {
    try {
      // Delete all existing experiences
      await Promise.all(this.experiences.map(experience => {
        if (experience._id) {
          return axios.delete(`http://localhost:3000/Dresponsibilities/${experience._id}`);
        }
        return Promise.resolve(); // Resolve for experiences without _id
      }));

      // Save all experiences
      await axios.post('http://localhost:3000/Dresponsibilities', {
        dresponsibilities: this.experiences.map(experience => ({
          _id: experience._id,
          username:this.$route.params.id,
          designation: experience.designation,
          fromDate: experience.fromDate,
          toDate: experience.toDate
        }))
      }
      );

      this.fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
},

      addNewExperience() {
        if (this.editMode) {
          this.experiences.push({
            designation: '',
          });
        }
      },
      formatDate(date) {
        if (!date || date === 'Invalid Date') {
        return 'Present';
      }
      
        const formattedDate = new Date(date);
        if (isNaN(formattedDate)) {
        return 'Present';
      }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return formattedDate.toLocaleDateString('en-US', options); 
},
async fetchData() {
  try {
    const response = await axios.get(`http://localhost:3000/Dresponsibilities/${this.$route.params.id}`);
    this.experiences = response.data.map(experience => ({
      _id: experience._id,
      designation: experience.designation,
      fromDate: new Date(experience.fromDate),
      toDate: experience.toDate? new Date(experience.toDate):null
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
},
    async deleteDetail(detailId) {
      try {
        console.log(detailId);
        await axios.delete(`http://localhost:3000/Dresponsibilities/${detailId}`);
        const index = this.experiences.findIndex((experience) => experience._id === detailId);
        this.experiences.splice(index, 1);
      } catch (error) {
        console.error('Error deleting detail:', error);
      }
    }
    },
    mounted() {
    this.fetchData(); 
  }
  };
  </script>
  
  <style scoped>
  .dresponsibilities {
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
    padding: 10px 20px; /* Padding for the heading */
    height: 70px;
    margin-top: 15px;
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
    list-style-type: disc;
    padding: 25px;
    margin: 0;
    text-align: left;
  }
  
  
  li {
    margin-bottom: 10px;
  }
  
  .edit-input {
    width: 500px;
    padding: 5px;
    border-radius: 5px;
  }
  
  .edit-input::placeholder {
    color: #aaa;
    opacity: 0.5; 
  }
  
  .date-picker {
    margin-left: 10px;
    margin-right: 10px;
  }
  </style>