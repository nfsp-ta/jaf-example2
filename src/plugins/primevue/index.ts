import type { Plugin } from 'vue';
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';

const plugin: Plugin = {
  install(app) {
    app.use(PrimeVue);
    app.component('Menubar', Menubar);
    app.component('Card', Card);
    app.component('InputText', InputText);
    app.component('ToggleButton', ToggleButton);
    app.component('Button', Button);
    app.component('DataTable', DataTable);
    app.component('Column', Column);
    app.component('Dialog', Dialog);
  },
};

export default plugin;
