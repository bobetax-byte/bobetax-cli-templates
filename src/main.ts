import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index';
import store from '@/store/index'

import '@/assets/style/common/index.scss';
import '@/assets/style/view/index.scss';

createApp(App).use(router).use(store).mount('#app')
