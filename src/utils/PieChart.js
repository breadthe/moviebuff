import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['data', 'labels', 'colors', 'options'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: '',
          backgroundColor: this.colors,
          data: this.data
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
