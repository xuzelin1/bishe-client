<template>
  <div class="container">
    <Header />
    <Banner />
    <Content />
    <Nav />
  </div>
</template>

<script>
  import Header from '@/components/layout/header';
  import Nav from '@/components/layout/nav';
  import Banner from '@/components/banner';
  import Content from '@/components/content';
  export default {
    components: {
      Header,
      Banner,
      Nav,
      Content,
    }
  }
</script>

<style>

</style>
