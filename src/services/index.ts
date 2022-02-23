import { inject, Plugin } from 'vue';
import store from '@/store';
import apiConnection from './api-connection';
import { CustomerService, ICustomerService } from './customer-service';
import { NamedService } from './named-service';

class ServiceProvider {
  private services: Record<string, NamedService> = {};

  private generators: Record<string, () => NamedService> = {};

  constructor() {
    this.generators[CustomerService.serviceName] = () => new CustomerService(apiConnection, store);
  }

  public get customerService() { return this.getService<ICustomerService>(CustomerService.serviceName); }

  private getService<T extends NamedService>(name: string): T {
    const service = this.services[name] ?? (this.services[name] = this.generators[name]());
    return service as T;
  }
}

const serviceProvider = new ServiceProvider();

export function injectStrict<T>(key: string, fallback?: T) {
  const resolved = inject(key, fallback);
  if (!resolved) {
    throw new Error(`Could not resolve ${key}`);
  }
  return resolved;
}

const plugin: Plugin = {
  install(app) {
    app.provide<ICustomerService>(CustomerService.serviceName, serviceProvider.customerService);
  },
};

export default plugin;
