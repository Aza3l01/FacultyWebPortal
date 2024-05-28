<template>
  <div class="patent">
    <div class="header-container">
      <h2 class="heading">Patent</h2>
      <div class="buttons">
        <button v-if="isLoggedIn" @click="toggleEditMode">{{ editMode ? 'Save' : '✎' }}</button>
        <button v-if="editMode" @click="addNewArea">+</button>
        <button v-if="editMode" @click="cancelEdit">Cancel</button>
      </div>
    </div>
    <ul v-if="details.length > 0">
      <li v-for="(detail, index) in details" :key="index">
        <template v-if="editMode">
          <input type="text" v-model="details[index].details" class="edit-input" />
          <button @click="deleteDetail(detail._id)">Delete</button>
        </template>
        <template v-else>
          <span>{{ detail.details }}</span>
        </template>
      </li>
    </ul>
    <div v-else>
      <p>No data available</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      editMode: false,
      details: []
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
          await Promise.all(this.details.map(detail => {
        if (detail._id) {
          return axios.delete(`http://localhost:3000/api/users/${detail._id}`);
        }
        return Promise.resolve(); // Resolve for details without _id
      }));

      // Save all details
      await axios.post('http://localhost:3000/api/users', {
        details: this.details.map(detail => ({
          _id: detail._id,
          details: detail.details,
        }))
      }
      );

          this.fetchData();
        } catch (error) {
          console.error('Error saving details:', error);
        }
      }
      this.editMode = !this.editMode;
    },

  addNewArea() {
      if (this.editMode) {
        this.details.push({ details: '' });
      }
    },

  async fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        this.details = response.data.map(detail => ({
      _id: detail._id,
      details: detail.details,
    }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  
  async deleteDetail(detailId) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${detailId}`);
        const index = this.details.findIndex((detail) => detail._id === detailId);
        this.details.splice(index, 1);
      } catch (error) {
        console.error('Error deleting detail:', error);
      }
    },

  cancelEdit() {
    this.fetchData();
    this.editMode = !this.editMode;
  }
  },

  mounted() {
    this.fetchData();
  }
};
</script>
  
  <style scoped>
  .patent {
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
    text-align: left; /* Change this line to align left */
  }

  li {
    margin-bottom: 10px;
    text-align: left;
    list-style-type: disc;
    word-wrap: break-word;
    max-width: 1000px;
  }

  .edit-input {
    width: 500px;
    padding: 5px;
    border-radius: 5px;
  }

</style>
