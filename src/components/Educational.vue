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
            <input type="text" v-model="qualification.degree" class="edit-input" placeholder="Degree" @focus="clearPlaceholder(index)" />
            <input type="text" v-model="qualification.field" class="edit-input" placeholder="Field" />
            <input type="text" v-model="qualification.university" class="edit-input" placeholder="University" />
            <datepicker v-model="qualification.year" class="date-picker" placeholder="Year" :config="{ format: 'yyyy' }" :editable="true"></datepicker>
          </template>
          <template v-else>
  <span>
    {{ qualification.degree }} in {{ qualification.field }} from {{ qualification.university }} : {{ formatDate(qualification.year) }}
  </span>
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
        qualifications: [
          { degree: 'Ph.D.', field: 'Computer Science', university: 'Nit Rourkela', year: new Date(2018,0,1) },
          { degree: 'M.Tech', field: 'Computer Science', university: 'Kalinga Institute of Industrial Technology ', year: new Date(2011,0,1) },
          { degree: 'B.Tech', field: 'Computer Engineering', university: 'Gandhi Institute of Technological Advancement (GITA)', year: new Date(2009,0,1) },
          { degree: '10+2', field: 'Hsc', university: 'Birmaharajpur College', year: new Date(2004,0,1) },
          { degree: '10th', field: 'Bse', university: 'Birmaharajpur High School', year: new Date(2002,0,1) },
        ],
      };
    },
    methods: {
      toggleEditMode() {
        if (this.editMode) {
          this.qualifications = this.qualifications.filter(q => q.degree.trim() !== '');
        }
        this.editMode = !this.editMode;
      },
      addQualification() {
        if (this.editMode) {
          this.qualifications.push({ degree: '', field: '', university: '', year: new Date() });
        }
      },
      clearPlaceholder(index) {
        this.qualifications[index].degree = '';
        this.qualifications[index].field = '';
        this.qualifications[index].university = '';
      },
      cancelEdit() {
      this.editMode = false;
      // Reset the input fields or perform other cancelation logic if needed
    },
      formatDate(date) {
    return date.getFullYear().toString();
  }
    },
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