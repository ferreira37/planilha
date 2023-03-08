<template>
    <div v-show="!isOpen" v-bind:style="styleObject" class='infowindow-balloon'>
        <textarea id='comentario'></textarea>
        <a @click.stop.prevent="openCloseCommentBox()" v-bind:style="styleObjectClose" class='close'>x</a>
    </div>    
</template>

<script>
export default {
    name: 'CommentBox',
    data() {
        return {
            isOpen: false,
            styleObject: {
                display: 'none',
                fontSize: '16px',
                position: 'absolute',
                marginTop: '2px',
                marginLeft: '820px',
                padding: '5px',
                color: '#ffffff',
                zIndex: '3000',
                borderRadius: '10px',
                maxWidth: '110px'
            },
            styleObjectClose: {
                position: 'absolute',
                top: '-10px',
                left:' calc(100% - 10px)',
                backgroundColor: '#001040',
                padding: '0 5px',
                borderRadius: '15px',
                cursor: 'pointer !important'
            }
        }
    },
    methods: {
        openCloseCommentBox() {
            this.isOpen = !this.isOpen
        }
    }
}

</script>

<style scoped>
textarea {
  width: 100px;
}

</style>