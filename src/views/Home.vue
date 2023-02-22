<template>
  <div class="home">
    <img :src="banner" :alt="background_img">    
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      banner: '/img/banner.png',
      background_img: 'Banner'
    }
  }
}
</script>
