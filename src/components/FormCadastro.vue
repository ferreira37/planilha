<template>   
    <div>
        <Message :msg="msg" v-show="msg"/>
        <Despesas id="adicionar-despesas" :msg="modal"  v-if="isOpenModal"/>
        <form id="cadastro-form">
            <div class="input-container">
                <label for="date">Data:</label>
                <input v-model="date" type="date" name="date" id="date" class="form-control" >
            </div>
            <div class="input-container">
                <label for="codigoEmpresa">Cód Empresa:</label>
                <input v-model="codEmpresa" type="text" name="codigoEmpresa" id="codigoEmpresa" class="form-control">
            </div>
            <div class="input-container">
                <label for="nomeEmpresa">Nome Empresa:</label>
                <input v-model="nomeEmpresa" type="text" name="nomeEmpresa" id="nomeEmpresa" class="form-control">
            </div>
            <div class="input-container">
                <label for="mes">Mês</label>
                <select v-model="month" class="form-control form-control-sm" id="FormControlSelect">
                    <option>JANEIRO</option>
                    <option>FEVEREIRO</option>
                    <option>MARÇO</option>
                    <option>ABRIL</option>
                    <option>MAIO</option>
                </select>
            </div>
            <div class="input-container">
                <label for="valorInicial">Valor Inicial</label>
                <input v-model.lazy="amount" v-money3="config" v-model="valorInicial" type="text" name="valorInicial" id="valorInicial" class="form-control">
            </div>
            <div class="input-container">
                <label for="valorFinal">Valor Final</label>                
                <input v-model.lazy="amount" v-money3="config" v-model="valorFinal" type="text" name="valorFinal" id="valorFinal" class="form-control">
            </div>
        </form>
        <div class="input-container">
            <button @click="adicionarDados()" class="btn btn-primary" id="btn-cadastrar">Cadastrar</button>
        </div>

    </div>

    <div id="form-table" v-for="dado in dados" :key="dado">
        <div>
            <div id="form-table-heading" v-if="dado.month">
                <div>Data:</div>
                <div>Cód Empresa:</div>
                <div>Nome Empresa:</div>
                <div class="form-table-month">{{ dado.month }}</div>
                <div class="form-table-months">{{ dado.month }}</div>
            </div>
            <div id="form-table-rows">
                <div class="form-table-row">                   
                    <div>{{ dado.date }}</div>
                    <div>{{ dado.codEmpresa }}</div>
                    <div>{{ dado.nomeEmpresa }}</div>
                    <div @click="abrirFecharCaixaDeComentario()">{{ dado.valorInicial }}</div>
                    <div v-show="!isOpen" v-bind:style="styleObject" class='infowindow-balloon'>
                        <textarea id='comentario'></textarea>
                        <a @click.stop.prevent="abrirFecharCaixaDeComentario()" v-bind:style="styleObjectClose" class='close'>x</a>
                    </div>
                    <div>{{ dado.valorFinal }}
                        <button @click="removerDados(index)" class="btn btn-primary" id="btn-deletar">Deletar</button>
                    </div>
                </div>
                <div class="footer-shadow"></div>
                <!---- <div class="form-resultado-final">Valor a Receber: {{ dado.valorReal }}
                    <button @click="adicionarDespesas()" class="submit-btn">Despesas</button>
                </div>  -->
            </div>
        </div>
    </div>
    
</template>

<script>
import { Money3Directive } from 'v-money3';
import Message from './Message.vue';
import Despesas from './Despesas.vue';

