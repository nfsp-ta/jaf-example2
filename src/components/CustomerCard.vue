<template>
  <Card>
    <template #title>
      {{ customerName }}
    </template>
    <template #subtitle>
      Customer Number {{ customer.customer_number }}
    </template>
    <template #content>
      <div>
        <InputField :modelValue="customer.last4" label="Last 4 of SSN" disabled />
        <InputField :modelValue="customer.date_birth" label="Date of Birth" disabled />
        <InputField :modelValue="customer.age.toString()" label="Age" disabled />
      </div>
    </template>
    <template #footer>
      <Button class="p-button-secondary p-button-outlined"
              @click="customerService.showCustomerDetails(customer.customer_number)">
        Details
      </Button>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { reactive, defineProps, computed } from 'vue';
import { ICustomerService, CustomerService } from '@/services/customer-service';
import { injectStrict } from '@/services';
import Customer from '@/models/customer';
import InputField from './InputField.vue';

const props = defineProps<{
  customer: Customer
}>();

const customerService = injectStrict<ICustomerService>(CustomerService.serviceName);

const customerName = computed(() => `${props.customer.first_name} ${props.customer.last_name}`);

const adr = reactive(props.customer.primary_address);
const address = computed(() => `${adr.address_line_1}, ${adr.city}, ${adr.state}  ${adr.zip_code}`);
</script>
