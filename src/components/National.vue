<template>
  <div class="nationalconference">
    <div class="header-container">
      <h2 class="heading">National Conference</h2>
      <div class="buttons">
        <button v-if="isLoggedIn" @click="toggleEditMode">{{ editMode ? 'Save' : '✎' }}</button>
        <button v-if="editMode && selectedOption ==='fill'" @click="addQualification">+</button>
        <button v-if="editMode && selectedOption ==='user'" @click="addQualificationuser">+</button>
        <button v-if="editMode && selectedOption ==='fill'" @click="addUserInput">Text box</button>
        <button v-if="editMode && selectedOption ==='user'" @click="addFillbox">fill box</button>
        <button v-if="editMode" @click="cancelEdit">Cancel</button>
      </div>
    </div>
    <ul>
      <li v-for="(qualification, index) in qualifications" :key="index">
        <template v-if="editMode">
      
          <div v-if="selectedOption === 'fill'">
            <input type="text" v-model="qualification.author_name" class="edit-input" placeholder="Author name" />
            <input type="text" v-model="qualification.title" class="edit-input" placeholder="Title of paper" />
            <input type="text" v-model="qualification.confname" class="edit-input" placeholder="Conference title" />
            <input type="text" v-model="qualification.published" class="edit-input" placeholder="publisher"/>
            <input type="text" v-model="qualification.venue" class="edit-input" placeholder="Venue" />
            <datepicker v-model="qualification.date" class="date-picker" placeholder="Date" :config="{ format: 'yyyy' }" :editable="true"></datepicker>
            <input type="text" v-model="qualification.vol" class="edit-input" placeholder="Vol" />
              <input type="text" v-model="qualification.vol_no" class="edit-input" placeholder="No" />
            <input type="text" v-model="qualification.page_no" class="edit-input" placeholder="Page no" />
            <input type="text" v-model="qualification.indexing" class="edit-input" placeholder="Indexing" />
            <input type="text" v-model="qualification.dol_link" class="edit-input" placeholder="Dol Link" />
            <button @click="removeQualification(qualification._id)">delete</button>
          </div>
          
        </template>
      
        <span v-if="!editMode && selectedOption === 'fill' ">
          {{index+1}}. {{ qualification.author_name }}, "{{ qualification.title }}", {{ qualification.confname }}, Published: {{ qualification.published }}, Venue: {{ qualification.venue }}, Date: {{ formatDate(qualification.date) }}, Volume: {{ qualification.vol }}, Number: {{ qualification.vol_no }}, Page: {{ qualification.page_no }}, Index: {{ qualification.indexing }},
          <a :href="qualification.dol_link">{{qualification.dol_link}}</a>
        </span>
        
        
      </li>
      <li v-for="(userinput, index) in userInput" :key="index">
        <template v-if="editMode">
          <div v-if="selectedOption === 'user'">
          <input type="text" v-model="userinput.textbox" class="edit-input" placeholder="Enter user input" >
          <button @click="removeQualificationUser(userinput._id)">delete</button>
          </div>
        </template>
          <span v-if="!editMode && selectedOption === 'user'">
           {{ index+1 }}  {{ userinput.textbox }}
        </span>
        
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
      qualifications: [],
      userInput: [],
      selectedOption: 'user',
      
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
      // Delete all existing qualifications
      await Promise.all(this.qualifications.map(qualification => {
        if (qualification._id) {
          return axios.delete(`http://localhost:3000/National/fill/${qualification._id}`);
        }
        return Promise.resolve(); // Resolve for qualifications without _id
      }));

      // Save all qualifications
      await axios.post('http://localhost:3000/National/fill', {
        National: this.qualifications.map(qualification => ({
          _id: qualification._id,
          author_name: qualification.author_name,
          title: qualification.title,
          confname: qualification.confname,
          published: qualification.published,
          venue: qualification.venue,
          date: qualification.date,
          vol: qualification.vol,
          vol_no: qualification.vol_no,
          page_no: qualification.page_no,
          indexing: qualification.indexing,
          dol_link: qualification.dol_link,
        }))
      }
      );

      await Promise.all(this.userInput.map(unserinput => {
        if (unserinput._id) {
          return axios.delete(`http://localhost:3000/National/user/${unserinput._id}`);
        }
        return Promise.resolve(); // Resolve for userInput without _id
      }));

      // Save all userInput
      await axios.post('http://localhost:3000/National/user', {
        National: this.userInput.map(userinput => ({
          _id: userinput._id,
          textbox: userinput.textbox,
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
      if (this.editMode && this.selectedOption === 'fill') {
        this.qualifications.push({ author_name: '', title: '', confname: '', published: '', date: new  Date(),vol:'', vol_no:'',page_no:'',indexing:'',dol_link:'' });
      }
    },
    addQualificationuser(){
      if (this.editMode && this.selectedOption === 'user') {
        this.userInput.push({textbox: ''});
    }
    },
    async fetchData() {
  try {
    const response = await axios.get('http://localhost:3000/National/fill');
    this.qualifications = response.data.map(qualification => ({
      _id: qualification._id,
      author_name: qualification.author_name,
          title: qualification.title,
          confname: qualification.confname,
          published: qualification.published,
          venue: qualification.venue,
          date: new Date (qualification.date),
          vol: qualification.vol,
          vol_no: qualification.vol_no,
          page_no: qualification.page_no,
          indexing: qualification.indexing,
          dol_link: qualification.dol_link,
    }));

    const response1 = await axios.get('http://localhost:3000/National/user');
    this.userInput = response1.data.map(userinput => ({
      _id: userinput._id,
      textbox: userinput.textbox,
    }));

  } catch (error) {
    console.error('Error fetching data:', error);
  }
},
    
formatDate(date) {
  const day= date.getDate().toString();
  const year=date.getFullYear().toString();
  const  month= (date.getMonth() + 1);
  return `${day}/${month}/${year}`;  
},
async addUserInput() {
      this.selectedOption = 'user';
      
    },
async addFillbox(){
  this.selectedOption = 'fill';
},
 async removeQualification(detailId){
    try {
        console.log(detailId);
        await axios.delete(`http://localhost:3000/National/fill/${detailId}`);
        const index = this.qualifications.findIndex((qualification) => qualification._id === detailId);
        this.qualifications.splice(index, 1);
      } catch (error) {
        console.error('Error deleting detail:', error);
      }
  },
 async removeQualificationUser(detailId){
    try {
        console.log(detailId);
        await axios.delete(`http://localhost:3000/National/user/${detailId}`);
        const index = this.userInput.findIndex((userinput) => userinput._id === detailId);
        this.userInput.splice(index, 1);
      } catch (error) {
        console.error('Error deleting detail:', error);
      }
  },
  cancelEdit() {
        this.fetchData();
        this.editMode = false;
      }

  },
  mounted(){
    this.fetchData();
  }
};
</script>

<style scoped>
  .nationalconference {
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
    text-align: center;
    max-width: 1000px;
  }
  
  .edit-input {
    width: 500px;
    padding: 5px;
    border-radius: 5px;
  }
  
  </style>