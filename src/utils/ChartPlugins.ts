import type { Chart } from 'chart.js';

export const whiteBackgroundPlugin = {
  id: 'whiteBackground',
  beforeDraw: (chart: Chart) => {
    const ctx = chart.canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};
