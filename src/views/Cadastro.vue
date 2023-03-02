<template>
  <div class="man-container">
    <h2>DRE</h2>
    <FormCadastro />
  </div>
</template>

<script>
import FormCadastro from '@/components/FormCadastro.vue';

export default {
  name: 'Cadastro',
  components: {
    FormCadastro
  }
}
</script>

<style scoped>

h2 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px 0 30px;
}
</style>
