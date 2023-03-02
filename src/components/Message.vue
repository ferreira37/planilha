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

</style>
