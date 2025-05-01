export type EventAlertType = 're-entry' | 'conjunction';

export type EventAlertData = {
  isPriority: boolean;
  isStandard: boolean;
  isUkSatellitesOnly?: boolean;
  additionalRecipients: string;
};

export type EventAlertSearchParams = {
  isPriority: 'true' | 'false';
  isStandard: 'true' | 'false';
  isUkSatellitesOnly?: 'true' | 'false';
  additionalRecipients: string;
};
