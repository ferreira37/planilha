<template>
  <div>
    <nav>
      <router-link to="/" id="logo-url">
        <img :src="logo" :alt="alt" id="logo">
      </router-link>
      <router-link to="/">HOME</router-link>|
      <router-link to="/cadastro">CADASTRO</router-link>|
      <router-link to="/">RELATÓRIO</router-link>
  </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['logo', 'alt']
}
</script>

<style scoped>
nav {
    background-color: #001040;
    padding: 15px 50px 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 160px;
}

nav #logo-url {
    margin: 0 auto;
    margin-left: 0;
}

nav a {
    color: #fff;
    text-decoration: none;
    margin: 12px;
    transition: .5s;
}

nav a:hover {
    color: #fff;
}

</style>
