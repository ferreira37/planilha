<template>
    <footer id="footer">
        <img :src="logo" :alt="alt">        
    </footer>
    
</template>

<script>
export default {
    name: 'Footer',
    props: ['logo', 'alt']
}
</script>

<style scoped>
#footer {
    height: 200px;
    background-color: #001040;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

</style>