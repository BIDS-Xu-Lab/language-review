<script setup>

import { useDataStore } from "../DataStore";

const store = useDataStore();
</script>

<template>
<div class="footer">
  <div>
    <i class="fa fa-database"></i>
    {{ store.dataset_file?.name }}:
    <b>{{ store.items.length }}</b> items
    
  </div>
  <div>
    <a href="https://github.com/BIDS-Xu-Lab/language-review"
      target="_blank">
      <i class="fa-brands fa-pagelines"></i>
      Language Review
      {{ store.version }}
      <i class="fa-brands fa-github"></i>
    </a>
  </div>
</div>
</template>

<style scoped>
</style>