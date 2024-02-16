<template>
  <div class="academic">
    <div class="header-container">
      <h2 class="heading">Academic Contributions</h2>
      <div class="buttons">
        <button v-if="editMode" @click="saveChanges" class="save-button right">Save</button>
        <button v-if="editMode" @click="addNewElement('ugCourses')" class="plus-button right">UG +</button>
        <button v-if="editMode" @click="addNewElement('pgCourses')" class="plus-button right">PG +</button>
        <button v-if="editMode" @click="toggleEditMode" class="cancel-button right">Cancel</button>
        <button v-else @click="toggleEditMode" class="edit-button">✎</button>
      </div>
    </div>
    <h3>UG level</h3>
    <ul class="course-list">
      <li v-for="(course, index) in ugCourses" :key="index" class="course">
        <template v-if="editMode">
          <input type="text" v-model="ugCourses[index]" class="edit-input" />
        </template>
        <template v-else>
          <span>{{ course }}</span>
        </template>
      </li>
    </ul>
    <h3>PG level</h3>
    <ul class="course-list">
      <li v-for="(course, index) in pgCourses" :key="index" class="course">
        <template v-if="editMode">
          <input type="text" v-model="pgCourses[index]" class="edit-input" />
        </template>
        <template v-else>
          <span>{{ course }}</span>
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
        ugCourses: [
        'Computer Organization and Architecture (July- Dec 2018, 2019 Jul-Dec, 2020 Jul-Dec, 2021 Jul-Dec)',
        'Advanced Computer Architecture (July- Dec 2018)',
        'Database Management Systems (2019 Jan-May, 2019 Jul-Dec)',
        'Operating Systems (2021 Jul-Dec)',
        'Software Engineering (2020 Jan - Jun, 2021 Jan-May)',
        'Web Technology (2020 Jul-Dec)',
        'C Programming (2022 Jan- April)',
        'Advanced Database Management Systems (2022 Jan- April)',
        'Computer Graphics (2022 Jul-Dec, 2023 Jul-Dec)',
        'Web Technology (2023 Jan-May)',
        'High Performance Computing (2023  Jul-Dec)',
        'Computer Vision (2024 Jan-May)'
        ],
        pgCourses: [
          'Advanced Database Management Systems (2019 Jan-May, 2020 Jan - Jun, 2021 Jan-May, 2022 Jan- April)',
          'Computer Graphics and Image Processing (2022 Jul-Dec)'
        ]
      };
    },
    methods: {
    toggleEditMode() {
      if (this.editMode) {
        this.ugCourses = this.ugCourses.filter(course => course.trim() !== '');
        this.pgCourses = this.pgCourses.filter(course => course.trim() !== '');
      }
      this.editMode = !this.editMode;
    },
    addNewElement(courseType) {
      if (this.editMode) {
        if (courseType === 'ugCourses') {
          this.ugCourses.push('');
        } else if (courseType === 'pgCourses') {
          this.pgCourses.push('');
        }
      }
    },
    saveChanges() {
      // Implement the logic to save changes
      // For example, you might want to send the updated data to a server or perform any other necessary actions.
      console.log('Changes saved!');
      this.editMode = false; // Exit edit mode after saving changes
    }
  }
};
  </script>
  
  <style scoped>
  .academic {
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
    padding: 10px 20px; /* Padding for the heading */
    height: 50px;
    margin-top: 15px;
  }
  
  .heading {
    color: #3e8687;
    margin: 0;
    text-align: center;
  }
  
  .buttons {
    display: flex;
  }
  
  .edit-button,
  .plus-button,
  .save-button,
  .cancel-button {
    background: #616161;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #ffffff;
    border-radius: 15%;
    margin-left: 10px;
    margin-right: 5px;
  }
  
  .plus-button {
    background-color: #616161;
  }
  
  .plus-button:hover,
  .edit-button:hover,
  .save-button:hover,
  .cancel-button:hover {
    background-color: #2c5f60;
  }
  
  .course-list {
    margin-bottom: 20px;
  }
  
  .course {
    margin-bottom: 5px;
  }
  
  .edit-input {
    width: 500px;
    padding: 10px;
    border-radius: 5px;
  }
  
  .right {
    margin-left: auto; /* Push the buttons to the right */
  }
  
  .save-button,
  .cancel-button {
    background-color: #616161;
  }
  
  .save-button:hover,
  .cancel-button:hover {
    background-color: #2c5f60;
  }
  </style>
  