<template>
  <div>
    <h2>{{ customerName }}</h2>
    <h4>Customer Number {{ customer.customer_number }}</h4>
    <div>
      <InputField :modelValue="customer.ssn" label="SSN" disabled />
      <InputField :modelValue="dobPlusAge" label="Date of Birth" disabled />
      <InputField :modelValue="customer.email" label="Email Address" disabled />
      <InputField :modelValue="customer.mobile_phone_number" label="Mobile Phone Number" disabled />
      <InputField :modelValue="address" label="Address" disabled />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineProps, computed } from 'vue';
import { ICustomerService, CustomerService } from '@/services/customer-service';
import { injectStrict } from '@/services';
import Customer from '@/models/customer';
import InputField from './InputField.vue';

const customerService = injectStrict<ICustomerService>(CustomerService.serviceName);

const props = defineProps<{
  customer: Customer
}>();

const customerName = computed(() => `${props.customer.first_name} ${props.customer.last_name}`);

const adr = reactive(props.customer.primary_address);
const address = computed(() => `${adr.address_line_1}, ${adr.city}, ${adr.state}  ${adr.zip_code}`);

const dobPlusAge = computed(() => `${props.customer.date_birth} (age ${props.customer.age})`);
</script>
