<template>
    <div>
        <div class="info">
            <div>
                Bruttolön <b-badge variant="secondary">{{getGrossSallary().toLocaleString()}} kr</b-badge>
            </div>
            <div>
                Nettolön <b-badge variant="secondary">{{getNetSallary().toLocaleString()}} kr</b-badge>
            </div>
            <div>
                Trakatamente <b-badge variant="secondary">{{getAllowance().toLocaleString()}} kr</b-badge>
            </div>
            <div>
                Utbetalning <b-badge variant="secondary">{{getTotalPayoutPerMonth().toLocaleString()}} kr / mån</b-badge>
            </div>
        </div>

        <div class="stats">
            <div class="header">
                <b-badge variant="warning"><b-icon-clock-history></b-icon-clock-history> Kvar i missionen</b-badge>
            </div>
            <div class="value">
                <Value :value="timeToGo" />
            </div>

            <TimeChart class="chart" :chartData="chartData" :options="chartOptions" />

            <div class="header small">
                <b-badge variant="secondary">Spenderat</b-badge>
            </div>
            <div class="value small">
                <Value :value="timeSpent" />
            </div>
        </div>

        <div class="stats">
            <div class="header">
                <b-badge variant="warning"><b-icon-emoji-sunglasses></b-icon-emoji-sunglasses> Tjänade pengar</b-badge>
            </div>
            <div class="value">
                <Value :value="netEarned" /> kr
            </div>

            <div class="header small">
                <b-badge variant="secondary">Brutto</b-badge>
            </div>
            <div class="value small">
                <Value :value="grossEarned" />
            </div>

        </div>

        <!--
            <h1>Tid i missionen <Value :value="timeSpent" /></h1>
            <h1>Tid kvar: <Value :value="timeToGo" /></h1>
            <h1>Pengar intjänat brutto: <Value :value="grossEarned" /></h1>
            <h1>Pengar intjänat netto: <Value :value="(Math.round((netEarned + Number.EPSILON) * 100) / 100).toLocaleString()" /> kr</h1>
        -->
    </div>
</template>

<script>
import moment from 'moment';
import Value from './Value'
import TimeChart from './TimeChart'

export default {
    components: {Value, TimeChart},
    data() {
        return {
            interval: '',
            timeSpent: '?',
            timeToGo: '?',
            netEarned: '',
            grossEarned: '',
            moneyEarned: 0,
            chartData: {},
            chartOptions: {
                tooltips: {
                    enabled: false,
                }
            }
        }
    },
    methods: {
        startTicker() {
            this.interval = setInterval(this.setValues, 1000);
            // this.setValues()
        },
        stopTicker() {
            clearInterval(this.interval);
        },
        setValues() {
            this.timeSpent = this.getDiffString(this.getDiffDuration(
                    moment(),
                    this.$store.state.config.startDate,
                ))
            this.timeToGo = this.getDiffString(this.getDiffDuration(
                    this.$store.state.config.endDate,
                    moment()
                ))
            
            this.netEarned = (Math.round((this.getNetEarned() + Number.EPSILON) * 100) / 100).toLocaleString(),
            this.grossEarned = (Math.round((this.getGrossEarned() + Number.EPSILON) * 100) / 100).toLocaleString()

            this.chartData = this.getChartData()
            
        },
        getDiffDuration(first, second) {
            const diff = moment(first).diff(moment(second));
            return moment.duration(diff);
        },
        getDiffString(diff) {
            const parts = [
                this.diffPart(diff.months(), 'månader'),
                this.diffPart(diff.days(), 'dagar'),
                this.diffPart(diff.hours(), 'timmar'),
                this.diffPart(diff.minutes(), 'minuter'),
                this.diffPart(diff.seconds(), 'sekunder'),
            ]
            return parts.filter(i => {
                return i !== null
            }).join(', ');
        },
        diffPart(value, unit) {
            return value > 0 ? value + ' ' + unit : null;
        },
        getGrossSallary() {
            return (parseInt(this.$store.state.config.sallary) * (this.$store.state.config.sallaryAddThird ? 1.3 : 1)) + 
                    this.$store.state.config.sallaryAddition
            
        },
        getNetSallary() {
            const taxAmount = this.getGrossSallary() * (this.$store.state.config.taxRate / Math.pow(10, 2))
            return Math.round(this.getGrossSallary() - taxAmount)
        },
        getSecondsSpent() {
            return this.getDiffDuration(moment(), this.$store.state.config.startDate).asSeconds()
        },
        getSecondsLeft() {
            return this.getDiffDuration(this.$store.state.config.endDate, moment()).asSeconds()
        },
        getGrossEarned() {
            const perSecondGross = this.getGrossSallary() / (60*60*24*30)
            return perSecondGross * this.getSecondsSpent()
        },
        getNetEarned() {
            return ((this.getTotalPayoutPerMonth() / (60*60*24*30)) * this.getSecondsSpent())
        },
        getAllowance() {
            return Math.round((485 * 30) * 0.15)
        },
        getTotalPayoutPerMonth() {
            return this.getNetSallary() + this.getAllowance()
        },
        getChartData() {
            return {
                datasets: [{
                    data: [
                        Math.max(this.getSecondsSpent(), 0),
                        Math.max(this.getSecondsLeft(), 0),
                    ],
                    backgroundColor: [
                        'rgb(255, 159, 64)',
                        'rgb(201, 203, 207)',
                    ],
                    label: 'Tid i missionen',
                }],
                labels: ['Spenderat', 'Kvar'],
            }
        }
    },
    mounted() {
        this.startTicker()
    },
    beforeDestroy() {
        this.stopTicker()
    }
}
</script>

<style scoped>
    .info {
        background-color: rgba(129, 115, 115, 0.9);
        display: flex;
        justify-content: center;
        font-weight: bold;
        font-size: 125%;
        padding-bottom: 3px;
    }

    .chart {
        max-width: 400px;
        margin: auto;
    }

    .info div {
        margin-left: 10px; margin-right: 10px;
    }

    .stats {
        width: 50%;
        margin: 3em auto 2em auto;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.5);
        padding: 1em;
    }

    .stats:last-child {
        margin-bottom: 0px;
    }

    .stats .header {
        font-size: 200%;
    }
    .stats .header.small {
        font-size: 140%;
    }

    .stats .value {
        font-size: 300%;
        font-family: monospace;
    }
    .stats .value.small {
        font-size: 150%;
    }
</style>