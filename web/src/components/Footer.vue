<script setup>

import { useDataStore } from "../DataStore";

const store = useDataStore();
</script>

<template>
<div class="footer">
  <div>
    <font-awesome-icon icon="fa-solid fa-database" />
    {{ store.dataset_file?.name }}:
    <b>{{ store.items.length }}</b> items
    
  </div>
  <div>
    <a href="https://github.com/BIDS-Xu-Lab/language-review"
      target="_blank">
      <font-awesome-icon icon="fa-brands fa-github" />
      Language Review
      {{ store.version }}
    </a>
  </div>
</div>
</template>

<style scoped>
</style>