export default {
    name: 'FormCadastro',
    components: {
        Message,
        Despesas
    },
    data() {
        return {
            month: '',
            isOpen: false,
            isOpenModal: false,
            amount: 0,
            dados: [],
            date: '',
            codEmpresa: '',
            nomeEmpresa: '',
            valorInicial: '',
            valorFinal: '',
            valorReal: '',
            valor1: '',
            valor2: '',
            msg: '',
            modal: '',
            styleObject: {
                display: 'none',
                fontSize: '16px',
                position: 'absolute',
                marginTop: '80px',
                marginLeft: '850px',
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
    computed: {
        config() {
            return {
                decimal: ",",
                thousands: ".",
                suffix: "",
                precision: 2,
                masked: false
            }
        },

    },
    directives: {
        money3: Money3Directive

    },
    methods: {
        calcularValores() {
            this.valor1 = parseFloat(this.valorInicial);
            this.valor2 = parseFloat(this.valorFinal);
            this.valorReal = (this.valor2 - this.valor1);
            Number(this.valorReal).toLocaleString('pt-br', {minimumFractionDigits: 2,});
        },
        abrirFecharCaixaDeComentario() {
            this.isOpen = !this.isOpen
        },
        aparecerComentario() {
            var texto = document.getElementById("comentario").value;
            console.log(texto)

        },
        formatarHora() {
            this.date = new Date();
            this.date = new Intl.DateTimeFormat('pt-BR').format(this.date);
        },
        adicionarDados() {
            this.formatarHora();

            if(this.codEmpresa.trim() === '' || this.nomeEmpresa.trim() === '' || 
            this.valorInicial.trim() === '0,00' || this.valorFinal.trim() === '0,00') {
                this.msg = `É obrigatório preencher todos os campos`;
                setTimeout(() => {
                    this.msg = ""                    
                }, 3000);
                return
            } else {
                this.dados.push({
                    date: this.date,
                    codEmpresa: this.codEmpresa,
                    nomeEmpresa: this.nomeEmpresa,
                    valorInicial: this.valorInicial,
                    valorFinal: this.valorFinal,
                    valorReal: this.valorReal,
                    month: this.month
                })
                this.limparCampos();
            }
                                   
        },
        removerDados(index) {
            this.dados.splice(index, 1);
        },
        adicionarDespesas() {
            this.isOpenModal = !this.isOpenModal
            this.modal = `Olá`
            
        },
        limparCampos() {
            this.date = '',
            this.codEmpresa = '',
            this.nomeEmpresa = '',
            this.valorInicial = '',
            this.valorFinal = '',
            this.month = ''
        }
    },
    updated() {
        this.calcularValores()
    }
}
</script>

<style scoped>
#cadastro-form {
        max-width: 1200px;
        margin: 0 auto;
    }

    .input-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        margin-bottom: 20px;
        float: left;
        padding-right: 50px;
    }

    label {        
        margin-bottom: 15px;
        color: #222;
        padding: 1px 1px;        
        height: 15px;
    }

    input #date, #codigoEmpresa, #valorInicial, #valorFinal, #FormControlSelect{
        padding: 5px 10px;
        width: 100px;
        height: 35px;
        margin-bottom: 100px;
    }

    #date {
        width: 110px;
        height: 35px;
    }
    
    #valorInicial, #valorFinal {
        width: 135px;

    }

    #valorInicial, #valorFinal, #FormControlSelect {
        margin-top: 0 auto;
    }

    #nomeEmpresa {
        padding: 5px 10px;
        width: 250px;
        height: 35px;
    }

    .submit-btn {
        background-color: #001040;
        color: #fff;
        padding: 5px 10px;
        font-size: 16px;
        margin: 0 auto;
        margin-left: 5px;
        margin-top: 30px;
        cursor: pointer;
        transition: .5s;
    }

    .submit-btn:hover {
        background-color: transparent;
        color: #222;
    }

    #btn-deletar {
        display: flex;
        margin-left: 90px;
        margin-top: -25px;
    }

    #btn-cadastrar {
        display: flex;
        margin-left: 1190px;
        margin-top: -156px;
    }

    .form-table-month {
        background-color: yellow;
        max-width: 250px;
        margin-right: 1px;
    }

    .form-table-months {
        background-color: green;
        max-width: 250px;
        margin-left: 1px;
    }


    #form-table {
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 50px;
}

#form-table-heading {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    font-weight: bold;
    padding: 10px 10px;
    border-bottom: 3px solid #333;
    margin-left: 1px;
    width: 100%;
    margin-bottom: 10px;
}

#form-table-heading div,
.form-table-row div {
    width: 20%;
    padding: 5px 50px;
}

.form-table-row {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    padding: 20px 10px;
    border-bottom: 1px solid #ccc;
    margin-left: 1px;
    width: 100%;
}

.form-resultado-final {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    padding: 2px 0 30px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    width: 100%;
    
    
}

textarea {
  width: 100px;
}

.footer-shadow {
    background:rgba(2, 2, 2, 0.5);
    position: fixed;
    margin-left: 180px;
    left: 0;
    bottom: 0;
    width: 70%;
    height: 50px;   
    color: white;
    text-align: center;
    top: 37.8em;
}

</style>