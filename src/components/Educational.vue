<template>
    <div class="educational">
      <div class="header-container">
        <h2 class="heading">Educational Qualifications</h2>
        <div class="buttons">
          <button @click="toggleEditMode">{{ editMode ? 'Save' : '✎' }}</button>
          <button v-if="editMode" @click="addQualification">+</button>
          <button v-if="editMode" @click="cancelEdit">Cancel</button>
        </div>
      </div>
      <ul>
        <li v-for="(qualification, index) in qualifications" :key="index">
          <template v-if="editMode">
            <input type="text" v-model="qualification.degree" class="edit-input" placeholder="Degree"  />
            <input type="text" v-model="qualification.field" class="edit-input" placeholder="Field" />
            <input type="text" v-model="qualification.university" class="edit-input" placeholder="University" />
            <datepicker v-model="qualification.year" class="date-picker" placeholder="Year" :config="{ format: 'yyyy' }" :editable="true"></datepicker>
            <button @click="deleteDetail(qualification._id)">Delete</button>
          </template>
          <template v-else>
  <span>
    {{ qualification.degree }} in {{ qualification.field }} from {{ qualification.university }}: {{ formatDate(qualification.year) }}
  </span>
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
        qualifications: []
      };
    },
    methods: {
      async toggleEditMode() {
  this.editMode = !this.editMode;
  if (!this.editMode) {
    try {
      // Delete all existing qualifications
      await Promise.all(this.qualifications.map(qualification => {
        if (qualification._id) {
          return axios.delete(`http://localhost:3000/Educational/${qualification._id}`);
        }
        return Promise.resolve(); // Resolve for qualifications without _id
      }));

      // Save all qualifications
      await axios.post('http://localhost:3000/Educational', {
        Educational: this.qualifications.map(qualification => ({
          _id: qualification._id,
          degree: qualification.degree,
          field: qualification.field,
          university: qualification.university,
          year: qualification.year
        }))
      }
      );

      this.fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
},

addQualification() {
        if (this.editMode) {
          this.qualifications.push({
            degree: '',
            field: '',
            university: '',
            year: new Date()
          });
        }
      },
      formatDate(date) {
        return date.getFullYear().toString();
},
async fetchData() {
  try {
    const response = await axios.get('http://localhost:3000/Educational');
    this.qualifications = response.data.map(qualification => ({
      _id: qualification._id,
      degree: qualification.degree,
      field: qualification.field,
      university: qualification.university,
      year: new Date(qualification.year),
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
},
    async deleteDetail(detailId) {
      try {
        console.log(detailId);
        await axios.delete(`http://localhost:3000/Educational/${detailId}`);
        const index = this.qualifications.findIndex((qualification) => qualification._id === detailId);
        this.qualifications.splice(index, 1);
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
  .educational {
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
    list-style-type: none;
    padding: 25px;
    margin: 0;
    text-align: center;
  }
  
  li {
    margin-bottom: 10px;
  }
  
  .edit-input {
    width: 400px;
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