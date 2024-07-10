<template>
  <div class="educational">
    <div class="header-container">
      <h2 class="heading">Educational Qualifications</h2>
      <div class="buttons">
        <button v-if="isLoggedIn" @click="toggleEditMode">{{ editMode ? 'Save' : '✎' }}</button>
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
        qualifications: []
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
  this.editMode = !this.editMode;
  if (!this.editMode) {
    try {
      // Delete all existing experiences
      await Promise.all(this.qualifications.map(experience => {
        if (experience._id) {
          return axios.delete(`http://localhost:3000/Educational/${experience._id}`);
        }
        return Promise.resolve(); // Resolve for qualifications without _id
      }));

      // Save all qualifications
      await axios.post('http://localhost:3000/Educational', {
        Educational: this.qualifications.map(experience => ({
          _id: experience._id,
          username:this.$route.params.id,
          degree: experience.degree,
          field: experience.field,
          university: experience.university,
          year: experience.year,
        }))
      }
      );

      this.fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
},
async fetchData() {
  try {
    const response = await axios.get(`http://localhost:3000/Educational/${this.$route.params.id}`);
    this.qualifications = response.data.map(experience => ({
      _id: experience._id,
      degree: experience.degree,
      field: experience.field,
      university: experience.university,
      year: new Date(experience.year),
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
},
    addQualification() {
      if (this.editMode) {
        this.qualifications.push({ degree: '', field: '', university: '', year: new Date() });
      }
    },
    async deleteDetail(detailId) {
      try {
        await axios.delete(`http://localhost:3000/Educational/${detailId}`);
        const index = this.qualifications.findIndex((experience) => experience._id === detailId);
        this.qualifications.splice(index, 1);
      } catch (error) {
        console.error('Error deleting detail:', error);
      }
    },

    cancelEdit() {
      this.fetchData();
      this.editMode = false;
  },
    formatDate(date) {
  return date.getFullYear().toString();
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