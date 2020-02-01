import Vue from 'vue';
import Header from '@/components/layout/header.vue';

const components = {
  Header,
}

Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});