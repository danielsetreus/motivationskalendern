<template>
    <b-modal 
        id="info-modal" 
        title="Motivationskalendern" 
        size="md" 
        v-bind:ok-only="true"
        ok-title="Coolt"
    >
        <p>
            Motivationskalendern är utvecklad av Daniel Setréus på uppdrag av sin kompis Janne,
            som under 2020 tjänstgjorde i Mali, och behövde en bättre motivationskalender
            än den gamla Excel-kalendern som länge cirkulerat bland utlandsmissioner.
        </p>
        <p>
            <b-icon-box-seam></b-icon-box-seam>
            <a href="https://github.com/danielsetreus/motivationskalendern" target="_blank">
                github.com/danielsetreus/motivationskalendern
            </a>
        </p>
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
