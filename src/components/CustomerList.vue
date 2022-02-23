<template>
  <DataTable :value="customerService.customers" class="col-12">
    <Column field="first_name" header="First Name" sortable />
    <Column field="last_name" header="Last Name" sortable />
    <Column field="date_birth" header="Date of Birth" />
    <Column field="age" header="Age" sortable />
    <Column field="last4" header="SSN (last 4)" />
    <Column field="customer_number" header="Details">
      <template #body="slotProps">
        <Button icon="pi pi-ellipsis-v"
                class="p-button-rounded p-button-text p-button-plain"
                @click="customerService.showCustomerDetails(slotProps.data.customer_number)" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { ICustomerService, CustomerService } from '@/services/customer-service';
import { injectStrict } from '@/services';

const customerService = injectStrict<ICustomerService>(CustomerService.serviceName);
</script>
