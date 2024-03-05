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
            <input type="text" v-model="links[index].title" placeholder="Link Title" class="edit-input" />
            <input type="text" v-model="links[index].url" placeholder="Link URL" class="edit-input" />
          </template>
          <template v-else>
            <a :href="link.url" target="_blank">{{ link.title }}</a>
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
        links: [
          { title: 'Orchid', url: 'https://orcid.org/%200000-0002-5040-6557' },
          { title: 'Google Scholar', url: 'https://scholar.google.com/citations?user=krRO0w4AAAAJ&hl=en' },
          { title: 'Linkedin', url: 'http://www.linkedin.com/in/ansumanmahapatra' },
          { title: 'Publons', url: 'https://publons.com/researcher/2690899/ansuman-mahapatra/' },
          { title: 'IRINS/ Vidwan', url: 'https://nitpy.irins.org/profile/101688' },
          { title: 'Scopus', url: 'whttps://www.scopus.com/authid/detail.uri?authorId=56964772300' },
          { title: 'Twitter', url: 'https://twitter.com/helloansuman?ref_src=twsrc%5Etfw' }
        ]
      };
    },
    methods: {
      toggleEditMode() {
        if (this.editMode) {
          // Remove empty links if they exist
          this.links = this.links.filter(link => link.title.trim() !== '' && link.url.trim() !== '');
          // You can add logic here to save changes to a database or perform other actions
        }
        this.editMode = !this.editMode;
      },
      addNewLink() {
        if (this.editMode) {
          this.links.push({ title: '', url: '' });
          // If you have default values for new links, you can assign them here
        }
      },
      cancelEdit() {
        this.editMode = false;
        // You may want to reset the input values or revert changes if needed
      }
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
  