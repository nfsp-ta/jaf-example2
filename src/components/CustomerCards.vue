<template>
    <div v-for="customer in customerService.customers"
        :key="customer.customer_number" class="col-12 md:col-6 lg:col-4">
      <CustomerCard :customer="customer" />
    </div>
</template>

<script setup lang="ts">
import { ICustomerService, CustomerService } from '@/services/customer-service';
import { injectStrict } from '@/services';
import CustomerCard from '@/components/CustomerCard.vue';

const customerService = injectStrict<ICustomerService>(CustomerService.serviceName);
</script>
