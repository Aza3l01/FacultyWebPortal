<template>
    <div class="bookchapter">
      <div class="header-container">
        <h2 class="heading">Book chapter</h2>
        <div class="buttons">
          <button v-if="!(editMode && selectedOption ==='user')" @click="toggleEditMode">{{ editMode ? 'Save' : '✎' }}</button>
          <button v-if="editMode && selectedOption === 'user'" @click="saveUserInput">Save</button>
          <button v-if="editMode && selectedOption ==='fill'" @click="addQualification">+</button>
          <button v-if="editMode && selectedOption ==='user'" @click="addQualificationuser">+</button>
          <button v-if="editMode && selectedOption ==='fill'" @click="addUserInput">Text box</button>
          <button v-if="editMode && selectedOption ==='user'" @click="addFillbox">fill box</button>
        </div>
      </div>
      <ul>
        <li v-for="(qualification, index) in qualifications" :key="index">
          <div v-if="editMode">
            <div v-if="selectedOption === 'fill'">
              <input type="text" v-model="qualification.author_name" class="edit-input" placeholder="Author name" />
              <input type="text" v-model="qualification.title" class="edit-input" placeholder="Title" />
              <input type="text" v-model="qualification.booktitle" class="edit-input" placeholder="Book title" />
              <input type="text" v-model="qualification.issue" class="edit-input" placeholder="Issue no" />
              <input type="text" v-model="qualification.vol" class="edit-input" placeholder="Vol" />
              <input type="text" v-model="qualification.page_no" class="edit-input" placeholder="Page no" />
              <datepicker v-model="qualification.date" class="date-picker" placeholder="Year" :config="{ format: 'yyyy' }" :editable="true"></datepicker>
              <input type="text" v-model="qualification.indexing" class="edit-input" placeholder="Indexing" />
              <input type="text" v-model="qualification.published" class="edit-input" placeholder="Publisher" />
              <button @click="removeQualification(index)">delete</button>
            </div>
            
          </div>
        
          <span v-if="!editMode && selectedOption === 'fill' ">
            {{index+1}}. {{ qualification.author_name }}, "{{ qualification.title }}", {{ qualification.journalname }}, Published: {{ qualification.published }},Year: {{ formatDate(qualification.date) }},Issue: {{ qualification.issue }}, Volume: {{ qualification.vol }}, Number: {{ qualification.vol_no }}, Venue: {{ qualification.venue }}, Page: {{ qualification.page_no }}, Index: {{ qualification.indexing }}
          </span>
          
          
        </li>
        <li v-for="(userinput, index) in userInput" :key="index">
          <div v-if="editMode">
            <div v-if="selectedOption === 'user'">
            <input type="text" v-model="userinput.textbox" class="edit-input" placeholder="Enter user input" >
            <button @click="removeQualificationUser(index)">delete</button>
            </div>
          </div>
            <span v-if="!editMode && selectedOption === 'user'">
             {{ index+1 }}  {{ userinput.textbox }}
          </span>
          
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
        qualifications: [{ author_name: 'Ansuman Mahapatra', title: '360 Degree User Generated Videos: Current Research and Future Trends', booktitle: ' High Performance Vision Intelligence: Recent Advancements', published: 'Springer',  date: new Date(2022,1,1), vol: '1', page_no: '117-135', indexing: '1',issue: '1' },],
        userInput: [{textbox: 'type'}],
        selectedOption: 'fill',
      };
    },
    methods: {
      toggleEditMode() {
        this.editMode = !this.editMode;
      },
      addQualification() {
        if (this.editMode && this.selectedOption === 'fill') {
          this.qualifications.push({ author_name: '', title: '', booktitle: '', published: '',venue :'', date: new  Date(),vol:'', page_no:'',indexing:'',dol_link:'' });
        }
      },
      addQualificationuser(){
        if (this.editMode && this.selectedOption === 'user') {
          this.userInput.push({textbox: ''});
      }
      },
      /*clearPlaceholder(index) {
        this.qualifications[index].author_name = '';
        this.qualifications[index].title = '';
        this.qualifications[index].booktitle = '';
        this.qualifications[index].published  = '';
        this.qualifications[index].date  = '';
        this.qualifications[index].vol_no  = '';
        this.qualifications[index].page_no  = '';
        this.qualifications[index].indexing  = '';
      },*/
      formatDate(date) {
    return date.getFullYear().toString();
  },
  addUserInput() {
        
        this.selectedOption = 'user';
      },
      saveUserInput() {
    
    this.editMode=!this.editMode 
  },
  addFillbox(){
    this.selectedOption = 'fill';
  },
    removeQualification(index){
      this.qualifications.splice(index,1)
    },
    removeQualificationUser(index){
      this.userInput.splice(index,1);
    }
  
    },
  };
  </script>
  
  <style scoped>
  .bookchapter {
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