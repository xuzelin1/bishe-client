<template>
  <div class="container">
    <Header />
    <Banner />
    <Nav />
  </div>
</template>

<script>
  import Header from '@/components/layout/header';
  import Nav from '@/components/layout/nav';
  import Banner from '@/components/banner';
  export default {
    components: {
      Header,
      Banner,
      Nav,
    }
  }
</script>

<style>

</style>
