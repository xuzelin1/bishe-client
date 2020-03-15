import Vue from 'vue';
import Header from '@/components/layout/header.vue';
import Nav from '@/components/layout/nav.vue';
import Footer from '@/components/layout/footer.vue';
import Empty from '@/components/empty-list';
import MyOrder from '@/components/my-order';

const components = {
  Header,
  Empty,
  Nav,
  Footer,
  MyOrder,
}

Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});