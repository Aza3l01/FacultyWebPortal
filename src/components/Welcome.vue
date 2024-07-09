<template>
  <div class="navbar">
    <a href="https://www.nitpy.ac.in/" class="home-button">
      <img src="https://www.nitpy.ac.in/assets/images/logo.png" alt="Home">
    </a>
    <h2 class="head">Faculty Web Portal</h2>
    <router-link v-if="!isLoggedIn" to="/login" class="nav-button right">Login</router-link>
  </div>
  <div>
    <EditableBanner />
    <Details />
    <Educational />
    <Experience />
    <Research />
    <Academic />
    <Internationalconference />
    <National />
    <Internationaljournal />
    <Nationaljournal />
    <Bookchapter />
    <Patent />
    <Responsibilities />
    <Dresponsibilities />
    <Aresponsibilities />
    <Laboratory />
    <Mou />
    <Talks />
    <Training />
    <Memberships />
    <Reviewer />
    <Awards />
    <Links />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapState } from "vuex";
import EditableBanner from './banner/EditableBanner.vue';
import Details from './Details.vue';
import Research from './Research.vue';
import Educational from './Educational.vue';
import Experience from './Experience.vue';
import Academic from './Academic.vue';
import Internationalconference from './Internationalconference.vue';
import National from './National.vue';
import Internationaljournal from './Internationaljournal.vue';
import Nationaljournal from './Nationaljournal.vue';
import Bookchapter from './Bookchapter.vue';
import Patent from './Patent.vue';
import Responsibilities from './Responsibilities.vue';
import Dresponsibilities from './Dresponsibilities.vue';
import Aresponsibilities from './Aresponsibilities.vue';
import Laboratory from './Laboratory.vue';
import Mou from './Mou.vue';
import Talks from './Talks.vue';
import Training from './Training.vue';
import Memberships from './Memberships.vue';
import Reviewer from './Reviewer.vue';
import Awards from './Awards.vue';
import Links from './Links.vue';


export default defineComponent({
  methods: {
    goToHome() {
      window.location.href = 'https://www.nitpy.ac.in/';
    },
    doNothing() {
      console.log("Button does nothing");
    },
  },
  mounted() {
    document.body.style.margin = '0';
    document.querySelector('.navbar').style.position = 'sticky';
  },
  components: {
    Details ,
    EditableBanner,
    Experience ,
    Educational ,
    Research ,
    Academic ,
    Internationalconference ,
    National ,
    Internationaljournal ,
    Nationaljournal ,
    Bookchapter ,
    Patent ,
    Responsibilities,
    Dresponsibilities ,
    Aresponsibilities ,
    Laboratory ,
    Mou ,
    Talks ,
    Training ,
    Memberships ,
    Reviewer ,
    Awards ,
    Links
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState({
      token: (state) => state.token,
    }),
  },
  methods: {
    sayHi() {
      fetch("http://localhost:3000/hi", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    },
  },
});
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
}

.home-button {
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
}

.home-button img {
  max-height: 30px;
}

.right {
  margin-left: auto;
}

.navbar {
  display: flex;
  justify-content: space-between;
  background-color: #3e8687;
  padding: 0; /* Remove padding */
  position: sticky;
  top: 0;
  z-index: 100; /* Adjust the z-index as needed */
}

.nav-button {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #3e8687;
  border: none;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
}

.nav-button:hover {
  background-color: #2c5f60;
}

.head {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #fff;
}
</style>
