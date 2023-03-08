<template>
    <div class="alert alert-info" role="alert" id="alert">
        {{ msg }}
    </div>
</template>

<script>
export default {
    name: 'Message',
    props: {
        msg: String
    }
}
</script>

<style scoped>
#alert {
    position: absolute;
    margin-left: 530px;
    top: 340px;
}

@media screen and (max-width: 600px) {
#alert { 
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
  }
}

@media screen and (max-width: 900px) {
#alert { 
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
  }
}

@media screen and (max-width: 1200px) {
#alert { 
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
  }
}

</style>
