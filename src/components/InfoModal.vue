<template>
    <b-modal 
        id="info-modal" 
        title="Motivationskalendern" 
        size="md" 
        v-bind:ok-only="true"
        ok-title="Coolt"
    >
      
    </b-modal>
</template>

<script>
export default {
    methods: {
        showModal() {
            this.$bvModal.show('info-modal')
        },
    }
}
</script>
