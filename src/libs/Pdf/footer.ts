export const Footer = () => {
  return [
    {
      text: [
        'Produced by ',
        {
          text: 'National Space Operations Centre.',
          bold: true,
        },
      ],
      lineHeight: 1.5,
    },
    {
      text: [
        'Details are available on the Monitor Space Hazards website ',
        {
          text: 'https://www.monitor-space-hazards.service.gov.uk',
          link: 'https://www.monitor-space-hazards.service.gov.uk',
        },
      ],
      fontSize: 10,
      lineHeight: 1.5,
    },
    {
      text: 'All content is available under the Open Government Licence v3.0, except where otherwise stated.',
      fontSize: 10,
      lineHeight: 1.5,
    },
  ];
};
