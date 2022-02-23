import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import primevue from './plugins/primevue';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import services from './services';

const app = createApp(App);

app.use(primevue);
app.use(store);
app.use(router);
app.use(services);

app.mount('#app');
