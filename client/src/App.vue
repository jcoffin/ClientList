<template>
  <div>{{message}}</div>
</template>


<script>
import requests from './logic/requests.js';
export default {
  data() {
    return {
      message: 'Vue is working just fine!'
    }
  },
  methods: {
    getAll: requests.getAll,
    getClientById: requests.getClientById,
    getProviderById: requests.getProviderById,
    createClient: requests.createClient,
    deleteClient: requests.deleteClient,
    createNewProvider: requests.createNewProvider,
    changeProviderName: requests.changeProviderName,
    modifyClient: requests.modifyClient
  }
}
</script>

<style>

body {
  color: rgb(230, 46, 46);
}
</style>