<template>
  <div v-if="loading">
    loading...
  </div>
  <div v-else class="grid">
    <div class="col-12">
      <div class="flex justify-content-between flex-wrap card-container purple-container">
        <AddCustomerControl />
        <div class="flex">
          <span class="p-buttonset">
            <ToggleButton v-model="cardView" onIcon="pi pi-th-large" offIcon="pi pi-th-large" />
            <ToggleButton v-model="listView" onIcon="pi pi-list" offIcon="pi pi-list" />
          </span>
        </div>
      </div>
    </div>
    <Dialog :visible="customerService.dialog && !customerService.editMode"
            :show-header="false"
            modal dismissableMask
            style="min-width: 600px"
            @update:visible="setDialogVisibility">
      <CustomerDetails v-if="customerService.customer" :customer="customerService.customer" />
    </Dialog>
    <CustomerCards v-if="cardView" />
    <CustomerList v-if="listView" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ICustomerService, CustomerService } from '@/services/customer-service';
import { injectStrict } from '@/services';
import CustomerCards from '@/components/CustomerCards.vue';
import CustomerList from '@/components/CustomerList.vue';
import CustomerDetails from '@/components/CustomerDetails.vue';
import AddCustomerControl from '@/components/AddCustomerControl.vue';

const customerService = injectStrict<ICustomerService>(CustomerService.serviceName);

const loading = ref(true);
customerService.fetchCustomers().then(() => {
  loading.value = false;
});

const cardView = ref(true);
const listView = computed({
  get() { return !cardView.value; },
  set(v: boolean) { cardView.value = !v; },
});

function setDialogVisibility(visible: boolean) {
  if (!visible) {
    customerService.closeDialog();
  }
}
</script>
