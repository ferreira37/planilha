<template>
  <navbar :logo="logo_src" :alt="app_name" />
  <router-view/>
  <Footer :logo="logo_footer" :alt="footer_name" />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      logo_src: '/img/logo.png',
      app_name: 'Planilha Financeira',
      logo_footer: '/img/logo-footer.png',
      footer_name: 'Footer'
    }
  }
  
}
</script>

<style>
* {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.main-container {
  margin: 50px;
  min-height: 250px;
}

h1 {
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #222;
}

@media only screen and (max-device-width: 1200px) {
* { width:100%; }
}
</style>
