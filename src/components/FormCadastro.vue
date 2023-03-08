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
            <div id="form-table-heading" v-if="(dado.month !== '')">
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
                    <div @click="abrirFecharCaixaDeComentario(this)" id="valor-inicial">{{ dado.valorInicial }}</div>
                    <CommentBox v-show="isOpen"/>
                    <div>{{ dado.valorFinal }}</div>
                    <button @click="atualizarDados()" class="btn btn-primary" id="btn-deletar">Deletar</button>                    
                </div>
                <div class="footer-shadow">
                    <div id="recebimento1"></div>
                    <div id="recebimento2"></div>
                    <button @click="adicionarDespesas()" class="submit-btn">Despesas</button>
                    
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { Money3Directive } from 'v-money3';
import Message from './Message.vue';
import Despesas from './Despesas.vue';
import CommentBox from './CommentBox.vue';

export default {
    name: 'FormCadastro',
    components: {
        Message,
        Despesas,
        CommentBox
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
            let recebimento1 = 0;
            let recebimento2 = 0;
            for(let i = 0; i < this.dados.length; i++) {
                recebimento1 += parseFloat(this.dados[i].valorInicial.replace(/[.,]/g, ''));
                recebimento2 += parseFloat(this.dados[i].valorFinal.replace(/[.,]/g, ''));
                document.getElementById('recebimento1').innerHTML = parseFloat(recebimento1 / 100).toLocaleString('pt-br', {minimumFractionDigits: 2,});
                document.getElementById('recebimento2').innerHTML = parseFloat(recebimento2 / 100).toLocaleString('pt-br', {minimumFractionDigits: 2,});
            }
        },
        abrirFecharCaixaDeComentario() {
            this.isOpen = !this.isOpen
        },
        formatarHora() {
            this.date = new Date();
            this.date = new Intl.DateTimeFormat('pt-BR').format(this.date);
        },
        adicionarDados() {
            this.formatarHora();

            if(this.codEmpresa.trim() === '' || this.nomeEmpresa.trim() === '' || 
            this.valorInicial.trim() === '0,00') {
                this.msg = `Preencha os campos obrigatórios`;
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
        atualizarDados() {
            for(var i = 0; i < this.dados.length; i++) {
                this.date = this.dados[i].date
                this.codEmpresa = this.dados[i].codEmpresa
                this.nomeEmpresa = this.dados[i].nomeEmpresa
                this.valorInicial = this.dados[i].valorInicial
                this.valorFinal = this.dados[i].valorFinal
                this.month = this.dados[i].month
            }
            this.removerDados(this.dados[i])
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
        width: 130px;
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
        position: absolute;
        display: flex;
        margin-left: 1100px;
        margin-top: -20px;
    }

    #btn-cadastrar {
        position: absolute;
        display: flex;
        margin-left: 2px;
        margin-top: 27px;
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
    margin-left: -10px;
    width: 100%;
}

#recebimento1 {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    padding: 2px 0 30px;
    padding-bottom: 10px;
    width: 100%;   
    
}

#recebimento2 {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    padding: 2px 0 30px;
    padding-bottom: 10px;    
    width: 100%;   
    margin-left: 240px;
}

.footer-shadow {
    background:rgba(2, 2, 2, 0.5);
    position: fixed;
    margin-left: 180px;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;   
    color: white;
    text-align: center;
    top: 37.8em;
}

@media screen and (max-width: 600px) {
#btn-cadastrar {
    align-items: center;
    margin-top: -5px;
    margin-left: 50px;
}

#btn-deletar {
    align-items: center;
    top: 1000px;
    margin-left: 10px;
}

input #date, #codigoEmpresa, #valorInicial, #valorFinal, #FormControlSelect, #nomeEmpresa {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
}

label {
    display: flex;
    justify-content: center;
    align-items: center;
}

#form-table {
    align-items: flex-start;
    width: 100%;
}

}

@media screen and (max-width: 900px) {
#btn-cadastrar {
    align-items: center;
    margin-top: -5px;
    margin-left: 50px;
}

#btn-deletar {
    align-items: center;
    top: 1000px;
    margin-left: 10px;
}

input #date, #codigoEmpresa, #valorInicial, #valorFinal, #FormControlSelect, #nomeEmpresa {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
}

label {
    display: flex;
    justify-content: center;
    align-items: center;
}

#form-table {
    align-items: flex-start;
    width: 100%;
}

}

@media screen and (max-width: 1200px) {
#btn-cadastrar {
    align-items: center;
    margin-top: -5px;
    margin-left: 50px;
}

#btn-deletar {
    align-items: center;
    top: 1000px;
    margin-left: 10px;
}

input #date, #codigoEmpresa, #valorInicial, #valorFinal, #FormControlSelect, #nomeEmpresa {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
}

label {
    display: flex;
    justify-content: center;
    align-items: center;
}

#form-table {
    align-items: flex-start;
    width: 100%;
}
}

</style>