<script>
import { Pie, mixins } from 'vue-chartjs'

export default {
    extends: Pie,
    mixins: [mixins.reactiveProp],
    mounted() {
        this.renderChart(this.chartData, {
            responsive: true,
            tooltips: {
                enabled: false,
            }
        })
    }
}
</script>