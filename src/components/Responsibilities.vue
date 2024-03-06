<template>
    <div class="responsibilities">
      <div class="header-container">
        <h2 class="heading">Institute Responsibilities</h2>
        <div class="buttons">
          <button @click="toggleEditMode">{{ editMode ? 'Save' : '✎' }}</button>
          <button v-if="editMode" @click="addNewExperience">+</button>
          <button v-if="editMode" @click="cancelEdit">Cancel</button>
        </div>
      </div>
      <ul>
        <li v-for="(experience, index) in experiences" :key="index">
          <template v-if="editMode">
            <input type="text" v-model="experience.designation" class="edit-input" placeholder="Designation" @focus="clearPlaceholder(index)" />
            <datepicker v-model="experience.fromDate" class="date-picker" placeholder="From Date" :config="{ format: 'dd/MM/yyyy' }" :editable="true"></datepicker>
            <datepicker v-model="experience.toDate" class="date-picker" placeholder="Till Date" :config="{ format: 'dd/MM/yyyy' }" :editable="true"></datepicker>
            <button @click="removeQualification(index)">delete</button>
          </template>
          <template v-else>
            <span>{{ experience.designation }}, ({{ formatDate(experience.fromDate) }} - {{ formatDate(experience.toDate) }})</span>
          </template>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import Datepicker from 'vue3-datepicker';
  
  export default {
    components: {
      Datepicker
    },
    data() {
      return {
        editMode: false,
        experiences: [
          {
            designation: 'Head of the Department, CSE',
            fromDate: new Date(2024, 2, 5),
            toDate: new Date()
          },
          {
            designation: 'Associate Dean, Research and Consultancy',
            fromDate: new Date(2021, 12, 1),
            toDate: new Date(2024, 2, 22)
          },
          {
            designation: 'Nodal Officer, IPR Cell',
            fromDate: new Date(24, 3, 31),
            toDate: new Date()
          },
          {
            designation: 'Chairperson, IPR Cell',
            fromDate: new Date(2022, 5, 16),
            toDate: new Date(2024, 2, 29)
          },
          {
            designation: 'Chairperson, Web Committee',
            fromDate: new Date(2020, 10, 1),
            toDate: new Date()
          },
          {
            designation: 'Chairperson, Social Media Committee',
            fromDate: new Date(2019, 7, 1),
            toDate: new Date()
          },
          {
            designation: 'Convener, NISP Policy Implementation Committee',
            fromDate: new Date(2020, 6, 1),
            toDate: new Date()
          },
          {
            designation: 'Faculty Adviser, Photography Club',
            fromDate: new Date(2018, 7, 1),
            toDate: new Date()
          },
          {
            designation: 'Faculty Adviser, Arts and Crafts Club',
            fromDate: new Date(2019, 8),
            toDate: new Date(2023, 5, 1)
          },
          {
            designation: 'Faculty Adviser, Coding Club',
            fromDate: new Date(2022, 10, 1),
            toDate: new Date(2023, 5, 1)
          },
          {
            designation: 'SPOC, PMKVY 4.0 Implementation',
            fromDate: new Date(2023, 3, 1),
            toDate: new Date()
          },
          {
            designation: 'SPOC, Implementation of MSME Innovative',
            fromDate: new Date(2022, 5, 1),
            toDate: new Date()
          },
        ]
      };
    },
    methods: {
      toggleEditMode() {
        if (this.editMode) {
          // Remove empty experiences if they exist
          this.experiences = this.experiences.filter(exp => exp.designation.trim() !== '');
          // You can add logic here to save changes to a database or perform other actions
        }
        this.editMode = !this.editMode;
      },
      addNewExperience() {
        if (this.editMode) {
          this.experiences.push({
            designation: '',
            branch: '',
            college: '',
            fromDate: new Date(),
            toDate: new Date()
          });
        }
      },
      cancelEdit() {
        this.editMode = false;
        // Reset the input fields or perform other cancelation logic if needed
      },
      clearPlaceholder(index) {
        // Clear placeholder when the user starts typing
        this.experiences[index].designation = '';
      },
      removeQualification(index){
      this.experiences.splice(index,1)
      },
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }
    }
  };
  </script>
  
  <style scoped>
  .responsibilities {
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