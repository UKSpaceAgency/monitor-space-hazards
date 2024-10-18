export const AppConfig = {
  name: 'Monitor Space Hazards',
  locales: ['en'],
  defaultLocale: 'en',
  footerNavigation: [
    {
      title: 'About',
      items: [
        {
          children: 'Conjunction event analysis information',
          href: '/page/conjunction-analysis-information',
        },
        {
          children: 'Re-entry event analysis information',
          href: '/page/re-entry-analysis-information',
        },

        {
          children: 'Definitions',
          href: '/page/definitions',
        },
        {
          children: 'Demonstration video',
          href: 'https://www.youtube.com/watch?v=7xgaBjXGGNM',
          target: '_blank',
        },
        {
          children: 'Performance monitoring',
          href: '/performance-monitoring',
        },
        {
          children: 'Service status',
          href: 'https://status.monitor-space-hazards.service.gov.uk',
          target: '_blank',
        },
        {
          children: 'Roadmap',
          href: '/page/roadmap',
        },
      ],
    },
    {
      title: 'How to use',
      items: [
        {
          children: 'Support and guidance',
          href: '/page/support-and-guidance',
        },
        {
          children: 'How to use the API',
          href: 'https://mys-tech-docs.onrender.com/ways-of-working/use-the-api/use-the-api.html',
          target: '_blank',
        },
        {
          children: 'API documentation (swagger)',
          href: 'https://api.monitor-space-hazards.service.gov.uk/docs',
          target: '_blank',
        },
        {
          children: 'How to manage ephemeris',
          href: 'https://mys-tech-docs.onrender.com/ways-of-working/manage-ephemeris/manage-ephemeris.html',
          target: '_blank',
        },
      ],
    },
    {
      title: 'Legal terms',
      items: [
        {
          children: 'Terms and conditions',
          href: '/account/terms-and-conditions',
        },
        {
          children: 'Data privacy notice',
          href: '/data-privacy-notice',
        },
        {
          children: 'Accessibility statement',
          href: '/page/accessibility-statement',
        },
        {
          children: 'Cookies',
          href: '/cookies',
        },
      ],
    },
  ],
};
