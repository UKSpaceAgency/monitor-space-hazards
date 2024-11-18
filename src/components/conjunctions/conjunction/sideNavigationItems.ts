type ConjunctionSideNavigationItemsProps = {
  locales: {
    eventsSummary: string;
    pocChart: string;
    manoeuvreSupport: string;
    missDistanceChart: string;
    objectData: string;
    eventHistory: string;
    furtherInformation: string;
  };
  haveMtp: boolean;
};

export const getConjunctionSideNavigationItems = ({
  locales,
  haveMtp,
}: ConjunctionSideNavigationItemsProps) => [
  {
    name: locales.eventsSummary,
    to: '#eventSummary',
  },
  {
    name: locales.pocChart,
    to: '#pocChart',
  },
  ...(haveMtp
    ? [
        {
          name: locales.manoeuvreSupport,
          to: '#mtpChart',
        },
      ]
    : []),
  {
    name: locales.missDistanceChart,
    to: '#missDistanceChart',
  },
  {
    name: locales.objectData,
    to: '#objectData',
  },
  {
    name: locales.eventHistory,
    to: '#eventHistory',
  },
  //   {
  //     name: locales.dataValidity,
  //     to: '#dataValidity',
  //   },
  {
    name: locales.furtherInformation,
    to: '#furtherInformation',
  },
];
