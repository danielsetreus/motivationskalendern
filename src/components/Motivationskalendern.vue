<template>
    <div class="mk">
        <div class="head">
            <h1>Motivationskalendern</h1>
            
            <div class="configBtnContainer">
                <b-button @click="openConfig" class="configBtn" variant="warning">
                    <b-icon-gear-fill></b-icon-gear-fill>
                </b-button>
            </div>
        </div>
        <div class="content">
            <Calculator />
        </div>

        <div class="footer">
            <div>Version 1.0 Juli 2020</div>
            <div class="infoBtn">
                <b-icon-question-circle
                    @click="openInfo"
                >

                </b-icon-question-circle>
            </div>
        </div>

        <Modal ref="configModal" />
        <InfoModal ref="infoModal" />
    </div>
</template>

<script>

import Modal from './config/Modal'
import InfoModal from './InfoModal'
import Calculator from './Calculator'


export default {
    components: {Modal, InfoModal, Calculator},
    methods: {
        openConfig() {
            this.$refs.configModal.showModal()
        },
        openInfo() {
            this.$refs.infoModal.showModal()
            console.log('Open info modal')
        }
    },
    mounted: function() {
        if(!this.$store.state.config) {
            this.openConfig()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .mk {
        position: relative;
        height: 100%;
    }

    .footer {
        background-color: rgba(129, 115, 115, 0.9);
        color: rgb(255, 255, 200);
        position: absolute;
        bottom: 0;
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }

    .footer div {
        margin-left: 3em;
    }

    .footer div:last-child {
        margin-right: 1em;
    }

    .footer .infoBtn {
        cursor: pointer;
    }

    .head {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        background-color: rgba(129, 115, 115, 0.7);
        padding: 4px;
    }

    h1 {
        flex-grow: 1;
        text-align: center;
        font-weight: bold;
    }

    .configBtnContainer {
        display: flex;
        align-items: center;
    }

    .configBtn {
        font-size: 175%;
    }

</style>
