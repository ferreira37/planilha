<template>
    <div class="alert alert-danger" role="alert" style="position: absolute; margin-left: 530px; top: 340px;">
        <p>{{ msg }}</p>
        <div class="loading_1"></div>
        
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
