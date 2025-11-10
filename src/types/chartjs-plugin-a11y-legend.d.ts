declare module 'chartjs-plugin-a11y-legend' {
  import type { Plugin } from 'chart.js';

  const plugin: Plugin<'pie' | 'doughnut' | 'line' | 'bar' | 'radar' | 'scatter' | 'bubble'>;
  export default plugin;
}
