<template>
  <div>
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
  </div>
  <div>
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
//import NavBar from './NavBar.vue';
//import EditableBanner from './banner/EditableBanner.vue';
import Details from './Details.vue';
import Responsibilities from './Responsibilities.vue';
import Experience from './Experience.vue';
import Research from './Research.vue';
import Academic from './Academic.vue';
import Internationalconference from './Internationalconference.vue';
import National from './National.vue';
import Internationaljournal from './Internationaljournal.vue';
import Nationaljournal from './Nationaljournal.vue';
import Bookchapter from './Bookchapter.vue';
import Patent from './Patent.vue';
//import Responsibilities from './Responsibilities.vue';
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
  components: {
    Details ,
    Experience ,
    Research ,
    Academic ,
    Internationalconference ,
    National ,
    Internationaljournal ,
    Nationaljournal ,
    Bookchapter ,
    Patent ,
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

<style>
body {
  margin: 0;
  font-family:Arial, Helvetica, sans-serif;
}
</style>
