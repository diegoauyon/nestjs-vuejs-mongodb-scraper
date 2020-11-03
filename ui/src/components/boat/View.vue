<template>
  <div>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
        <vs-button color="primary" type="border" icon="home" v-on:click="navigate()">View All Boats</vs-button>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
            <h1>Boat Model {{ boat.boatModel }}</h1>
          </vs-col>
          <vs-divider icon="arrow_downward"></vs-divider>
        </vs-row>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2"></vs-col>
    </vs-row>
    <vs-images v-if="boat && boat.images && boat.images.length!==0">
      <vs-image :key="index" :src="imageUrl" v-for="(imageUrl, index) in boat.images"/>
    </vs-images>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2"></vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <vs-list>
          <vs-list-header title="Details" color="danger"></vs-list-header>
          <vs-list-item title="Beam" :subtitle="boat.beam">
            <template slot="avatar">
              <vs-avatar/>
            </template>
          </vs-list-item>
          <vs-list-item title="Designer" :subtitle="boat.designer">
            <template slot="avatar">
              <vs-avatar/>
            </template>
          </vs-list-item>
          <vs-list-item title="Displacement" :subtitle="boat.displacement">
            <template slot="avatar">
              <vs-avatar/>
            </template>
          </vs-list-item>
          <vs-list-item title="Draft" :subtitle="boat.draft">
            <template slot="avatar">
              <vs-avatar/>
            </template>
          </vs-list-item>
          <vs-list-item title="Hull Type" :subtitle="boat.hullType">
            <template slot="avatar">
              <vs-avatar/>
            </template>
          </vs-list-item>
          <vs-list-item title="LOA" :subtitle="boat.loa">
            <template slot="avatar">
              <vs-avatar/>
            </template>
          </vs-list-item>
          <vs-list-item title="LWL" :subtitle="boat.lwl">
            <template slot="avatar">
              <vs-avatar/>
            </template>
          </vs-list-item>
          <vs-list-item title="Rigging Type" :subtitle="boat.riggingType">
            <template slot="avatar">
              <vs-avatar/>
            </template>
          </vs-list-item>
        </vs-list>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2"></vs-col>
    </vs-row>
  </div>
</template>

<style lang="css">
.boat-images {
  max-height: 500px;
  overflow: auto;
}

</style>

<script>
import {server} from "../../utils/helper";
import axios from "axios";
import router from "../../router";

export default {
  data() {
    return {
      id: 0,
      boat: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getBoat();
  },
  methods: {
    getBoat() {
      axios
          .get(`${server.baseURL}/boats/${this.id}`)
          .then(data => {
            console.log(data.data);
            this.boat = data.data
          });
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

