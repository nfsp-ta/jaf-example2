import Address from '@/models/address';

export default interface Customer {
  customer_number: number;
  first_name: string;
  last_name: string;
  date_birth: string;
  ssn: string;
  email: string;
  primary_address: Address;
  mobile_phone_number: string;
  join_date: string;
  last4: string;
  age: number;
}
