<template>
    <div v-show="modalSshow" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Título do modal</h5>
                    <button @click="closeModal()" type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{ msg }}</p>
                </div>
                <div class="modal-footer">
                    <button @click="closeModal()" type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    <button type="button" class="btn btn-primary">Salvar mudanças</button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'Despesas',
    props: {
        msg: String
    },
    data() {
        return {
            modalSshow: true
        }
    },
    methods: {
        closeModal() {
            this.modalSshow = false
        }
    } 
}
</script>

<style scoped>
.modal {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    top: 200px;
}

</style>