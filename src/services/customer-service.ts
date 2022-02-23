import Customer from '@/models/customer';
import Person from '@/models/person';
import {
  CUSTOMERS_GETTER, CUSTOMERS_MUTATION,
  CUSTOMER_GETTER, CUSTOMER_MUTATION,
  DIALOG_GETTER, DIALOG_MUTATION,
  EDIT_MODE_GETTER, EDIT_MODE_MUTATION,
} from '@/store/modules/customer-module';
import { getAge } from '@/utils';
import { Store } from 'vuex';
import { ApiConnection } from './api-connection';
import { GET_CUSTOMERS, POST_CUSTOMER } from './api-connection/endpoints';
import { NamedService } from './named-service';

function personToCustomer(person: Person): Customer {
  const {
    id,
    first_name,
    last_name,
    email,
    birthdate,
    city,
    state,
  } = person;

  const customer = {
    customer_number: id,
    first_name,
    last_name,
    date_birth: birthdate,
    email,
    ssn: '123-45-6789',
    mobile_phone_number: '800-555-1212',
    join_date: '12/31/18',
    primary_address: {
      address_line_1: '123 Main St.',
      city,
      state,
      zip_code: 12345,
    },
  };

  return { ...customer, last4: customer.ssn.substr(-4), age: getAge(customer.date_birth) };
}

export interface ICustomerService extends NamedService {
  serviceName: string;
  customer: Customer | null;
  dialog: boolean;
  editMode: boolean;
  customers: Customer[];
  fetchCustomers(): Promise<void>;
  showCustomerDetails(customerNumber: number): void;
  closeDialog(): void;
  openAddUserDialog(): void;
  createNewCustomer(customer: Customer): void;
}

export class CustomerService implements ICustomerService {
  public static serviceName = 'CustomerService';

  public serviceName = CustomerService.serviceName;

  private apiConnection: ApiConnection;

  private store: Store<{}>;

  public constructor(apiConnection: ApiConnection, store: Store<{}>) {
    this.apiConnection = apiConnection;
    this.store = store;
  }

  public get customers(): Customer[] {
    return this.store.getters[CUSTOMERS_GETTER];
  }

  public get customer(): Customer | null {
    return this.store.getters[CUSTOMER_GETTER];
  }

  public get dialog(): boolean {
    return this.store.getters[DIALOG_GETTER];
  }

  public get editMode(): boolean {
    return this.store.getters[EDIT_MODE_GETTER];
  }

  public async fetchCustomers(): Promise<void> {
    const people = await this.apiConnection.get<Person[]>(GET_CUSTOMERS, { size: 10 });
    const customers = people.map((p) => personToCustomer(p));
    this.store.commit(CUSTOMERS_MUTATION, customers);
    return Promise.resolve();
  }

  public showCustomerDetails(customerNumber: number): void {
    const customer = this.customers.find((c) => c.customer_number === customerNumber);
    if (customer == null) return;
    this.store.commit(CUSTOMER_MUTATION, customer);
    this.store.commit(EDIT_MODE_MUTATION, false);
    this.store.commit(DIALOG_MUTATION, true);
  }

  public closeDialog(): void {
    this.store.commit(DIALOG_MUTATION, false);
  }

  public openAddUserDialog(): void {
    this.store.commit(EDIT_MODE_MUTATION, true);
    this.store.commit(DIALOG_MUTATION, true);
  }

  public createNewCustomer(customer: Customer): void {
    this.apiConnection.post<Customer>(POST_CUSTOMER, customer).then(() => {
      this.store.commit(CUSTOMERS_MUTATION, [...this.customers, { ...customer }]);
      this.store.commit(EDIT_MODE_MUTATION, false);
    });
  }
}
