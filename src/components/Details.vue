<template>
  <div>
    <div class="header-container">
      <h1><span v-if="!isEditing">{{ title }}</span><input v-else placeholder="Enter your name" v-model="title" /></h1>
      <button v-if="isLoggedIn" class="edit-button" @click="editInfo">{{ isEditing ? 'Save' : '✎' }}</button>
      <button v-if="isEditing" class="cancel-button" @click="cancelEdit">Cancel</button>
    </div>
    <h3><span v-if="!isEditing">{{ designation }}</span><input v-else placeholder="Designation" v-model="designation" /></h3>
    <p><span v-if="!isEditing">{{ department }}</span><input v-else placeholder="Department" v-model="department" /></p>
    <p v-if="!isEditing">{{ address }}</p>
    <p>Email: <span v-if="!isEditing">{{ email }}</span><input v-else v-model="email" /></p>
    <p>Phone: <span v-if="!isEditing">{{ phone }}</span><input v-else v-model="phone" /></p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      title: "",
      designation: "",
      department: "",
      address: "National Institute of Technology Puducherry, Thiruvettakudy, Karaikal - 609609, Puducherry, India",
      email: "",
      phone: "",
      isEditing: false,
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState({
      token: (state) => state.token,
    }),
  },
  methods: {
    async editInfo() {
      if (this.isEditing) {
        await axios.post('http://localhost:3000/Details', {
      title: this.title,
      username:this.$route.params.id,
      designation:this.designation,
      department:this.department,
      email: this.email,
      phone: this.phone
    })
    .then(response => {
      console.log('User info saved:', response.data);
    })
    .catch(error => {
      console.error('Error saving user info:', error);
    });
      }
      this.fetchData();
      this.isEditing = !this.isEditing;
    },
    cancelEdit() {
      this.fetchData();
      this.isEditing = false;
    },
    async fetchData() {
  try {
    const response = await axios.get(`http://localhost:3000/Details/${this.$route.params.id}`);
    const userinfoarray = response.data;
    const userinfo=userinfoarray[0];
    this.title = userinfo.title;
    this.designation = userinfo.designation;
    this.department = userinfo.department;
    this.email = userinfo.email;
    this.phone = userinfo.phone;
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
}
  },
  mounted(){
    this.fetchData();
  }
};
</script>

<style scoped>
div {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}

.edit-button, .cancel-button {
  background: #616161;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #ffffff;
  border-radius: 15%;
  margin-left: 5px;
}

.edit-button:hover, .cancel-button:hover {
  background-color: #2c5f60;
}

.header-container {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  box-sizing: border-box;
}

h1 {
  margin-right: 10px;
  color: #3e8687;
}

h3 {
  margin-top: 0;
}

</style>