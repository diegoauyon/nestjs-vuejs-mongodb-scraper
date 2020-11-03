<template>
  <div>
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2"></vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <vs-row>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
            <h1>Boats Viewer</h1>
          </vs-col>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
            <p> This is the viewer of the boats information scraped and served with Nest.js, Vue.js and MongoDB</p>
          </vs-col>
          <vs-divider icon="arrow_downward"></vs-divider>
          <vs-col vs-type="flex" vs-justify="center" vs-align="center"
                  v-if="!info || (info && info.boats.length === 0)">
            <vs-alert title="Boats" active="true" color="dark">
              There are no boats at the moment
            </vs-alert>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2"></vs-col>
    </vs-row>

    <vs-row vs-justify="center" v-if="info && info.boats.length != 0">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2"></vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <vs-row>
          <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="3" v-for="boat in info.boats" :key="boat._id">
            <vs-card actionable class="cardx">
              <div slot="header">
                <h3>
                  {{ boat.boatModel }}
                </h3>
              </div>
              <div slot="media" v-if="boat.images.length!== 0">
                <img :src="boat.images[0]" v-bind:alt="boat.images[0]">
              </div>
              <div slot="media" v-if="boat.images.length== 0">
                <img :src="getImgUrl('boat.png')" v-bind:alt="'boat.png'" height="auto" width="50%">
              </div>
              <div>
                <span>Designer: {{ boat.designer }}</span>
              </div>
              <div slot="footer">
                <vs-row vs-justify="flex-end">
                  <vs-button color="primary" type="gradient" :to="{name: 'View', params: {id: boat._id}}">View
                  </vs-button>
                  <vs-button color="danger" type="gradient" @click="deletePost(boat._id)">Delete
                  </vs-button>
                </vs-row>
              </div>
            </vs-card>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2"></vs-col>
    </vs-row>
    <vs-row vs-justify="center">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <vs-row v-if="info && info.boats.length != 0">
          <div v-for="link in info.links" :key="link.rel">
            <vs-button color="primary" type="border" v-on:click="fetchBoats(link.href)">{{ link.rel }}</vs-button>
          </div>
        </vs-row>
      </vs-col>
    </vs-row>

  </div>

</template>

<script>
// @ is an alias to /src
import {server} from "@/utils/helper";
import axios from "axios";

export default {
  data() {
    return {
      info: false
    };
  },
  created() {
    this.fetchBoats();
  },
  methods: {
    getImgUrl(pic) {
      return require('../assets/' + pic)
    },
    fetchBoats(url = `${server.baseURL}/boats`) {
      this.$vs.loading()
      axios
          .get(url)
          .then(data => {
            console.warn('boats', data)
            this.info = data.data
          })
          .catch(() => {
            this.$vs.notify({
              color: 'danger',
              title: 'Error',
              text: 'Could not load boats'
            })
          })
          .finally(() => {
            this.$vs.loading.close()
          });
    },
    openConfirm(id, model) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `Confirm Deletion ${model}`,
        text: `Are you sure you want to delete boat ${model}?`,
        accept: this.deletePost(id)
      })
    },
    deletePost(id) {
      axios.delete(`${server.baseURL}/boats/${id}`)
          .then(data => {
            console.log(data);
            this.$vs.notify({
              color: 'danger',
              title: 'Deleted boat',
              text: 'The selected boat was successfully deleted'
            })
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .catch(() => {
            this.$vs.notify({
              color: 'danger',
              title: 'Error',
              text: 'Could not delete boat'
            })
          });
    }
  }
};
</script>

