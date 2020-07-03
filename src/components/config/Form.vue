<template>
    <div>

        <b-alert 
            :show="dismissErrorCountDown"
            variant="danger"
            dismissible
            fade
            @dismissed="dismissErrorCountDown=0"
            @dismiss-count-down="dismissErrorCountDownChanged"
        >
            Fixa inställningarna - så här kan vi inte spara det :/ 
        </b-alert>
        <b-form @submit="saveConfig">

            <b-form-group
                label="Missionens startdatum"
                label-for="startDate"
                description="Dagen då Du landade i främmande land"
            >
                <b-form-datepicker
                    id="startDate"
                    v-model="form.startDate"
                    :state="validateField('startDate')"
                ></b-form-datepicker>
            </b-form-group>

            <b-form-group
                label="Missionens slutdatum"
                label-for="endDate"
                description="Dagen då det Hemmåt Det Bär"
            >
                <b-form-datepicker
                    id="endDate"
                    v-model="form.endDate"
                    :state="validateField('endDate')"
                ></b-form-datepicker>
            </b-form-group>

            <b-form-group
                label="Lön"
                label-for="sallary"
                description="Grundlön / månad"
            >
                <b-input-group
                    append="kr"
                >
                    <b-form-input
                        id="sallary"
                        v-model="form.sallary"
                        type="number"
                        number
                        :state="validateField('sallary')"
                    ></b-form-input>
                </b-input-group>
            </b-form-group>

            <b-form-group
                description=""
                label-for="sallaryAddThird"
            >
                <b-form-checkbox
                    switch
                    id="salladyAddThird"
                    v-model="form.sallaryAddThird"
                >
                    Addera grundlönen gånger 1.3
                </b-form-checkbox>
                
            </b-form-group>

            <b-form-group
                label="Tillägg"
                label-for="sallaryAddition"
                description="Missionstillägg + Utlandstillägg + Individualtillägg  per månad"
            >
                <b-input-group
                    append="kr"
                >
                    <b-form-input
                        id="sallaryAddition"
                        v-model="form.sallaryAddition"
                        type="number"
                        number
                        :state="validateField('sallaryAddition')"
                    ></b-form-input>
                </b-input-group>
            </b-form-group>

            <b-form-group
                label="Skatt"
                label-for="taxRate"
                description="Beräknad skatt"
            >   
                <b-input-group
                    append="%"
                >
                    <b-form-input
                        id="taxRate"
                        v-model="form.taxRate"
                        type="number"
                        number
                        :state="validateField('taxRate')"
                    ></b-form-input>
                </b-input-group>
            </b-form-group>

        </b-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: { ...this.$store.state.config },
            dismissErrorCountDown: 0,
        }
    },
    methods: {
        saveConfig() {
            if(this.configIsValid()) {
                this.$store.commit('setConfig', this.form)
                return true
            } else {
                this.dismissErrorCountDown = 5;
            }
            return false
        },
        validateField(field) {
            switch(field) {
                case 'startDate':
                case 'endDate':
                    return (this.form[field] && this.form[field] !== '') ? true : false
                case 'sallary':
                case 'sallaryAddition':
                case 'taxRate':
                    return Number.isInteger(this.form[field])
                default:
                    return false
            }
        },
        configIsValid() {
            const fields = ['startDate', 'endDate', 'sallary', 'sallaryAddition', 'taxRate']
            let valid = true
            for(const field of fields) {
                if(!this.validateField(field)) {
                    valid = false
                }
            }
            return valid
        },
        dismissErrorCountDownChanged(secs) {
            this.dismissErrorCountDown = secs;
        }
    },
    mounted() {
        // this.validateConfig();
    }
}
</script>