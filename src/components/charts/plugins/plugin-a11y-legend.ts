/* eslint-disable ts/no-use-before-define */
import type { Chart, Plugin } from 'chart.js';

const chartStates = new Map();

type HitBoxMeta = {
  left: number;
  top: number;
  width: number;
  height: number;
  text: string;
  hidden: boolean;
};

class ChartLegendManager {
  hitBoxes: HitBoxMeta[] = [];

  focusBoxMargin: number;

  focusBox: HTMLDivElement;

  chart: Chart;

  canvas: Chart['canvas'];

  constructor(chart: Chart, startingMargin: number = 0) {
    this.focusBoxMargin = startingMargin;
    this.chart = chart;
    this.canvas = chart.canvas;
    this.focusBox = this._generateFocusBox();
    this.chart.canvas.insertAdjacentElement('afterend', this.focusBox);
  }

  suppressFocusBox = () => {
    this.focusBox.setAttribute('tabIndex', '-1');
  };

  reviveFocusBox = () => {
    this.focusBox.setAttribute('tabIndex', '0');
  };

  private _generateFocusBox = () => {
    const focusBox = document.createElement('div');
    focusBox.setAttribute('tabIndex', '0');
    focusBox.setAttribute('data-legend-index', '0');
    focusBox.setAttribute('role', 'option');
    focusBox.style.position = 'absolute';

    const hideFocusBox = () => {
      focusBox.style.left = '-1000px';
    };

    const activateFocusBox = (e: KeyboardEvent | MouseEvent) => {
      const index = Number(focusBox.getAttribute('data-legend-index'));
      // Fix: Chart config type access must use 'type' on chart, not chart.config
      const chartType = (this.chart as any).config?.type || (this.chart as any).type;
      if (['pie', 'doughnut'].includes(chartType)) {
        this.chart.toggleDataVisibility(index);
        const isVisible = this.chart.getDataVisibility(index);
        focusBox.setAttribute('aria-label', isVisible ? 'Selected' : 'Not selected');
      } else {
        if (this.chart.isDatasetVisible(index)) {
          this.chart.hide(index);
          focusBox.setAttribute('aria-label', 'Not selected');
        } else {
          this.chart.show(index);
          focusBox.setAttribute('aria-label', 'Selected');
        }
      }
      this.chart.update();
      e.preventDefault();
      e.stopPropagation();
    };

    const keyboardNavigation = (e: KeyboardEvent) => {
      const index = Number(focusBox.getAttribute('data-legend-index'));
      const maxIndex = this.hitBoxes.length - 1;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        if (index >= maxIndex) {
          return;
        }
        focusBox.setAttribute('data-legend-index', String(index + 1));
        moveFocusBox();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        if (index <= 0) {
          return;
        }
        focusBox.setAttribute('data-legend-index', String(index - 1));
        moveFocusBox();
        return;
      }
      if (e.key === ' ' || e.key === 'Enter') {
        activateFocusBox(e);
      }
    };

    const moveFocusBox = () => {
      const index = Number(focusBox.getAttribute('data-legend-index'));
      if (Number.isNaN(index)) {
        return;
      }

      const useOffset = this.canvas.offsetParent !== null && !['BODY', 'HTML'].includes(this.canvas.offsetParent.nodeName);

      const bbox = this.canvas.getBoundingClientRect();
      const adjustment = useOffset ? (this.canvas.offsetParent as HTMLElement).getBoundingClientRect() : { x: 0 - window.scrollX, y: 0 - window.scrollY };

      const { left, top, width, height, text, hidden } = this.hitBoxes[index] ?? { left: 0, top: 0, width: 0, height: 0, text: '', hidden: false };

      focusBox.style.left = `${bbox.x - adjustment.x + left - this.focusBoxMargin}px`;
      focusBox.style.top = `${bbox.y - adjustment.y + top - this.focusBoxMargin}px`;
      focusBox.style.width = `${width + (2 * this.focusBoxMargin)}px`;
      focusBox.style.height = `${height + (2 * this.focusBoxMargin)}px`;
      focusBox.setAttribute('aria-label', `${text}, ${hidden ? 'not selected' : 'selected'}, ${index + 1} of ${this.hitBoxes.length}`);
    };

    hideFocusBox();

    focusBox.addEventListener('focus', moveFocusBox);
    focusBox.addEventListener('blur', hideFocusBox);
    focusBox.addEventListener('keydown', keyboardNavigation);
    focusBox.addEventListener('click', activateFocusBox);

    return focusBox;
  };
}

const updateForLegends = (chart: Chart, manager: ChartLegendManager) => {
  const { legend } = chart;

  if (!legend?.legendItems) {
    return manager.suppressFocusBox();
  }

  manager.hitBoxes = legend?.legendItems?.map(({ text, hidden }, index) => {
    return {
      // @ts-expect-error - legendHitBoxes is not typed
      ...(legend.legendHitBoxes?.[index] ?? {}),
      text,
      hidden,
    };
  }) ?? [];
};

const initialize = (chart: Chart, margin: number) => {
  const manager = new ChartLegendManager(chart, margin);
  chartStates.set(chart, manager);
  return manager;
};

const plugin: Plugin = {
  id: 'a11y_legend',

  afterInit: (chart: Chart, args, options) => {
    const manager = initialize(chart, options.margin);
    updateForLegends(chart, manager);
  },

  beforeDraw: (chart, args, options) => {
    let manager = chartStates.get(chart);

    if (manager === undefined) {
      manager = initialize(chart, options.margin);
    }

    if (!chart.options.plugins?.legend?.display) {
      return manager.suppressFocusBox();
    }
    manager.reviveFocusBox();
    manager.focusBoxMargin = options.margin;
    updateForLegends(chart, manager);
  },

  afterDestroy(chart: Chart) {
    chartStates.delete(chart);
  },

  defaults: {
    margin: 4,
  },

};

export default plugin;
