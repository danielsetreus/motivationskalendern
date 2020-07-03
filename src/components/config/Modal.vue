<template>
    <b-modal 
        id="config-modal" 
        title="Configure Motivationskalendern" 
        size="md" 
        v-bind:ok-only="true"
        :hide-header-close="!configured"
        :no-close-on-backdrop="!configured"
        :no-close-on-esc="!configured"
        @ok="saveConfig"
        ok-title="Spara"
    >
      <Form ref="form" />
    </b-modal>
</template>

<script>
import Form from './Form'
export default {
    components: {Form},
    computed: {
        configured() {
            return this.$store.state.config !== null
        }
    },
    methods: {
        showModal() {
            this.$bvModal.show('config-modal')
        },
        saveConfig(bvModalEvt) {
            bvModalEvt.preventDefault()
            if(this.$refs.form.saveConfig()) {
                console.log('Config saved - close modal')
                this.$nextTick(() => {
                    this.$bvModal.hide('config-modal');
                })
            }
        }
    }
}
</script>
