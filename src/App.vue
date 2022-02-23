<template>
  <nav>
    <Menubar :model="items" class="bg-blue-700 border-noround text-white" />
  </nav>
  <main >
    <router-view />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref([{
  label: 'Customers',
  icon: 'pi pi-user',
  to: { name: 'customerView' },
}]);
</script>

<style scoped>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  main {
    padding: 80px 24px;
  }
  nav > div.p-menubar.text-white ::v-deep(li.p-menuitem > a.p-menuitem-link *) {
    color: lightgray;
  }
  nav:hover > div.p-menubar.text-white ::v-deep(li.p-menuitem > a.p-menuitem-link:hover *) {
    color: white;
  }
</style>
