<template>
  <div class="academic">
    <div class="header-container">
      <h2 class="heading">Academic Contributions</h2>
      <div class="buttons">
        <button @click="toggleEditMode" class="edit-button">{{ editMode ? 'Save' : '✎' }}</button>
        <button v-if="editMode" @click="addNewElement('ugCourses')" class="plus-button right">UG +</button>
        <button v-if="editMode" @click="addNewElement('pgCourses')" class="plus-button right">PG +</button>
        <button v-if="editMode" @click="cancelEdit" class="cancel-button">cancel</button>
      </div>
    </div>
    <h3>UG level</h3>
    <ul class="course-list">
      <li v-for="(course, index) in ugCourses" :key="index" class="course">
        <template v-if="editMode">
          <input type="text" v-model="course.course" class="edit-input" />
          <button @click="deleteUg(course._id)">delete</button>
        </template>
        <template v-else>
          <span>{{ course.course }}</span>
        </template>
      </li>
    </ul>
    <h3>PG level</h3>
    <ul class="course-list">
      <li v-for="(course, index) in pgCourses" :key="index" class="course">
        <template v-if="editMode">
          <input type="text" v-model="course.course" class="edit-input" />
          <button @click="deletePg(course._id)">delete</button>
        </template>
        <template v-else>
          <span>{{ course.course }}</span>
        </template>
      </li>
    </ul>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        editMode: false,
        ugCourses: [{course:''}],
        pgCourses: [{course:''}]
      };
    },
    methods: {
    async toggleEditMode() {
      this.editMode = !this.editMode;
      if (!this.editMode) {
        try {
          await Promise.all(this.ugCourses.map(course => {
        if (course._id) {
          return axios.delete(`http://localhost:3000/Academic/ug/${course._id}`);
        }
        return Promise.resolve(); // Resolve for researchAreas without _id
      }));

      // Save all researchAreas
      await axios.post('http://localhost:3000/Academic/ug', {
        courses: this.ugCourses.map(area => ({
          _id: area._id,
          course: area.course,
        }
        ))
      }
      );

      await Promise.all(this.pgCourses.map(course => {
        if (course._id) {
          return axios.delete(`http://localhost:3000/Academic/pg/${course._id}`);
        }
        return Promise.resolve(); // Resolve for researchAreas without _id
      }));

      // Save all researchAreas
      await axios.post('http://localhost:3000/Academic/pg', {
        courses: this.pgCourses.map(area => ({
          _id: area._id,
          course: area.course,
        }))
      }
      );

  
     
          this.fetchData();
        } catch (error) {
          console.error('Error saving researchAreas:', error);
        }
      }
      
    

    },
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/Academic/ug');
        this.ugCourses = response.data.map(area => ({
      _id: area._id,
      course: area.course,
    }));
    const response1 = await axios.get('http://localhost:3000/Academic/pg');
        this.pgCourses = response1.data.map(area => ({
      _id: area._id,
      course: area.course,
    }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    addNewElement(courseType) {
      if (this.editMode) {
        if (courseType === 'ugCourses') {
          this.ugCourses.push({course: ''});
        } else if (courseType === 'pgCourses') {
          this.pgCourses.push({course: ''});
        }
      }
    },
    async deleteUg(detailId){
      try {
        await axios.delete(`http://localhost:3000/Academic/ug/${detailId}`);
        const index = this.ugCourses.findIndex((area) => area._id === detailId);
        this.ugCourses.splice(index, 1);
      } catch (error) {
        console.error('Error deleting area:', error);
      }
    },
    async deletePg(detailId){
      try {
        await axios.delete(`http://localhost:3000/Academic/pg/${detailId}`);
        const index = this.pgCourses.findIndex((area) => area._id === detailId);
        this.pgCourses.splice(index, 1);
      } catch (error) {
        console.error('Error deleting area:', error);
      }
    },
    cancelEdit(){
      this.fetchData();
      this.editMode=!this.editMode;
    }
  
  },
  mounted(){
    this.fetchData();
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
  