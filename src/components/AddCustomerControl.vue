<template>
  <div class="inline px-4">
    <Dialog :visible="customerService.dialog && customerService.editMode"
            header="Add Customer"
            modal
            style="min-width: 600px"
            @update:visible="setDialogVisibility">
      <InputField v-model="customer_number_str" label="Customer Number" />
      <InputField v-model="first_name" label="First Name" />
      <InputField v-model="last_name" label="Last Name" />
      <InputField v-model="date_birth" label="Date of Birth" />
      <InputField v-model="ssn" label="SSN" />
      <InputField v-model="email" label="Email Address" />
      <InputField v-model="address_line_1" label="Street Address" />
      <InputField v-model="city" label="City" />
      <InputField v-model="state" label="State" />
      <InputField v-model="zip_str" label="Zip Code" />
      <InputField v-model="mobile_phone_number" label="Mobile Phone Number" />
      <div>
        <Button class="p-button-secondary"
                @click="saveCustomer()">Create Customer</Button>
      </div>
    </Dialog>
    <Button class="p-button-secondary"
            @click="customerService.openAddUserDialog()">
      Add Customer
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { getAge } from '@/utils';
import { ICustomerService, CustomerService } from '@/services/customer-service';
import { injectStrict } from '@/services';
import Customer from '@/models/customer';
import InputField from './InputField.vue';

const customerService = injectStrict<ICustomerService>(CustomerService.serviceName);

const customer_number_str = ref('');
const first_name = ref('');
const last_name = ref('');
const date_birth = ref('');
const ssn = ref('');
const email = ref('');
const address_line_1 = ref('');
const city = ref('');
const state = ref('');
const zip_str = ref('');
const mobile_phone_number = ref('');

function resetForm() {
  customer_number_str.value = '';
  first_name.value = '';
  last_name.value = '';
  date_birth.value = '';
  ssn.value = '';
  email.value = '';
  address_line_1.value = '';
  city.value = '';
  state.value = '';
  zip_str.value = '';
  mobile_phone_number.value = '';
}

function setDialogVisibility(visible: boolean) {
  if (visible) {
    customerService.openAddUserDialog();
  } else {
    resetForm();
    customerService.closeDialog();
  }
}

function saveCustomer() {
  const newCustomer: Customer = {
    customer_number: parseInt(customer_number_str.value, 10),
    first_name: first_name.value,
    last_name: last_name.value,
    date_birth: date_birth.value,
    ssn: ssn.value,
    email: email.value,
    primary_address: {
      address_line_1: address_line_1.value,
      city: city.value,
      state: state.value,
      zip_code: parseInt(zip_str.value, 10),
    },
    mobile_phone_number: mobile_phone_number.value,
    last4: ssn.value.substr(-4),
    age: getAge(date_birth.value),
    join_date: new Date().toLocaleDateString(),
  };

  customerService.createNewCustomer(newCustomer);
  setDialogVisibility(false);
}
</script>
