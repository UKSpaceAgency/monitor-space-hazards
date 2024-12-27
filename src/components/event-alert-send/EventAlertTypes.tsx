export type EventAlertType = 're-entry' | 'conjunction';

export type EventAlertData = {
  isPriority: boolean;
  additionalRecipients: string;
};

export type EventAlertSearchParams = {
  isPriority: 'true' | 'false';
  additionalRecipients: string;
};
