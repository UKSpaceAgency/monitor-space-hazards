import type { LineAnnotationOptions } from 'chartjs-plugin-annotation';

import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';

import { chartFontFamily } from '../utils/font';
import { chartPalette } from '../utils/theme';

type Props = {
  referenceLineTitle: string | undefined;
  referenceLineValue: string | number | undefined;
  isMobile: boolean;
};

export const getReferenceLine = ({
  referenceLineTitle,
  referenceLineValue,
  isMobile,
}: Props): LineAnnotationOptions | undefined => {
  if (!referenceLineValue) {
    return;
  }

  return {
    scaleID: 'x',
    value: referenceLineValue,
    borderColor: chartPalette.darkGrey,
    borderWidth: isMobile ? 1 : 2,
    borderDash: [6, 6],
    borderDashOffset: 0,
    drawTime: 'afterDraw',
    label: {
      display: true,
      content: isMobile
        ? 'TCA'
        : `${referenceLineTitle} ${dayjs(referenceLineValue)
          .format(FORMAT_DATE_TIME)}`,
      rotation: 'auto',
      position: 'center',
      padding: {
        x: isMobile ? 3 : 10,
        y: 0,
      },
      color: chartPalette.darkGrey,
      backgroundColor: chartPalette.lightGrey,
      font: {
        family: chartFontFamily,
        size: isMobile ? 10 : 14,
        lineHeight: 1,
        weight: 'bold',
        style: 'normal',
      },
    },
  };
};
