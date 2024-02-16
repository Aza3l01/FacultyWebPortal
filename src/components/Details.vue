<template>
  <div>
    <div class="header-container">
      <h1>{{ title }}</h1>
      <button class="edit-button" @click="editInfo">{{ isEditing ? 'Save' : '✎' }}</button>
      <button v-if="isEditing" class="cancel-button" @click="cancelEdit">Cancel</button>
    </div>
    <h3>{{ designation }}</h3>
    <p>{{ department }}</p>
    <p>{{ address }}</p>
    <p>Email: <span v-if="!isEditing">{{ email }}</span><input v-else v-model="email" /></p>
    <p>Phone: <span v-if="!isEditing">{{ phone }}</span><input v-else v-model="phone" /></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Dr. Ansuman Mahapatra",
      designation: "Assistant Professor",
      department: "Department of Computer Science and Engineering",
      address: "National Institute of Technology Puducherry, Thiruvettakudy, Karakal - 609609, Puducherry, India",
      email: "ansuman.mahapatra@nitpy.ac.in",
      phone: "+91-8895590157",
      isEditing: false,
    };
  },
  methods: {
    editInfo() {
      if (this.isEditing) {
        // Save edited information or make an API call to save it
        // You can add validation before saving
      }
      this.isEditing = !this.isEditing;
    },
    cancelEdit() {
      // Reset the input fields or perform other cancelation logic if needed
      this.isEditing = false;
    },
  },
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
  margin-left: 10px;
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
}

h1 {
  margin-right: 10px;
  color: #3e8687;
}

h3, p, input {
  margin-bottom: 5px;
}

h3 {
  margin-top: 0;
}

</style>