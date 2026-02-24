/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** ActivityEvent */
export interface TypeActivityEvent {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Short Id */
  short_id: string;
  /** Year */
  year: number;
  /** Event Number */
  event_number: number;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /**
   * Flag Date
   * @format date-time
   */
  flag_date: string;
  /** Flag Id */
  flag_id: string;
  /** Flag Count */
  flag_count: number;
  primary_flag: TypeActivityPrimaryFlag;
  /**
   * Priority Flag
   * @default false
   */
  priority_flag?: boolean;
  /** Flag Comment */
  flag_comment?: string | null;
  reason_for_flag?: TypeActivityReasonForFlag | null;
  /** Total Tle Count This Month */
  total_tle_count_this_month?: number | null;
  /**
   * Latest Tle Epoch
   * @format date-time
   */
  latest_tle_epoch: string;
  /** Report Number */
  report_number: number;
  /**
   * Report Time
   * @format date-time
   */
  report_time: string;
  orbit_type: TypeAffectedRegime;
  /** Common Name */
  common_name: string;
  /** Norad Id */
  norad_id: string;
  /** Object Type */
  object_type?: string | null;
  /** International Designator */
  international_designator?: string | null;
  /**
   * Operator
   * @format uuid
   */
  operator: string;
  /** Licensing Country */
  licensing_country?: string | null;
  /** Period */
  period?: number | null;
  /** Apogee */
  apogee?: number | null;
  /** Perigee */
  perigee?: number | null;
  /** Altitude */
  altitude: number;
  /** Longitude */
  longitude: number;
  /** Inclination */
  inclination?: number | null;
}

/** ActivityEventOut */
export interface TypeActivityEventOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Short Id */
  short_id: string;
  /** Year */
  year: number;
  /** Event Number */
  event_number: number;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /**
   * Flag Date
   * @format date-time
   */
  flag_date: string;
  /** Flag Id */
  flag_id: string;
  /** Flag Count */
  flag_count: number;
  primary_flag: TypeActivityPrimaryFlag;
  /**
   * Priority Flag
   * @default false
   */
  priority_flag?: boolean;
  /** Flag Comment */
  flag_comment?: string | null;
  reason_for_flag?: TypeActivityReasonForFlag | null;
  /** Total Tle Count This Month */
  total_tle_count_this_month?: number | null;
  /**
   * Latest Tle Epoch
   * @format date-time
   */
  latest_tle_epoch: string;
  /** Report Number */
  report_number: number;
  /**
   * Report Time
   * @format date-time
   */
  report_time: string;
  orbit_type: TypeAffectedRegime;
  /** Common Name */
  common_name: string;
  /** Norad Id */
  norad_id: string;
  /** Object Type */
  object_type?: string | null;
  /** International Designator */
  international_designator?: string | null;
  /**
   * Operator
   * @format uuid
   */
  operator: string;
  /** Licensing Country */
  licensing_country?: string | null;
  /** Period */
  period?: number | null;
  /** Apogee */
  apogee?: number | null;
  /** Perigee */
  perigee?: number | null;
  /** Altitude */
  altitude: number;
  /** Longitude */
  longitude: number;
  /** Inclination */
  inclination?: number | null;
  /** Operator Name */
  operator_name: string;
}

/** ActivityEventsSortBy */
export type TypeActivityEventsSortBy =
  | "created_at"
  | "updated_at"
  | "flag_date"
  | "norad_id"
  | "short_id"
  | "common_name"
  | "operator_name"
  | "orbit_type"
  | "flag_id"
  | "altitude"
  | "longitude";

/** ActivityPrimaryFlag */
export type TypeActivityPrimaryFlag =
  | "TLE Date Age"
  | "Fixed SMA"
  | "SMA Delta"
  | "Fixed Inc"
  | "Inc Delta"
  | "Fixed Long"
  | "Long Delta";

/** ActivityReasonForFlag */
export type TypeActivityReasonForFlag =
  | "Unexpected position change"
  | "Manoeuvre not as planned"
  | "Manoeuvre as planned"
  | "Missing data";

/** ActivityReport */
export interface TypeActivityReport {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Short Id */
  short_id: string | null;
  /** File Name */
  file_name: string;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /**
   * Flag Date
   * @format date-time
   */
  flag_date: string;
  /** Flag Id */
  flag_id: string;
  /** Flag Count */
  flag_count: number;
  primary_flag: TypeActivityPrimaryFlag;
  /**
   * Priority Flag
   * @default false
   */
  priority_flag?: boolean;
  /** Flag Comment */
  flag_comment?: string | null;
  /**
   * Flag Ongoing
   * @default false
   */
  flag_ongoing?: boolean;
  reason_for_flag?: TypeActivityReasonForFlag | null;
  /** Total Tle Count This Month */
  total_tle_count_this_month?: number | null;
  /**
   * Latest Tle Epoch
   * @format date-time
   */
  latest_tle_epoch: string;
  /** Report Number */
  report_number: number;
  /**
   * Report Time
   * @format date-time
   */
  report_time: string;
  orbit_type: TypeAffectedRegime;
  /** Common Name */
  common_name: string;
  /** Norad Id */
  norad_id: string;
  /** Object Type */
  object_type?: string | null;
  /** International Designator */
  international_designator?: string | null;
  /**
   * Operator
   * @format uuid
   */
  operator: string;
  /** Licensing Country */
  licensing_country?: string | null;
  /** Period */
  period?: number | null;
  /** Apogee */
  apogee?: number | null;
  /** Perigee */
  perigee?: number | null;
  /** Altitude */
  altitude: number;
  /** Longitude */
  longitude: number;
  /** Inclination */
  inclination?: number | null;
  /** Uploaded By Id */
  uploaded_by_id?: string | null;
  /** Deleted By Id */
  deleted_by_id?: string | null;
}

/** ActivityReportOut */
export interface TypeActivityReportOut {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Activity Event Short Id */
  activity_event_short_id: string;
  /** File Name */
  file_name: string;
  /** Presigned Url */
  presigned_url?: string | null;
  /** Uploaded By Id */
  uploaded_by_id?: string | null;
  /** Deleted By Id */
  deleted_by_id?: string | null;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /**
   * Flag Date
   * @format date-time
   */
  flag_date: string;
  /** Flag Id */
  flag_id: string;
  /** Flag Count */
  flag_count: number;
  primary_flag: TypeActivityPrimaryFlag;
  /**
   * Priority Flag
   * @default false
   */
  priority_flag?: boolean;
  /** Flag Comment */
  flag_comment?: string | null;
  /** Flag Status */
  flag_status?: boolean | null;
  reason_for_flag?: TypeActivityReasonForFlag | null;
  /** Total Tle Count This Month */
  total_tle_count_this_month?: number | null;
  /**
   * Latest Tle Epoch
   * @format date-time
   */
  latest_tle_epoch: string;
  /** Report Number */
  report_number: number;
  /**
   * Report Time
   * @format date-time
   */
  report_time: string;
  orbit_type: TypeAffectedRegime;
  /** Common Name */
  common_name: string;
  /** Norad Id */
  norad_id: string;
  /** Object Type */
  object_type?: string | null;
  /** International Designator */
  international_designator?: string | null;
  /**
   * Operator
   * @format uuid
   */
  operator: string;
  /** Licensing Country */
  licensing_country?: string | null;
  /** Period */
  period?: number | null;
  /** Apogee */
  apogee?: number | null;
  /** Perigee */
  perigee?: number | null;
  /** Altitude */
  altitude: number;
  /** Longitude */
  longitude: number;
  /** Inclination */
  inclination?: number | null;
}

/** ActivityReportsSortBy */
export type TypeActivityReportsSortBy =
  | "created_at"
  | "updated_at"
  | "flag_date"
  | "norad_id"
  | "short_id"
  | "common_name"
  | "operator_name"
  | "orbit_type"
  | "flag_id"
  | "report_number";

/** AffectedRegime */
export type TypeAffectedRegime = "GEO" | "LEO" | "MEO" | "Lunar";

/** AlertDryRunOut */
export interface TypeAlertDryRunOut {
  /** Email Recipients */
  email_recipients: TypeUserOut[];
  /** Sms Recipients */
  sms_recipients: TypeUserOut[];
  /** Additional Emails */
  additional_emails: string[];
}

/** AlertSettingsDistributionList */
export interface TypeAlertSettingsDistributionList {
  /**
   * User Id
   * @format uuid
   */
  user_id: string;
  /** First Name */
  first_name: string | null;
  /** Last Name */
  last_name: string | null;
  /** Phone Number */
  phone_number: string | null;
  /** Email */
  email: string;
  /** Organization Name */
  organization_name: string;
  conjunction_alert_settings: TypeConjunctionAlertSettings | null;
  reentry_alert_settings: TypeReentryAlertSettings | null;
  fragmentation_alert_settings: TypeFragmentationAlertSettings | null;
}

/** AlertSettingsIn */
export interface TypeAlertSettingsIn {
  conjunction_alert_settings: TypeConjunctionAlertSettings;
  reentry_alert_settings: TypeReentryAlertSettings;
  fragmentation_alert_settings: TypeFragmentationAlertSettings;
}

/** AlertSettingsOut */
export interface TypeAlertSettingsOut {
  conjunction_alert_settings?: TypeConjunctionAlertSettings | null;
  reentry_alert_settings?: TypeReentryAlertSettings | null;
  fragmentation_alert_settings?: TypeFragmentationAlertSettings | null;
}

/** AnalysesSortBy */
export type TypeAnalysesSortBy =
  | "cdm_external_id"
  | "created_at"
  | "collision_probability"
  | "deleted_by_id"
  | "event_short_id"
  | "miss_distance"
  | "primary_object_norad_id"
  | "radial_miss_distance"
  | "restored_by_id"
  | "secondary_object_norad_id"
  | "tca_time"
  | "updated_at"
  | "update_time"
  | "uploaded_by_id"
  | "uploaded_by_email";

/** Analysis */
export interface TypeAnalysis {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /**
   * Tca Time
   * @format date-time
   */
  tca_time: string;
  /**
   * Collision Probability
   * @min 0
   * @max 1
   */
  collision_probability: number;
  /** Collision Probability Method */
  collision_probability_method: string;
  /**
   * Update Time
   * @format date-time
   */
  update_time: string;
  /** Cdm External Id */
  cdm_external_id: string;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean | null;
  /** Miss Distance */
  miss_distance: number;
  /** Radial Miss Distance */
  radial_miss_distance?: number | null;
  /** Intrack Miss Distance */
  intrack_miss_distance?: number | null;
  /** Crosstrack Miss Distance */
  crosstrack_miss_distance?: number | null;
  miss_distance_uncertainty?: TypeMissDistanceUncertainty | null;
  /** Altitude */
  altitude?: number | null;
  /** Latitude */
  latitude?: number | null;
  /** Longitude */
  longitude?: number | null;
  /** Relative Velocity */
  relative_velocity?: number | null;
  /** Combined Mass */
  combined_mass?: number | null;
  /** Possible Fragments */
  possible_fragments?: number | null;
  /** Primary Object Norad Id */
  primary_object_norad_id: string;
  /** Secondary Object Norad Id */
  secondary_object_norad_id: string;
  primary_object_observations_data?: TypeSatelliteObservationsData | null;
  secondary_object_observations_data?: TypeSatelliteObservationsData | null;
  /**
   * Event Id
   * @format uuid
   */
  event_id: string;
  /** Event Short Id */
  event_short_id: string;
  /** Uploaded By Id */
  uploaded_by_id?: string | null;
  /** Deleted By Id */
  deleted_by_id?: string | null;
  /** Restored By Id */
  restored_by_id?: string | null;
}

/** AnalysisOut */
export interface TypeAnalysisOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /**
   * Tca Time
   * @format date-time
   */
  tca_time: string;
  /**
   * Collision Probability
   * @min 0
   * @max 1
   */
  collision_probability: number;
  /** Collision Probability Method */
  collision_probability_method: string;
  /**
   * Update Time
   * @format date-time
   */
  update_time: string;
  /** Cdm External Id */
  cdm_external_id: string;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean | null;
  /** Miss Distance */
  miss_distance: number;
  /** Radial Miss Distance */
  radial_miss_distance?: number | null;
  /** Intrack Miss Distance */
  intrack_miss_distance?: number | null;
  /** Crosstrack Miss Distance */
  crosstrack_miss_distance?: number | null;
  miss_distance_uncertainty?: TypeMissDistanceUncertainty | null;
  /** Altitude */
  altitude?: number | null;
  /** Latitude */
  latitude?: number | null;
  /** Longitude */
  longitude?: number | null;
  /** Relative Velocity */
  relative_velocity?: number | null;
  /** Combined Mass */
  combined_mass?: number | null;
  /** Possible Fragments */
  possible_fragments?: number | null;
  /** Primary Object Norad Id */
  primary_object_norad_id: string;
  /** Secondary Object Norad Id */
  secondary_object_norad_id: string;
  primary_object_observations_data?: TypeSatelliteObservationsData | null;
  secondary_object_observations_data?: TypeSatelliteObservationsData | null;
  /**
   * Event Id
   * @format uuid
   */
  event_id: string;
  /** Event Short Id */
  event_short_id: string;
  /** Uploaded By Id */
  uploaded_by_id?: string | null;
  /** Deleted By Id */
  deleted_by_id?: string | null;
  /** Restored By Id */
  restored_by_id?: string | null;
  /** Uploaded By Email */
  uploaded_by_email?: string | null;
  /** Deleted By Email */
  deleted_by_email?: string | null;
  /** Restored By Email */
  restored_by_email?: string | null;
}

/** AreaOfInterest */
export type TypeAreaOfInterest =
  | "ENGLAND"
  | "NORTHERN_IRELAND"
  | "SCOTLAND"
  | "WALES"
  | "BRITISH_OVERSEAS_TERRITORIES"
  | "SHANWICK"
  | "NAVAREA"
  | "LONDON_FIR"
  | "SCOTLAND_FIR"
  | "REST_OF_THE_WORLD";

/** BannerMessage */
export interface TypeBannerMessage {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Content */
  content: string;
  severity?: TypeBannerMessageSeverity | null;
  /** Title */
  title: string;
  /** Is Active */
  is_active: boolean;
  /**
   * Created By Id
   * @format uuid
   */
  created_by_id: string;
}

/** BannerMessageIn */
export interface TypeBannerMessageIn {
  /** Content */
  content: string;
  /** @default "Low" */
  severity?: TypeBannerMessageSeverity | null;
  /** Title */
  title: string;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
}

/** BannerMessageSeverity */
export type TypeBannerMessageSeverity = "Low" | "Medium" | "High";

/** BannerMessageUpdate */
export interface TypeBannerMessageUpdate {
  /**
   * Message Id
   * @format uuid
   */
  message_id: string;
  /** Content */
  content?: string | null;
  /** @default "Low" */
  severity?: TypeBannerMessageSeverity | null;
  /** Title */
  title?: string | null;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean | null;
}

/** BannerMessagesBroadcastedOut */
export interface TypeBannerMessagesBroadcastedOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Content */
  content: string;
  severity?: TypeBannerMessageSeverity | null;
  /** Title */
  title: string;
  /** Is Active */
  is_active: boolean;
  /**
   * Created By Id
   * @format uuid
   */
  created_by_id: string;
  /**
   * Broadcast Start
   * @format date-time
   */
  broadcast_start: string;
  /**
   * Broadcast End
   * @format date-time
   */
  broadcast_end: string;
  /**
   * Message Id
   * @format uuid
   */
  message_id: string;
  /**
   * Set By Id
   * @format uuid
   */
  set_by_id: string;
}

/** BannerMessagesOut */
export interface TypeBannerMessagesOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Content */
  content: string;
  severity?: TypeBannerMessageSeverity | null;
  /** Title */
  title: string;
  /** Is Active */
  is_active: boolean;
  /**
   * Created By Id
   * @format uuid
   */
  created_by_id: string;
  /** Email */
  email: string;
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
}

/** BannerMessagesSortBy */
export type TypeBannerMessagesSortBy = "severity" | "title" | "created_by_id" | "created_at" | "updated_at";

/** BannerSchedule */
export interface TypeBannerSchedule {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /**
   * Broadcast Start
   * @format date-time
   */
  broadcast_start: string;
  /**
   * Broadcast End
   * @format date-time
   */
  broadcast_end: string;
  /** Is Active */
  is_active: boolean;
  /**
   * Message Id
   * @format uuid
   */
  message_id: string;
  /**
   * Set By Id
   * @format uuid
   */
  set_by_id: string;
}

/** BannerScheduleIn */
export interface TypeBannerScheduleIn {
  /**
   * Broadcast Start
   * @format date-time
   */
  broadcast_start: string;
  /**
   * Broadcast End
   * @format date-time
   */
  broadcast_end: string;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /**
   * Message Id
   * @format uuid
   */
  message_id: string;
}

/** BannerSchedulesOut */
export interface TypeBannerSchedulesOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /**
   * Broadcast Start
   * @format date-time
   */
  broadcast_start: string;
  /**
   * Broadcast End
   * @format date-time
   */
  broadcast_end: string;
  /** Is Active */
  is_active: boolean;
  /**
   * Message Id
   * @format uuid
   */
  message_id: string;
  /**
   * Set By Id
   * @format uuid
   */
  set_by_id: string;
  /** Title */
  title: string;
  /** Content */
  content: string;
}

/** BannerSchedulesSortBy */
export type TypeBannerSchedulesSortBy =
  | "broadcast_start"
  | "broadcast_end"
  | "title"
  | "set_by_id"
  | "created_by_id"
  | "created_at"
  | "updated_at"
  | "severity";

/** Body_create_analysis_v1_analyses__post */
export interface TypeBodyCreateAnalysisV1AnalysesPost {
  /**
   * Json File
   * @format binary
   */
  json_file: File;
  /** Event Short Id */
  event_short_id: string;
}

/** Body_create_ephemeris_v1_ephemeris__post */
export interface TypeBodyCreateEphemerisV1EphemerisPost {
  /**
   * Object Id
   * Satellite NORAD ID, must match value given in .oem filename
   */
  object_id: string;
  /**
   * File
   * .oem compatible file. Filename MUST contain NORAD_ID and must match MEME_xxxxx_yyyy... pattern, where xxxxx is NORAD ID.
   * @format binary
   */
  file: File;
}

/** Body_post_activity_event_report_v1_activity_reports__post */
export interface TypeBodyPostActivityEventReportV1ActivityReportsPost {
  /**
   * File
   * @format binary
   */
  file: File;
}

/** Body_post_conjunction_report_v1_conjunction_reports__post */
export interface TypeBodyPostConjunctionReportV1ConjunctionReportsPost {
  /**
   * File
   * @format binary
   */
  file: File;
}

/** Body_post_fragmentation_event_report_v1_fragmentation_reports__post */
export interface TypeBodyPostFragmentationEventReportV1FragmentationReportsPost {
  /**
   * File
   * @format binary
   */
  file: File;
}

/** Body_upload_manoeuvre_plot_file_v1_manoeuvre_plots__post */
export interface TypeBodyUploadManoeuvrePlotFileV1ManoeuvrePlotsPost {
  /**
   * File
   * .mtp JSON file
   * @format binary
   */
  file: File;
}

/** Body_upload_reentry_event_report_v1_reentry_event_reports__post */
export interface TypeBodyUploadReentryEventReportV1ReentryEventReportsPost {
  /**
   * File
   * @format binary
   */
  file: File;
}

/** Body_upload_tracking_and_impact_prediction_file_v1_tips__post */
export interface TypeBodyUploadTrackingAndImpactPredictionFileV1TipsPost {
  /**
   * File
   * @format binary
   */
  file: File;
}

/** CDMOut */
export interface TypeCDMOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** External Id */
  external_id?: string | null;
  /**
   * Event Id
   * @format uuid
   */
  event_id: string;
}

/** CDMType */
export type TypeCDMType =
  | "SSN observations"
  | "Operational owner/operator ephemeris"
  | "NASA/CARA"
  | "Special owner/operator ephemeris"
  | "Unknown ephemeris";

/** ConjunctionAlertSettings */
export interface TypeConjunctionAlertSettings {
  /**
   * Alert Type
   * @default "conjunction"
   */
  alert_type?: "conjunction";
  /** Chosen Option */
  chosen_option: "all" | "priority" | "uk-licensed" | "closedown" | "none";
  /**
   * Notification Types
   * @uniqueItems true
   * @default []
   */
  notification_types?: TypeNotificationType[];
}

/** ConjunctionEventAlertIn */
export interface TypeConjunctionEventAlertIn {
  /** Alert Type */
  alert_type: ("standard" | "priority" | "uk-licensed" | "closedown")[];
  /** Additional Emails */
  additional_emails: string[];
}

/** ConjunctionEventAlertOut */
export interface TypeConjunctionEventAlertOut {
  /** Conjunction Event Short Id */
  conjunction_event_short_id: string;
  /**
   * Conjunction Report Id
   * @format uuid
   */
  conjunction_report_id: string;
  /** Alert Type */
  alert_type: ("standard" | "priority" | "uk-licensed" | "closedown")[];
  /** Additional Recipients */
  additional_recipients: string[] | null;
  /** Email Notification Sending Status */
  email_notification_sending_status: "scheduled" | "in-progress" | "delivered";
  /** Sms Notification Sending Status */
  sms_notification_sending_status: "scheduled" | "in-progress" | "delivered";
}

/** ConjunctionEventCount */
export interface TypeConjunctionEventCount {
  /**
   * Conjunction Event Alert Count
   * @default 0
   */
  conjunction_event_alert_count?: number;
  /**
   * Conjunction Event Normal Count
   * @default 0
   */
  conjunction_event_normal_count?: number;
  /** Conjunction Event Total Count */
  conjunction_event_total_count: number;
}

/** ConjunctionReportOut */
export interface TypeConjunctionReportOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Short Id */
  short_id: string;
  /** Report Number */
  report_number: number;
  /** Report Time */
  report_time?: string | null;
  risk: TypeRisk;
  /** Closed Comment */
  closed_comment?: string | null;
  /** Alert Type */
  alert_type: ("priority" | "standard" | "uk-licensed" | "closedown")[];
  /** Tca Time */
  tca_time?: string | null;
  /** Collision Probability */
  collision_probability: number;
  /** Manoeuvre Expected */
  manoeuvre_expected?: string | null;
  /** Primary Object Common Name */
  primary_object_common_name: string;
  /** Primary Object Norad Id */
  primary_object_norad_id: string;
  /** Primary Object Licensing Country */
  primary_object_licensing_country?: string | null;
  /** Primary Object Type */
  primary_object_type?: string | null;
  /** Primary Object Mission */
  primary_object_mission?: string | null;
  /** Primary Object Mass */
  primary_object_mass?: number | null;
  /** Primary Object Manoeuvrable */
  primary_object_manoeuvrable?: string | null;
  /** Secondary Object Common Name */
  secondary_object_common_name: string;
  /** Secondary Object Norad Id */
  secondary_object_norad_id: string;
  /** Secondary Object Licensing Country */
  secondary_object_licensing_country?: string | null;
  /** Secondary Object Type */
  secondary_object_type?: string | null;
  /** Secondary Object Mission */
  secondary_object_mission?: string | null;
  /** Secondary Object Mass */
  secondary_object_mass?: number | null;
  /** Secondary Object Manoeuvrable */
  secondary_object_manoeuvrable?: string | null;
  /** Executive Summary Comment */
  executive_summary_comment?: string | null;
  /** Manoeuvre Comment */
  manoeuvre_comment?: string | null;
  /** Immediate Impact Comment */
  immediate_impact_comment?: string | null;
  /** Short Term Impact Comment */
  short_term_impact_comment?: string | null;
  /** Risk At Altitude Comment */
  risk_at_altitude_comment?: string | null;
  /** Long Term Impact Comment */
  long_term_impact_comment?: string | null;
  /** Uk Response Comment */
  uk_response_comment?: string | null;
  /** Press Attention Comment */
  press_attention_comment?: string | null;
  /** Miss Distance */
  miss_distance?: number | null;
  /** Impact Speed */
  impact_speed?: number | null;
  /** Altitude */
  altitude?: number | null;
  /** Latitude */
  latitude?: number | null;
  /** Longitude */
  longitude?: number | null;
  /** Predicted Fragments */
  predicted_fragments?: number | null;
  /** Increase In Future Collisions */
  increase_in_future_collisions?: number | null;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /** Uploaded By Id */
  uploaded_by_id?: string | null;
  /** Deleted By Id */
  deleted_by_id?: string | null;
  /** Presigned Url */
  presigned_url?: string | null;
  /** File Name */
  file_name: string;
}

/** ContactAnalystIn */
export interface TypeContactAnalystIn {
  /** Event Id */
  event_id: string;
  /** Message Content */
  message_content?: string | null;
  /** Cc Email */
  cc_email?: string | null;
}

/** DataSource */
export type TypeDataSource = "Space-Track CDM" | "UKSA Analysis";

/** DataSourcesOut */
export interface TypeDataSourcesOut {
  /** Space Track Cdm */
  space_track_cdm: TypeEventDataSource[];
  /** Uksa Analysis */
  uksa_analysis: TypeEventDataSource[];
}

/** EphemerisOut */
export interface TypeEphemerisOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Is Active */
  is_active?: boolean | null;
  /**
   * Creation Date
   * @format date-time
   */
  creation_date: string;
  /** Originator */
  originator: string;
  /** Object Name */
  object_name: string;
  /** International Designator */
  international_designator: string;
  ref_frame: TypeReferenceFrame;
  time_system: TypeTimeSystem;
  /**
   * Start Time
   * @format date-time
   */
  start_time: string;
  /**
   * Stop Time
   * @format date-time
   */
  stop_time: string;
  /** Center Name */
  center_name: string;
  /** File Name */
  file_name: string;
  /** Satellite */
  satellite: string;
  /**
   * Uploader
   * @format uuid
   */
  uploader: string;
  /**
   * Uploader Organization
   * @format uuid
   */
  uploader_organization: string;
  /** Deleted By Id */
  deleted_by_id?: string | null;
  /** Restored By Id */
  restored_by_id?: string | null;
  /** Uploaded By Email */
  uploaded_by_email?: string | null;
  /** Uploaded By Organization Name */
  uploaded_by_organization_name?: string | null;
}

/** EphemerisSortBy */
export type TypeEphemerisSortBy =
  | "updated_at"
  | "uploader"
  | "file_name"
  | "creation_date"
  | "international_designator"
  | "satellite"
  | "uploader_organization"
  | "originator"
  | "object_name";

/** Epoch */
export type TypeEpoch = "future" | "past" | "all";

/** EventCDMOut */
export interface TypeEventCDMOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Short Id */
  short_id: string;
  /** Primary Object Norad Id */
  primary_object_norad_id: string;
  /** Secondary Object Norad Id */
  secondary_object_norad_id: string;
  /** Primary Object Common Name */
  primary_object_common_name?: string | null;
  /** Secondary Object Common Name */
  secondary_object_common_name?: string | null;
  /**
   * Tca Time
   * @format date-time
   */
  tca_time: string;
  /** Collision Probability */
  collision_probability?: number | null;
  /** Collision Probability Method */
  collision_probability_method?: string | null;
  data_source: TypeDataSource;
  /** Miss Distance */
  miss_distance: number;
  /** Radial Miss Distance */
  radial_miss_distance?: number | null;
  /** Intrack Miss Distance */
  intrack_miss_distance?: number | null;
  /** Crosstrack Miss Distance */
  crosstrack_miss_distance?: number | null;
  /** Altitude */
  altitude?: number | null;
  /** Latitude */
  latitude?: number | null;
  /** Longitude */
  longitude?: number | null;
  /** Relative Velocity */
  relative_velocity?: number | null;
  /** Combined Mass */
  combined_mass?: number | null;
  /** Possible Fragments */
  possible_fragments?: number | null;
  /** Cdm Creation Date */
  cdm_creation_date?: string | null;
  /** Cdm External Id */
  cdm_external_id: string;
}

/** EventDataSource */
export interface TypeEventDataSource {
  data_source?: TypeDataSource | null;
  /** Data Received */
  data_received?: string | null;
  /** Observations Number */
  observations_number?: number | null;
  /** Observations Timespan */
  observations_timespan?: number | null;
  /** Norad Id */
  norad_id: string;
  /** Ephemeris Name */
  ephemeris_name?: string | null;
}

/** EventForAnalysisOut */
export interface TypeEventForAnalysisOut {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Short Id */
  short_id: string;
  /** Cdm External Id */
  cdm_external_id: string;
  /** Primary Object Norad Id */
  primary_object_norad_id: string;
  /** Secondary Object Norad Id */
  secondary_object_norad_id: string;
  /** Primary Object Common Name */
  primary_object_common_name: string;
  /** Secondary Object Common Name */
  secondary_object_common_name: string;
  /**
   * Tca Time
   * @format date-time
   */
  tca_time: string;
  /** Collision Probability */
  collision_probability?: number | null;
  /** Collision Probability Method */
  collision_probability_method?: string | null;
  /** Miss Distance */
  miss_distance: number;
  /** Primary Object Span */
  primary_object_span?: number | null;
  /** Primary Object Diameter */
  primary_object_diameter?: number | null;
  /** Primary Object Shape */
  primary_object_shape?: string | null;
  /** Primary Object Mass */
  primary_object_mass?: number | null;
  /** Primary Object Height */
  primary_object_height?: number | null;
  /** Primary Object Depth */
  primary_object_depth?: number | null;
  /** Primary Object Width */
  primary_object_width?: number | null;
  /** Primary Object Cross Section Min */
  primary_object_cross_section_min?: number | null;
  /** Primary Object Cross Section Avg */
  primary_object_cross_section_avg?: number | null;
  /** Primary Object Cross Section Max */
  primary_object_cross_section_max?: number | null;
  /** Secondary Object Span */
  secondary_object_span?: number | null;
  /** Secondary Object Diameter */
  secondary_object_diameter?: number | null;
  /** Secondary Object Shape */
  secondary_object_shape?: string | null;
  /** Secondary Object Mass */
  secondary_object_mass?: number | null;
  /** Secondary Object Height */
  secondary_object_height?: number | null;
  /** Secondary Object Depth */
  secondary_object_depth?: number | null;
  /** Secondary Object Width */
  secondary_object_width?: number | null;
  /** Secondary Object Cross Section Min */
  secondary_object_cross_section_min?: number | null;
  /** Secondary Object Cross Section Avg */
  secondary_object_cross_section_avg?: number | null;
  /** Secondary Object Cross Section Max */
  secondary_object_cross_section_max?: number | null;
}

/** EventLevel */
export type TypeEventLevel = "Event" | "Alert";

/** EventOut */
export interface TypeEventOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Short Id */
  short_id: string;
  /** Primary Object Norad Id */
  primary_object_norad_id: string;
  /** Secondary Object Norad Id */
  secondary_object_norad_id: string;
  /** Primary Object Common Name */
  primary_object_common_name?: string | null;
  /** Secondary Object Common Name */
  secondary_object_common_name?: string | null;
  /**
   * Tca Time
   * @format date-time
   */
  tca_time: string;
  /** Collision Probability */
  collision_probability?: number | null;
  /** Collision Probability Method */
  collision_probability_method?: string | null;
  data_source: TypeDataSource;
  /** Miss Distance */
  miss_distance: number;
  /** Radial Miss Distance */
  radial_miss_distance?: number | null;
  /** Intrack Miss Distance */
  intrack_miss_distance?: number | null;
  /** Crosstrack Miss Distance */
  crosstrack_miss_distance?: number | null;
  /** Altitude */
  altitude?: number | null;
  /** Latitude */
  latitude?: number | null;
  /** Longitude */
  longitude?: number | null;
  /** Relative Velocity */
  relative_velocity?: number | null;
  /** Combined Mass */
  combined_mass?: number | null;
  /** Possible Fragments */
  possible_fragments?: number | null;
  /** Cdm Creation Date */
  cdm_creation_date?: string | null;
  /** Cdm External Id */
  cdm_external_id?: string | null;
  user_interest: TypeUserInterest;
  additional_analysis?: TypeAdditionalAnalysis | null;
  /** Report Number */
  report_number?: number | null;
  /** Collision Probability Uksa */
  collision_probability_uksa?: number | null;
  risk?: TypeRisk | null;
}

/** EventSatellitesOut */
export interface TypeEventSatellitesOut {
  /** Short Id */
  short_id: string;
  primary_object: TypeSatelliteOut;
  secondary_object: TypeSatelliteOut | null;
}

/** EventSummaryOut */
export interface TypeEventSummaryOut {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Short Id */
  short_id: string;
  /**
   * Update Time
   * @format date-time
   */
  update_time: string;
  /** Cdm Id */
  cdm_id?: string | null;
  /** Cdm External Id */
  cdm_external_id: string;
  /** Primary Object Ephemeris Name */
  primary_object_ephemeris_name?: string | null;
  /** Secondary Object Ephemeris Name */
  secondary_object_ephemeris_name?: string | null;
  /** Primary Object Norad Id */
  primary_object_norad_id: string;
  /** Secondary Object Norad Id */
  secondary_object_norad_id: string;
  /**
   * Tca Time
   * @format date-time
   */
  tca_time: string;
  /** Collision Probability */
  collision_probability?: number | null;
  /** Collision Probability Method */
  collision_probability_method?: string | null;
  data_source: TypeDataSource;
  /** Miss Distance */
  miss_distance: number;
  /** Radial Miss Distance */
  radial_miss_distance?: number | null;
  /** Intrack Miss Distance */
  intrack_miss_distance?: number | null;
  /** Crosstrack Miss Distance */
  crosstrack_miss_distance?: number | null;
  primary_object_uncertainties?: TypePositionUncertainty | null;
  secondary_object_uncertainties?: TypePositionUncertainty | null;
  primary_object_cdm_type?: TypeCDMType | null;
  secondary_object_cdm_type?: TypeCDMType | null;
  /** Altitude */
  altitude?: number | null;
  /** Latitude */
  latitude?: number | null;
  /** Longitude */
  longitude?: number | null;
  /** Relative Velocity */
  relative_velocity?: number | null;
  /** Combined Mass */
  combined_mass?: number | null;
  /** Possible Fragments */
  possible_fragments?: number | null;
  /** Primary Object Size */
  primary_object_size?: number | null;
  /** Secondary Object Size */
  secondary_object_size?: number | null;
}

/** EventsByCDMExternalIDSortBy */
export type TypeEventsByCDMExternalIDSortBy =
  | "primary_object_norad_id"
  | "primary_object_common_name"
  | "secondary_object_common_name"
  | "short_id"
  | "tca_time"
  | "collision_probability"
  | "miss_distance"
  | "radial_miss_distance"
  | "updated_at"
  | "cdm_external_id";

/** EventsForAnalysisSortBy */
export type TypeEventsForAnalysisSortBy =
  | "primary_object_norad_id"
  | "primary_object_common_name"
  | "secondary_object_common_name"
  | "short_id"
  | "tca_time"
  | "collision_probability"
  | "miss_distance"
  | "radial_miss_distance"
  | "updated_at"
  | "cdm_external_id";

/** EventsSortBy */
export type TypeEventsSortBy =
  | "primary_object_norad_id"
  | "primary_object_common_name"
  | "secondary_object_common_name"
  | "short_id"
  | "tca_time"
  | "collision_probability"
  | "collision_probability_uksa"
  | "miss_distance"
  | "radial_miss_distance"
  | "updated_at"
  | "user_interest"
  | "risk";

/** ExternalDataPerformanceAggregateOut */
export interface TypeExternalDataPerformanceAggregateOut {
  /** Source Type */
  source_type: string;
  /** Source Provider */
  source_provider: string;
  /** Ingestion Sum */
  ingestion_sum?: number | null;
  /**
   * Ingestion Date
   * @format date-time
   */
  ingestion_date: string;
}

/** ExternalDataPerformanceItemsSortBy */
export type TypeExternalDataPerformanceItemsSortBy =
  | "ingestion_start"
  | "ingestion_end"
  | "items_fetched"
  | "source_provider"
  | "source_type"
  | "created_at"
  | "updated_at";

/** ExternalDataPerformanceOut */
export interface TypeExternalDataPerformanceOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  source_provider: TypeExternalDataProvider;
  source_type: TypeExternalDataType;
  /**
   * Ingestion Start
   * @format date-time
   */
  ingestion_start: string;
  /** Ingestion End */
  ingestion_end?: string | null;
  /** Items Fetched */
  items_fetched?: number | null;
}

/** ExternalDataProvider */
export type TypeExternalDataProvider = "SpaceTrack" | "ESADiscos" | "UKSA" | "Operator";

/** ExternalDataType */
export type TypeExternalDataType =
  | "CDM"
  | "Satellite"
  | "Analysis"
  | "Ephemeris"
  | "Manoeuvre Trade Space Plot"
  | "Tracking and Impact Prediction"
  | "Reentry Event Report"
  | "Conjunction Report"
  | "Fragmentation Report"
  | "Satellite Activity Report";

/** FeedbackIn */
export interface TypeFeedbackIn {
  /**
   * Satisfaction
   * @min 1
   * @max 5
   */
  satisfaction: number;
  /** Details */
  details: string;
  /** User Email */
  user_email?: string | null;
}

/** FragmentationAlertSettings */
export interface TypeFragmentationAlertSettings {
  /**
   * Alert Type
   * @default "fragmentation"
   */
  alert_type?: "fragmentation";
  /** Chosen Option */
  chosen_option: "all" | "priority" | "closedown" | "none";
  /**
   * Notification Types
   * @uniqueItems true
   * @default []
   */
  notification_types?: TypeNotificationType[];
}

/** FragmentationEvent */
export interface TypeFragmentationEvent {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Short Id */
  short_id: string;
  /**
   * Event Epoch
   * @format date-time
   */
  event_epoch: string;
  /** Year */
  year: number;
  /** Event Number */
  event_number: number;
  risk?: TypeRisk | null;
  /** Modelled Fragments */
  modelled_fragments?: number | null;
  /** Known Fragments */
  known_fragments?: number | null;
  /** @default "Unknown" */
  fragmentation_type?: TypeFragmentationType;
  affected_regime: TypeAffectedRegime;
  /** Conjunction Event Id */
  conjunction_event_id?: string | null;
  /** Alert Type */
  alert_type: "priority" | "closedown";
  /** Executive Summary Comment */
  executive_summary_comment?: string | null;
  /** Closed Comment */
  closed_comment?: string | null;
  /** Uk Response Comment */
  uk_response_comment?: string | null;
  /** Press Attention Comment */
  press_attention_comment?: string | null;
  /** Object History Comment */
  object_history_comment?: string | null;
  /** Orbital Analyst Comment */
  orbital_analyst_comment?: string | null;
  /** Spaceflight Risk Comment */
  spaceflight_risk_comment?: string | null;
  /** Fragmentation Type Comment */
  fragmentation_type_comment?: string | null;
  /** Primary Object Common Name */
  primary_object_common_name?: string | null;
  /** Primary Object Norad Id */
  primary_object_norad_id?: string | null;
  /** Primary Object Type */
  primary_object_type?: string | null;
  /** Primary Object Licensing Country */
  primary_object_licensing_country?: string | null;
  /** Secondary Object Common Name */
  secondary_object_common_name?: string | null;
  /** Secondary Object Norad Id */
  secondary_object_norad_id?: string | null;
  /** Secondary Object Type */
  secondary_object_type?: string | null;
  /** Secondary Object Licensing Country */
  secondary_object_licensing_country?: string | null;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /** Report Number */
  report_number: number;
  /**
   * Report Time
   * @format date-time
   */
  report_time: string;
}

/** FragmentationEventAlertIn */
export interface TypeFragmentationEventAlertIn {
  /** Alert Type */
  alert_type: ("priority" | "closedown")[];
  /** Additional Emails */
  additional_emails: string[];
}

/** FragmentationEventAlertOut */
export interface TypeFragmentationEventAlertOut {
  /**
   * Fragmentation Event Id
   * @format uuid
   */
  fragmentation_event_id: string;
  /**
   * Fragmentation Report Id
   * @format uuid
   */
  fragmentation_report_id: string;
  /** Alert Type */
  alert_type: ("standard" | "priority")[];
  /** Additional Recipients */
  additional_recipients: string[] | null;
  /** Email Notification Sending Status */
  email_notification_sending_status: "scheduled" | "in-progress" | "delivered";
  /** Sms Notification Sending Status */
  sms_notification_sending_status: "scheduled" | "in-progress" | "delivered";
}

/** FragmentationEventPatch */
export interface TypeFragmentationEventPatch {
  /** Executive Summary Comment */
  executive_summary_comment?: string | null;
  /** Closed Comment */
  closed_comment?: string | null;
  /** Uk Response Comment */
  uk_response_comment?: string | null;
  /** Press Attention Comment */
  press_attention_comment?: string | null;
  /** Object History Comment */
  object_history_comment?: string | null;
  /** Orbital Analyst Comment */
  orbital_analyst_comment?: string | null;
  /** Spaceflight Risk Comment */
  spaceflight_risk_comment?: string | null;
  /** Fragmentation Type Comment */
  fragmentation_type_comment?: string | null;
}

/** FragmentationEventsSortBy */
export type TypeFragmentationEventsSortBy =
  | "created_at"
  | "updated_at"
  | "event_epoch"
  | "primary_object_norad_id"
  | "short_id"
  | "primary_object_common_name";

/** FragmentationReport */
export interface TypeFragmentationReport {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Short Id */
  short_id: string | null;
  /** Report Number */
  report_number: number;
  /**
   * Report Time
   * @format date-time
   */
  report_time: string;
  /**
   * Event Epoch
   * @format date-time
   */
  event_epoch: string;
  /** Modelled Fragments */
  modelled_fragments?: number | null;
  /** Known Fragments */
  known_fragments?: number | null;
  /** @default "Unknown" */
  fragmentation_type?: TypeFragmentationType;
  affected_regime: TypeAffectedRegime;
  /** Conjunction Event Id */
  conjunction_event_id?: string | null;
  risk?: TypeRisk | null;
  /** Alert Type */
  alert_type: "priority" | "closedown";
  /** Executive Summary Comment */
  executive_summary_comment?: string | null;
  /** Closed Comment */
  closed_comment?: string | null;
  /** Uk Response Comment */
  uk_response_comment?: string | null;
  /** Press Attention Comment */
  press_attention_comment?: string | null;
  /** Object History Comment */
  object_history_comment?: string | null;
  /** Orbital Analyst Comment */
  orbital_analyst_comment?: string | null;
  /** Spaceflight Risk Comment */
  spaceflight_risk_comment?: string | null;
  /** Fragmentation Type Comment */
  fragmentation_type_comment?: string | null;
  /** Primary Object Common Name */
  primary_object_common_name?: string | null;
  /** Primary Object Norad Id */
  primary_object_norad_id?: string | null;
  /** Primary Object Licensing Country */
  primary_object_licensing_country?: string | null;
  /** Primary Object Type */
  primary_object_type?: string | null;
  /** Primary Object Mass */
  primary_object_mass?: number | null;
  /** Primary Object International Designator */
  primary_object_international_designator?: string | null;
  /** Primary Object Launching Year */
  primary_object_launching_year?: number | null;
  /** Primary Object Apogee */
  primary_object_apogee?: number | null;
  /** Primary Object Perigee */
  primary_object_perigee?: number | null;
  /** Primary Object Inclination */
  primary_object_inclination?: number | null;
  /** Secondary Object Common Name */
  secondary_object_common_name?: string | null;
  /** Secondary Object Norad Id */
  secondary_object_norad_id?: string | null;
  /** Secondary Object Licensing Country */
  secondary_object_licensing_country?: string | null;
  /** Secondary Object Type */
  secondary_object_type?: string | null;
  /** Secondary Object Mass */
  secondary_object_mass?: number | null;
  /** Secondary Object International Designator */
  secondary_object_international_designator?: string | null;
  /** Secondary Object Launching Year */
  secondary_object_launching_year?: number | null;
  /** Secondary Object Apogee */
  secondary_object_apogee?: number | null;
  /** Secondary Object Perigee */
  secondary_object_perigee?: number | null;
  /** Secondary Object Inclination */
  secondary_object_inclination?: number | null;
  /**
   * File Name
   * @default "unknown-filename.json"
   */
  file_name?: string;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /** Uploaded By Id */
  uploaded_by_id?: string | null;
  /** Deleted By Id */
  deleted_by_id?: string | null;
}

/** FragmentationReportOut */
export interface TypeFragmentationReportOut {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Short Id */
  short_id: string | null;
  /** Report Number */
  report_number: number;
  /**
   * Report Time
   * @format date-time
   */
  report_time: string;
  /**
   * Event Epoch
   * @format date-time
   */
  event_epoch: string;
  /** Modelled Fragments */
  modelled_fragments?: number | null;
  /** Known Fragments */
  known_fragments?: number | null;
  fragmentation_type: TypeFragmentationType;
  affected_regime: TypeAffectedRegime;
  /** Conjunction Event Id */
  conjunction_event_id?: string | null;
  /** Executive Summary Comment */
  executive_summary_comment?: string | null;
  /** Closed Comment */
  closed_comment?: string | null;
  /** Uk Response Comment */
  uk_response_comment?: string | null;
  /** Press Attention Comment */
  press_attention_comment?: string | null;
  /** Object History Comment */
  object_history_comment?: string | null;
  /** Orbital Analyst Comment */
  orbital_analyst_comment?: string | null;
  /** Spaceflight Risk Comment */
  spaceflight_risk_comment?: string | null;
  /** Fragmentation Type Comment */
  fragmentation_type_comment?: string | null;
  /** Risk */
  risk?: string | null;
  /** Alert Type */
  alert_type: "priority" | "closedown";
  /** File Name */
  file_name: string;
  /** Presigned Url */
  presigned_url: string;
  /** Uploaded By Id */
  uploaded_by_id?: string | null;
  /** Deleted By Id */
  deleted_by_id?: string | null;
  /** Primary Object Common Name */
  primary_object_common_name?: string | null;
  /** Primary Object Norad Id */
  primary_object_norad_id?: string | null;
  /** Primary Object Licensing Country */
  primary_object_licensing_country?: string | null;
  /** Primary Object Type */
  primary_object_type?: string | null;
  /** Primary Object Mass */
  primary_object_mass?: number | null;
  /** Primary Object International Designator */
  primary_object_international_designator?: string | null;
  /** Primary Object Launching Year */
  primary_object_launching_year?: number | null;
  /** Primary Object Apogee */
  primary_object_apogee?: number | null;
  /** Primary Object Perigee */
  primary_object_perigee?: number | null;
  /** Primary Object Inclination */
  primary_object_inclination?: number | null;
  /** Secondary Object Common Name */
  secondary_object_common_name?: string | null;
  /** Secondary Object Norad Id */
  secondary_object_norad_id?: string | null;
  /** Secondary Object Licensing Country */
  secondary_object_licensing_country?: string | null;
  /** Secondary Object Type */
  secondary_object_type?: string | null;
  /** Secondary Object Mass */
  secondary_object_mass?: number | null;
  /** Secondary Object International Designator */
  secondary_object_international_designator?: string | null;
  /** Secondary Object Launching Year */
  secondary_object_launching_year?: number | null;
  /** Secondary Object Apogee */
  secondary_object_apogee?: number | null;
  /** Secondary Object Perigee */
  secondary_object_perigee?: number | null;
  /** Secondary Object Inclination */
  secondary_object_inclination?: number | null;
}

/** FragmentationReportSortBy */
export type TypeFragmentationReportSortBy =
  | "created_at"
  | "updated_at"
  | "event_epoch"
  | "primary_object_norad_id"
  | "report_number"
  | "short_id"
  | "primary_object_common_name";

/** FragmentationType */
export type TypeFragmentationType =
  | "Accidental"
  | "Aerodynamics"
  | "Anomalous"
  | "Collision"
  | "Deliberate"
  | "Electrical"
  | "Explosion"
  | "Propulsion"
  | "Small Impactor"
  | "Unknown";

/** HTTPValidationError */
export interface TypeHTTPValidationError {
  /** Detail */
  detail?: TypeValidationError[];
}

/** ManoeuvrePlot */
export interface TypeManoeuvrePlot {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /**
   * Tca Time
   * @format date-time
   */
  tca_time: string;
  /** Event Short Id */
  event_short_id: string;
  /** Cdm External Id */
  cdm_external_id: string;
  /** Primary Object Norad Id */
  primary_object_norad_id: string;
  /** Secondary Object Norad Id */
  secondary_object_norad_id: string;
  /** File Name */
  file_name: string;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /** Uploaded By Id */
  uploaded_by_id?: string | null;
  /** Deleted By Id */
  deleted_by_id?: string | null;
}

/** ManoeuvrePlotMetadataOut */
export interface TypeManoeuvrePlotMetadataOut {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Tca Time
   * @format date-time
   */
  tca_time: string;
  /** Event Short Id */
  event_short_id: string;
  /** Cdm External Id */
  cdm_external_id: string;
  /** Primary Object Norad Id */
  primary_object_norad_id: string;
  /** Secondary Object Norad Id */
  secondary_object_norad_id: string;
  /** File Name */
  file_name: string;
}

/** ManoeuvrePlotMetadataSortBy */
export type TypeManoeuvrePlotMetadataSortBy =
  | "cdm_external_id"
  | "created_at"
  | "updated_at"
  | "file_name"
  | "event_short_id"
  | "uploaded_by_email"
  | "uploaded_by_id";

/** ManoeuvrePlotOut */
export interface TypeManoeuvrePlotOut {
  /** File Name */
  file_name: string;
  /** Presigned Url */
  presigned_url: string;
}

/** ManoeuvrePlotWithUserMetadataOut */
export interface TypeManoeuvrePlotWithUserMetadataOut {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Tca Time
   * @format date-time
   */
  tca_time: string;
  /** Event Short Id */
  event_short_id: string;
  /** Cdm External Id */
  cdm_external_id: string;
  /** Primary Object Norad Id */
  primary_object_norad_id: string;
  /** Secondary Object Norad Id */
  secondary_object_norad_id: string;
  /** Uploaded By Email */
  uploaded_by_email: string | null;
  /** Uploaded By Id */
  uploaded_by_id: string | null;
  /** File Name */
  file_name: string;
}

/** MissDistanceUncertainty */
export interface TypeMissDistanceUncertainty {
  /** Total Uncertainty */
  total_uncertainty?: number | null;
  /** Mean Radial Uncertainty */
  mean_radial_uncertainty?: number | null;
  /** In Track Uncertainty */
  in_track_uncertainty?: number | null;
  /** Cross Track Uncertainty */
  cross_track_uncertainty?: number | null;
}

/** NotificationSettings */
export interface TypeNotificationSettings {
  /** On Event Created */
  on_event_created?: TypeNotificationType[];
  /** On Event Updated */
  on_event_updated?: TypeNotificationType[];
  /** On Event Under Threshold */
  on_event_under_threshold?: TypeNotificationType[];
  /** On Analysis Uploaded */
  on_analysis_uploaded?: TypeNotificationType[];
  /** On Ephemeris Uploaded */
  on_ephemeris_uploaded?: TypeNotificationType[];
  /** On Manoeuvre Plot Uploaded */
  on_manoeuvre_plot_uploaded?: TypeNotificationType[];
  /** On User Added */
  on_user_added?: TypeNotificationType[];
  /** On User Removed */
  on_user_removed?: TypeNotificationType[];
  /** On User Edited */
  on_user_edited?: TypeNotificationType[];
}

/** NotificationType */
export type TypeNotificationType = "EMAIL" | "SMS";

/** OrganizationOut */
export interface TypeOrganizationOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Name */
  name: string;
  /** Email Domain */
  email_domain: string;
  /** Allowed Roles */
  allowed_roles?: TypeUserRole[] | null;
  /** Accounts Count */
  accounts_count: number;
  /** Admin Accounts Count */
  admin_accounts_count: number;
  /** Satellites Count */
  satellites_count: number;
}

/** PositionUncertainty */
export interface TypePositionUncertainty {
  /** Radial Position Uncertainty */
  radial_position_uncertainty: number;
  /** Intrack Position Uncertainty */
  intrack_position_uncertainty: number;
  /** Crosstrack Position Uncertainty */
  crosstrack_position_uncertainty: number;
}

/** ReentryAlertSettings */
export interface TypeReentryAlertSettings {
  /**
   * Alert Type
   * @default "reentry"
   */
  alert_type?: "reentry";
  /** Chosen Option */
  chosen_option: "all" | "priority" | "uk-licensed" | "closedown" | "none";
  /**
   * Areas Of Interest
   * @uniqueItems true
   * @default []
   */
  areas_of_interest?: TypeAreaOfInterest[];
  /**
   * Notification Types
   * @uniqueItems true
   * @default []
   */
  notification_types?: TypeNotificationType[];
}

/** ReentryDirection */
export type TypeReentryDirection = "ascending" | "descending";

/** ReentryEvent */
export interface TypeReentryEvent {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Short Id */
  short_id: string;
  /** Norad Id */
  norad_id: string;
  /**
   * Time Window Start
   * @format date-time
   */
  time_window_start: string;
  /**
   * Time Window End
   * @format date-time
   */
  time_window_end: string;
  /** Decay Epoch */
  decay_epoch?: string | null;
  /** Uncertainty Window */
  uncertainty_window?: number | null;
  /** Tip External Id */
  tip_external_id: string;
  /** Insert Epoch */
  insert_epoch?: string | null;
  /** Tip Creation Date */
  tip_creation_date?: string | null;
  /** Reentry Report Number */
  reentry_report_number?: number | null;
  /** Year */
  year: number;
  /** Event Number */
  event_number: number;
  /** Closed Comment */
  closed_comment?: string | null;
  /** Atmospheric Probability */
  atmospheric_probability?: number | null;
  atmospheric_risk?: TypeRisk | null;
  /** Fragments Probability */
  fragments_probability?: number | null;
  fragments_risk?: TypeRisk | null;
  /** Fragments Number */
  fragments_number?: number | null;
  /** Human Casualty Probability */
  human_casualty_probability?: number | null;
  human_casualty_risk?: TypeRisk | null;
  /** Overflight Time */
  overflight_time: string[];
  survivability?: TypeReentrySurvivability | null;
  /** Survivability Comment */
  survivability_comment?: string | null;
  /** Executive Summary Comment */
  executive_summary_comment?: string | null;
  /** Immediate Response Comment */
  immediate_response_comment?: string | null;
  /** Uk Response Comment */
  uk_response_comment?: string | null;
  /** Damages Liability Comment */
  damages_liability_comment?: string | null;
  /** Press Attention Comment */
  press_attention_comment?: string | null;
  /** Object Name */
  object_name?: string | null;
  /** Object Type */
  object_type?: string | null;
  /** Estimated Mass */
  estimated_mass?: number | null;
  /** License Country */
  license_country?: string | null;
  /** International Designator */
  international_designator?: string | null;
  /** Object Height */
  object_height?: number | null;
  /** Object Width */
  object_width?: number | null;
  /** Object Span */
  object_span?: number | null;
  /** Launching Year */
  launching_year?: number | null;
  /** Apogee */
  apogee?: number | null;
  /** Perigee */
  perigee?: number | null;
  /** Inclination */
  inclination?: number | null;
  /** Approved By Id */
  approved_by_id?: string | null;
  /** Approved At */
  approved_at?: string | null;
}

/** ReentryEventAlertIn */
export interface TypeReentryEventAlertIn {
  /** Alert Type */
  alert_type: ("standard" | "priority" | "uk-licensed" | "closedown")[];
  /**
   * Additional Emails
   * @default []
   */
  additional_emails?: string[];
}

/** ReentryEventAlertOut */
export interface TypeReentryEventAlertOut {
  /**
   * Reentry Event Id
   * @format uuid
   */
  reentry_event_id: string;
  /**
   * Reentry Report Id
   * @format uuid
   */
  reentry_report_id: string;
  /** Alert Type */
  alert_type: ("standard" | "priority" | "uk-licensed" | "closedown")[];
  /** Additional Recipients */
  additional_recipients: string[] | null;
  /** Email Notification Sending Status */
  email_notification_sending_status: "scheduled" | "in-progress" | "delivered";
  /** Sms Notification Sending Status */
  sms_notification_sending_status: "scheduled" | "in-progress" | "delivered";
}

/** ReentryEventCount */
export interface TypeReentryEventCount {
  /**
   * Reentry Event Alert Count
   * @default 0
   */
  reentry_event_alert_count?: number;
  /**
   * Reentry Event Normal Count
   * @default 0
   */
  reentry_event_normal_count?: number;
  /** Reentry Event Total Count */
  reentry_event_total_count: number;
}

/** ReentryEventOut */
export interface TypeReentryEventOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Short Id */
  short_id: string;
  /** Norad Id */
  norad_id: string;
  /**
   * Time Window Start
   * @format date-time
   */
  time_window_start: string;
  /**
   * Time Window End
   * @format date-time
   */
  time_window_end: string;
  /** Decay Epoch */
  decay_epoch?: string | null;
  /** Uncertainty Window */
  uncertainty_window?: number | null;
  /** Tip External Id */
  tip_external_id: string;
  /** Insert Epoch */
  insert_epoch?: string | null;
  /** Tip Creation Date */
  tip_creation_date?: string | null;
  /** Reentry Report Number */
  reentry_report_number?: number | null;
  /** Year */
  year: number;
  /** Event Number */
  event_number: number;
  /** Closed Comment */
  closed_comment?: string | null;
  /** Atmospheric Probability */
  atmospheric_probability?: number | null;
  atmospheric_risk?: TypeRisk | null;
  /** Fragments Probability */
  fragments_probability?: number | null;
  fragments_risk?: TypeRisk | null;
  /** Fragments Number */
  fragments_number?: number | null;
  /** Human Casualty Probability */
  human_casualty_probability?: number | null;
  human_casualty_risk?: TypeRisk | null;
  /** Overflight Time */
  overflight_time: string[];
  survivability?: TypeReentrySurvivability | null;
  /** Survivability Comment */
  survivability_comment?: string | null;
  /** Executive Summary Comment */
  executive_summary_comment?: string | null;
  /** Immediate Response Comment */
  immediate_response_comment?: string | null;
  /** Uk Response Comment */
  uk_response_comment?: string | null;
  /** Damages Liability Comment */
  damages_liability_comment?: string | null;
  /** Press Attention Comment */
  press_attention_comment?: string | null;
  /** Object Name */
  object_name?: string | null;
  /** Object Type */
  object_type?: string | null;
  /** Estimated Mass */
  estimated_mass?: number | null;
  /** License Country */
  license_country?: string | null;
  /** International Designator */
  international_designator?: string | null;
  /** Object Height */
  object_height?: number | null;
  /** Object Width */
  object_width?: number | null;
  /** Object Span */
  object_span?: number | null;
  /** Launching Year */
  launching_year?: number | null;
  /** Apogee */
  apogee?: number | null;
  /** Perigee */
  perigee?: number | null;
  /** Inclination */
  inclination?: number | null;
  /** Approved By Id */
  approved_by_id?: string | null;
  /** Approved At */
  approved_at?: string | null;
  /** Licensed Country */
  licensed_country?: string | null;
  /** Uk Reentry Probability */
  uk_reentry_probability?: string | null;
}

/** ReentryEventPatch */
export interface TypeReentryEventPatch {
  /** Executive Summary Comment */
  executive_summary_comment?: string | null;
  /** Immediate Response Comment */
  immediate_response_comment?: string | null;
  /** Uk Response Comment */
  uk_response_comment?: string | null;
  /** Damages Liability Comment */
  damages_liability_comment?: string | null;
  /** Press Attention Comment */
  press_attention_comment?: string | null;
  /** Closed Comment */
  closed_comment?: string | null;
}

/** ReentryEventReportOut */
export interface TypeReentryEventReportOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Short Id */
  short_id: string;
  /** Norad Id */
  norad_id: string;
  /** Tip External Id */
  tip_external_id?: string | null;
  /**
   * Time Window Start
   * @format date-time
   */
  time_window_start: string;
  /**
   * Time Window End
   * @format date-time
   */
  time_window_end: string;
  /**
   * Decay Epoch
   * @format date-time
   */
  decay_epoch: string;
  /** Uncertainty Window */
  uncertainty_window?: number | null;
  /** Report Number */
  report_number: number;
  /** Closed Comment */
  closed_comment?: string | null;
  /** Executive Summary Comment */
  executive_summary_comment?: string | null;
  /** Immediate Response Comment */
  immediate_response_comment?: string | null;
  /** Uk Response Comment */
  uk_response_comment?: string | null;
  /** Damages Liability Comment */
  damages_liability_comment?: string | null;
  /** Press Attention Comment */
  press_attention_comment?: string | null;
  /** Alert Type */
  alert_type: ("priority" | "standard" | "uk-licensed" | "closedown")[];
  /**
   * Report Time
   * @format date-time
   */
  report_time: string;
  /** Atmospheric Probability */
  atmospheric_probability: number;
  atmospheric_risk?: TypeRisk | null;
  /** Fragments Probability */
  fragments_probability?: number | null;
  fragments_risk?: TypeRisk | null;
  /** Fragments Number */
  fragments_number?: number | null;
  /** Human Casualty Probability */
  human_casualty_probability?: number | null;
  human_casualty_risk?: TypeRisk | null;
  survivability: TypeReentrySurvivability;
  /** Survivability Comment */
  survivability_comment?: string | null;
  /** Overflight Time */
  overflight_time: string[];
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /** Object Name */
  object_name?: string | null;
  /** Object Type */
  object_type?: string | null;
  /** Estimated Mass */
  estimated_mass?: number | null;
  /** Licensing Country */
  licensing_country?: string | null;
  /** International Designator */
  international_designator?: string | null;
  /** Object Height */
  object_height?: number | null;
  /** Object Width */
  object_width?: number | null;
  /** Object Span */
  object_span?: number | null;
  /** Launching Year */
  launching_year?: number | null;
  /** Apogee */
  apogee?: number | null;
  /** Perigee */
  perigee?: number | null;
  /** Inclination */
  inclination?: number | null;
  impact?: TypeReentryEventReportImpact | null;
  /**
   * File Name
   * @default "unknown-filename.json"
   */
  file_name?: string;
  /** Uploaded By Id */
  uploaded_by_id?: string | null;
  /** Deleted By Id */
  deleted_by_id?: string | null;
  /** Presigned Url */
  presigned_url?: string | null;
}

/** ReentryEventSortBy */
export type TypeReentryEventSortBy =
  | "created_at"
  | "license_country"
  | "norad_id"
  | "object_name"
  | "atmospheric_probability"
  | "short_id"
  | "survivability"
  | "time_window_end"
  | "time_window_start"
  | "decay_epoch"
  | "tip_external_id"
  | "uk_reentry_probability"
  | "human_casualty_probability"
  | "fragments_probability"
  | "overflight_time"
  | "updated_at"
  | "tip_creation_date"
  | "insert_epoch";

/** ReentryInterest */
export type TypeReentryInterest = "low" | "high";

/** ReentryReportSortBy */
export type TypeReentryReportSortBy = "created_at" | "tip_external_id" | "report_number" | "updated_at";

/** ReentrySurvivability */
export type TypeReentrySurvivability = "Highly likely" | "Likely" | "Unlikely" | "Highly unlikely";

/** ReferenceFrame */
export type TypeReferenceFrame =
  | "EME2000"
  | "GCRF"
  | "GRC"
  | "ICRF2000"
  | "ITRF93"
  | "ITRF97"
  | "MCI"
  | "TDR"
  | "TEME"
  | "TOD";

/** ReportFlagSettings */
export type TypeReportFlagSettings = "present" | "not_present" | "all";

/** Risk */
export type TypeRisk = "Very low" | "Low" | "Medium" | "High";

/** SatelliteObservationsData */
export interface TypeSatelliteObservationsData {
  /** Data Received */
  data_received?: string | null;
  /** Data Source */
  data_source?: string | null;
  /** Hbr */
  hbr?: number | null;
  /** Observations Number */
  observations_number?: number | null;
  /** Observations Available */
  observations_available?: number | null;
  /** Observations Timespan */
  observations_timespan?: number | null;
  /** Od Quality */
  od_quality?: number | null;
}

/** SatelliteOrganizationOut */
export interface TypeSatelliteOrganizationOut {
  /** Norad Id */
  norad_id: string;
  /** Common Name */
  common_name: string;
  /**
   * Organization Id
   * @format uuid
   */
  organization_id: string;
  /** Organization Name */
  organization_name?: string | null;
  /** International Designator */
  international_designator: string;
  /** Esa Discos Id */
  esa_discos_id?: string | null;
}

/** SatelliteOut */
export interface TypeSatelliteOut {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Is Monitored */
  is_monitored: boolean;
  /** Common Name */
  common_name: string;
  /** Norad Id */
  norad_id?: string | null;
  /** Esa Update Time */
  esa_update_time?: string | null;
  /** Esa Discos Id */
  esa_discos_id?: string | null;
  /** International Designator */
  international_designator: string;
  /** Object Type */
  object_type?: string | null;
  /** License Country */
  license_country?: string | null;
  /** Launch Date */
  launch_date?: string | null;
  /** Launch Site */
  launch_site?: string | null;
  /** Apogee */
  apogee?: string | null;
  /** Perigee */
  perigee?: string | null;
  /** Inclination */
  inclination?: number | null;
  /** Period */
  period?: number | null;
  /** Organization Id */
  organization_id?: string | null;
  /** Mass */
  mass?: number | null;
  /** Height */
  height?: number | null;
  /** Depth */
  depth?: number | null;
  /** Width */
  width?: number | null;
  /** Diameter */
  diameter?: number | null;
  /** Span */
  span?: number | null;
  /** Cross Section Min */
  cross_section_min?: number | null;
  /** Cross Section Avg */
  cross_section_avg?: number | null;
  /** Cross Section Max */
  cross_section_max?: number | null;
  /** Shape */
  shape?: string | null;
  /** Object Class */
  object_class?: string | null;
}

/** SatelliteUpdateIn */
export interface TypeSatelliteUpdateIn {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Organization Id */
  organization_id?: string | null;
}

/** SatelliteWithMetadataOut */
export interface TypeSatelliteWithMetadataOut {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Is Monitored */
  is_monitored: boolean;
  /** Common Name */
  common_name: string;
  /** Norad Id */
  norad_id?: string | null;
  /** Esa Update Time */
  esa_update_time?: string | null;
  /** Esa Discos Id */
  esa_discos_id?: string | null;
  /** International Designator */
  international_designator: string;
  /** Object Type */
  object_type?: string | null;
  /** License Country */
  license_country?: string | null;
  /** Launch Date */
  launch_date?: string | null;
  /** Launch Site */
  launch_site?: string | null;
  /** Apogee */
  apogee?: string | null;
  /** Perigee */
  perigee?: string | null;
  /** Inclination */
  inclination?: number | null;
  /** Period */
  period?: number | null;
  /** Organization Id */
  organization_id?: string | null;
  /** Mass */
  mass?: number | null;
  /** Height */
  height?: number | null;
  /** Depth */
  depth?: number | null;
  /** Width */
  width?: number | null;
  /** Diameter */
  diameter?: number | null;
  /** Span */
  span?: number | null;
  /** Cross Section Min */
  cross_section_min?: number | null;
  /** Cross Section Avg */
  cross_section_avg?: number | null;
  /** Cross Section Max */
  cross_section_max?: number | null;
  /** Shape */
  shape?: string | null;
  /** Object Class */
  object_class?: string | null;
  /** Metadata */
  metadata: object;
}

/** SatellitesCountByOrganizationOut */
export interface TypeSatellitesCountByOrganizationOut {
  /** Organization Name */
  organization_name: string;
  /** Satellites Count */
  satellites_count: number;
}

/** SatellitesInOrganizationsSortBy */
export type TypeSatellitesInOrganizationsSortBy = "organization_id" | "organization_name" | "satellites_count";

/** SatellitesOrganizationsSortBy */
export type TypeSatellitesOrganizationsSortBy =
  | "norad_id"
  | "common_name"
  | "international_designator"
  | "organization_id"
  | "organization_name"
  | "esa_discos_id";

/** SatellitesSortBy */
export type TypeSatellitesSortBy = "norad_id" | "common_name" | "international_designator" | "future_events_count";

/** SortOrder */
export type TypeSortOrder = "asc" | "desc";

/** StatisticsConjunctionEventsByObjectTypeMonthlyCount */
export interface TypeStatisticsConjunctionEventsByObjectTypeMonthlyCount {
  /** Event Type */
  event_type?: string | null;
  /** Month */
  month?: string | null;
  /** Count */
  count: number;
}

/** StatisticsConjunctionEventsCount */
export interface TypeStatisticsConjunctionEventsCount {
  /** Count */
  count: number;
}

/** StatisticsConjunctionEventsMonthlyCount */
export interface TypeStatisticsConjunctionEventsMonthlyCount {
  /** Collision Probability Range */
  collision_probability_range: string;
  /** Month */
  month?: string | null;
  /** Count */
  count: number;
}

/** StatisticsEventsByOrganization */
export interface TypeStatisticsEventsByOrganization {
  /** Name */
  name: string;
  /** Id */
  id?: string | null;
  /** Events */
  events: number;
  /** Collision Probability Range */
  collision_probability_range: string;
}

/** StatisticsEventsBySatellite */
export interface TypeStatisticsEventsBySatellite {
  /** Common Name */
  common_name: string;
  /** Norad Id */
  norad_id: string;
  /** Events */
  events: number;
  /** Collision Probability Range */
  collision_probability_range: string;
  /** Organization Name */
  organization_name: string;
}

/** StatisticsEventsType */
export interface TypeStatisticsEventsType {
  /** Event Type */
  event_type: string;
  /** Count */
  count: number;
}

/** StatisticsFragmentationEventsAndAlertsCount */
export interface TypeStatisticsFragmentationEventsAndAlertsCount {
  /** Object Type */
  object_type: string;
  /** Count */
  count: number;
}

/** StatisticsFragmentationEventsByFragmentationTypeMonthlyCount */
export interface TypeStatisticsFragmentationEventsByFragmentationTypeMonthlyCount {
  fragmentation_type: TypeFragmentationType;
  /** Month */
  month?: string | null;
  /** Count */
  count: number;
}

/** StatisticsFragmentationEventsByObjectTypeMonthlyCount */
export interface TypeStatisticsFragmentationEventsByObjectTypeMonthlyCount {
  /** Object Type */
  object_type?: string | null;
  /** Month */
  month?: string | null;
  /** Count */
  count: number;
}

/** StatisticsFragmentationEventsCountByFragmentationType */
export interface TypeStatisticsFragmentationEventsCountByFragmentationType {
  /** Fragmentation Type */
  fragmentation_type: string;
  /** Count */
  count: number;
}

/** StatisticsFragmentationEventsMonthlyCount */
export interface TypeStatisticsFragmentationEventsMonthlyCount {
  /** Month */
  month: string;
  /** Count */
  count: number;
}

/** StatisticsHighestUpcomingCollisionProbability */
export interface TypeStatisticsHighestUpcomingCollisionProbability {
  /** Collision Probability */
  collision_probability: number;
}

/** StatisticsMonthlyCount */
export interface TypeStatisticsMonthlyCount {
  /** Month */
  month: string;
  /** Count */
  count: number;
}

/** StatisticsMonthlyRunningSum */
export interface TypeStatisticsMonthlyRunningSum {
  /** Month */
  month: string;
  /** Count */
  count: number;
  /** Running Total */
  running_total: number;
}

/** StatisticsNotificationsSent */
export interface TypeStatisticsNotificationsSent {
  /** Month */
  month?: string | null;
  /** Day */
  day?: string | null;
  /** Type */
  type: string;
  /** Count */
  count: number;
}

/** StatisticsReentryEventReportsCount */
export interface TypeStatisticsReentryEventReportsCount {
  /** Count */
  count: number;
}

/** StatisticsReentryEventsAndAlertsCount */
export interface TypeStatisticsReentryEventsAndAlertsCount {
  /** Object Type */
  object_type: string;
  /** Count */
  count: number;
}

/** StatisticsReentryEventsAndAlertsMonthlyCount */
export interface TypeStatisticsReentryEventsAndAlertsMonthlyCount {
  /** Month */
  month: string;
  /** Count */
  count: number;
  /** Alert Count */
  alert_count: number;
}

/** StatisticsReentryEventsByObjectTypeMonthlyCount */
export interface TypeStatisticsReentryEventsByObjectTypeMonthlyCount {
  /** Object Type */
  object_type?: string | null;
  /** Month */
  month?: string | null;
  /** Count */
  count: number;
}

/** StatisticsReentryEventsCount */
export interface TypeStatisticsReentryEventsCount {
  /** Count */
  count: number;
}

/** StatisticsSatelliteTracked */
export interface TypeStatisticsSatelliteTracked {
  /** Object Type */
  object_type: string;
  /** Count */
  count: number;
}

/** TIPOut */
export interface TypeTIPOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Norad Id */
  norad_id: string;
  /** External Id */
  external_id: string;
  /**
   * Creation Date
   * @format date-time
   */
  creation_date: string;
  /** Insert Epoch */
  insert_epoch: string | null;
  /**
   * Decay Epoch
   * @format date-time
   */
  decay_epoch: string;
  /** Uncertainty Window */
  uncertainty_window: number;
  direction: TypeReentryDirection;
  /** Latitude */
  latitude: number;
  /** Longitude */
  longitude: number;
  interest: TypeReentryInterest;
  /** Orbit */
  orbit: number;
  /** Inclination */
  inclination: number;
  /** Next Report Time */
  next_report_time?: number | null;
  /** @default "SpaceTrack" */
  source?: TypeExternalDataProvider;
  /**
   * Time Window Start
   * @format date-time
   */
  time_window_start?: string;
  /**
   * Time Window End
   * @format date-time
   */
  time_window_end: string;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /** Uploaded By Id */
  uploaded_by_id?: string | null;
  /** Deleted By Id */
  deleted_by_id?: string | null;
}

/** Threshold */
export interface TypeThreshold {
  type: TypeThresholdType;
  /** Value */
  value: number;
}

/** ThresholdType */
export type TypeThresholdType =
  | "PROBABILITY_OF_COLLISION"
  | "TOTAL_MISS_DISTANCE"
  | "MEAN_RADIAL_MISS_DISTANCE"
  | "TIME_TO_EVENT";

/** TimeSystem */
export type TypeTimeSystem =
  | "GMS"
  | "GPS"
  | "MET"
  | "MRT"
  | "SCL"
  | "TAI"
  | "TCB"
  | "TDB"
  | "TCG"
  | "TT"
  | "UT1"
  | "UTC";

/** UniqueEventOut */
export interface TypeUniqueEventOut {
  /** Short Id */
  short_id: string;
  /**
   * Created At
   * @format date-time
   */
  created_at?: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at?: string;
  /** Primary Object Norad Id */
  primary_object_norad_id: string;
  /** Secondary Object Norad Id */
  secondary_object_norad_id: string;
  /** Primary Object Common Name */
  primary_object_common_name?: string | null;
  /** Secondary Object Common Name */
  secondary_object_common_name?: string | null;
  /**
   * Tca
   * @format date-time
   */
  tca: string;
  /** Maximum Collision Probability */
  maximum_collision_probability?: number | null;
  /** Report Number */
  report_number?: number | null;
  risk?: TypeRisk | null;
  /** Closed Comment */
  closed_comment?: string | null;
  /** Executive Summary Comment */
  executive_summary_comment?: string | null;
  /** Immediate Impact Comment */
  immediate_impact_comment?: string | null;
  /** Long Term Impact Comment */
  long_term_impact_comment?: string | null;
  /** Manoeuvre Comment */
  manoeuvre_comment?: string | null;
  /** Press Attention Comment */
  press_attention_comment?: string | null;
  /** Risk At Altitude Comment */
  risk_at_altitude_comment?: string | null;
  /** Short Term Impact Comment */
  short_term_impact_comment?: string | null;
  /** Uk Response Comment */
  uk_response_comment?: string | null;
  /** Miss Distance */
  miss_distance?: number | null;
  /** Radial Miss Distance */
  radial_miss_distance?: number | null;
  /** Collision Probability Uksa */
  collision_probability_uksa?: number | null;
  /** Collision Probability St */
  collision_probability_st?: number | null;
  /** Cdm External Id */
  cdm_external_id?: string | null;
  /** Cdm Creation Date */
  cdm_creation_date?: string | null;
}

/** UniqueEventUpdateTextFieldsIn */
export interface TypeUniqueEventUpdateTextFieldsIn {
  /**
   * Updated At
   * @default "2026-02-20T09:39:30.634690"
   */
  updated_at?: string | null;
  /** Report Number */
  report_number?: number | null;
  /** Closed Comment */
  closed_comment?: string | null;
  /** Executive Summary Comment */
  executive_summary_comment?: string | null;
  /** Manoeuvre Comment */
  manoeuvre_comment?: string | null;
  /** Immediate Impact Comment */
  immediate_impact_comment?: string | null;
  /** Short Term Impact Comment */
  short_term_impact_comment?: string | null;
  /** Risk At Altitude Comment */
  risk_at_altitude_comment?: string | null;
  /** Long Term Impact Comment */
  long_term_impact_comment?: string | null;
  /** Uk Response Comment */
  uk_response_comment?: string | null;
  /** Press Attention Comment */
  press_attention_comment?: string | null;
}

/** User */
export interface TypeUser {
  /**
   * Id
   * @format uuid4
   */
  id?: string;
  /**
   * Email
   * @format email
   */
  email: string;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /**
   * Is Verified
   * @default false
   */
  is_verified?: boolean;
  /** @default "SATELLITE_OPERATOR_USER" */
  role?: TypeUserRole;
  /**
   * Organization Id
   * @format uuid
   */
  organization_id: string;
  /** Organization Name */
  organization_name: string;
  notification_settings?: TypeNotificationSettings | null;
  /** Notification Thresholds */
  notification_thresholds?: TypeThreshold[] | null;
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
  /** Phone Number */
  phone_number?: string | null;
  /** Toc Accepted At */
  toc_accepted_at?: string | null;
  /** Account Details Confirmed At */
  account_details_confirmed_at?: string | null;
}

/** UserClientCredentialsOut */
export interface TypeUserClientCredentialsOut {
  /** Client Id */
  client_id: string;
  /** Client Secret */
  client_secret: string;
}

/** UserIdOut */
export interface TypeUserIdOut {
  /**
   * User Id
   * @format uuid
   */
  user_id: string;
}

/** UserIn */
export interface TypeUserIn {
  /**
   * Email
   * @format email
   */
  email: string;
  /**
   * Is Active
   * @default true
   */
  is_active?: boolean;
  /**
   * Is Verified
   * @default false
   */
  is_verified?: boolean;
  /** @default "SATELLITE_OPERATOR_USER" */
  role?: TypeUserRole;
  /**
   * Organization Id
   * @format uuid
   */
  organization_id: string;
  notification_settings?: TypeNotificationSettings | null;
  /** Notification Thresholds */
  notification_thresholds?: TypeThreshold[] | null;
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
  /** Phone Number */
  phone_number?: string | null;
  /** Toc Accepted At */
  toc_accepted_at?: string | null;
  /** Account Details Confirmed At */
  account_details_confirmed_at?: string | null;
}

/** UserInterest */
export type TypeUserInterest = "Low" | "Medium" | "High";

/** UserOut */
export interface TypeUserOut {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
  /**
   * Email
   * @format email
   */
  email: string;
  /** Phone Number */
  phone_number?: string | null;
  /** @default "SATELLITE_OPERATOR_USER" */
  role?: TypeUserRole;
  /** Is Active */
  is_active: boolean;
  /**
   * Organization Id
   * @format uuid
   */
  organization_id: string;
  /** Account Details Confirmed At */
  account_details_confirmed_at?: string | null;
}

/** UserRole */
export type TypeUserRole =
  | "SATELLITE_OPERATOR_USER"
  | "SATELLITE_OPERATOR"
  | "SATELLITE_OPERATOR_ADMIN"
  | "GOVERNMENT_USER"
  | "GOVERNMENT_ADMIN"
  | "AGENCY_USER"
  | "AGENCY_ADMIN"
  | "AGENCY_ANALYST"
  | "AGENCY_APPROVER"
  | "AGENCY_SUPERUSER"
  | "REGULATOR_USER"
  | "REGULATOR_ADMIN";

/** UserUpdate */
export interface TypeUserUpdate {
  /** Email */
  email?: string | null;
  /** Is Active */
  is_active?: boolean | null;
  /** Is Verified */
  is_verified?: boolean | null;
  notification_settings?: TypeNotificationSettings | null;
  /** Notification Thresholds */
  notification_thresholds?: TypeThreshold[] | null;
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
  /** Phone Number */
  phone_number?: string | null;
  /** Toc Accepted At */
  toc_accepted_at?: string | null;
  /** Account Details Confirmed At */
  account_details_confirmed_at?: string | null;
  role?: TypeUserRole | null;
  /** Organization Id */
  organization_id?: string | null;
}

/** ValidationError */
export interface TypeValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/** _AdditionalAnalysis */
export interface TypeAdditionalAnalysis {
  /** Collision Probability */
  collision_probability: number;
  /** Collision Probability Method */
  collision_probability_method: string;
  /**
   * Update Time
   * @format date-time
   */
  update_time: string;
}

/** _OverflightProbability */
export interface TypeOverflightProbability {
  /** Atmospheric Probability */
  atmospheric_probability: number;
  /** Fragments Probability */
  fragments_probability: number;
  /** Human Casualty Probability */
  human_casualty_probability: number;
  /** Overflight Time */
  overflight_time?: string[] | null;
}

/** _ReentryEventReportImpact */
export interface TypeReentryEventReportImpact {
  /** By Nation */
  by_nation: Record<string, TypeOverflightProbability>;
  /** England */
  england: Record<string, TypeOverflightProbability>;
  /** Northern Ireland */
  northern_ireland: Record<string, TypeOverflightProbability>;
  /** Scotland */
  scotland: Record<string, TypeOverflightProbability>;
  /** Wales */
  wales: Record<string, TypeOverflightProbability>;
  /** Overseas Territories And Crown Dependencies */
  overseas_territories_and_crown_dependencies: Record<string, TypeOverflightProbability>;
  /** Maritime And Airspace */
  maritime_and_airspace: Record<string, TypeOverflightProbability>;
}

export interface TypeGetActivityEventsParams {
  /**
   * Epoch
   * @default "future"
   */
  epoch?: TypeEpoch;
  /** Search Query */
  search_query?: string | null;
  /**
   * Sort By
   * @default "common_name"
   */
  sort_by?: TypeActivityEventsSortBy;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
}

export interface TypeGetActivityReportsParams {
  /**
   * Sort By
   * @default "flag_date"
   */
  sort_by?: TypeActivityReportsSortBy;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetActivityReportsActivityEventShortIdParams {
  /**
   * Sort By
   * @default "flag_date"
   */
  sort_by?: TypeActivityReportsSortBy;
  /**
   * Show Only Active
   * @default false
   */
  show_only_active?: boolean;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
  /** Short Id */
  shortId: string;
}

export interface TypeGetAnalysesParams {
  /**
   * Sort By
   * @default "created_at"
   */
  sort_by?: TypeAnalysesSortBy;
  /**
   * Sort Order
   * @default "desc"
   */
  sort_order?: TypeSortOrder;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
}

export interface TypeGetBannersMessagesParams {
  /**
   * Sort By
   * @default "created_at"
   */
  sort_by?: TypeBannerMessagesSortBy | null;
  /**
   * Show Inactive
   * @default false
   */
  show_inactive?: boolean;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetBannersMessagesCurrentParams {
  /**
   * Sort By
   * Sorting column
   */
  sort_by?: TypeBannerSchedulesSortBy | null;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetBannersSchedulesParams {
  /**
   * Show Inactive
   * @default false
   */
  show_inactive?: boolean;
  /**
   * Sort By
   * Sorting column
   */
  sort_by: TypeBannerSchedulesSortBy;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypePostConjunctionReportsParams {
  /**
   * Source
   * @default "UKSA"
   */
  source?: TypeExternalDataProvider;
}

export interface TypeGetConjunctionReportsConjunctionEventShortIdParams {
  /**
   * Show Only Active
   * @default true
   */
  show_only_active?: boolean;
  /** Short Id */
  shortId: string;
}

export interface TypeGetEphemerisParams {
  /**
   * Norad Id
   * Satellite NORAD ID
   */
  norad_id?: string | null;
  /**
   * Sort By
   * Sorting column
   */
  sort_by: TypeEphemerisSortBy;
  /**
   * Show Inactive
   * Show soft-deleted ephemeris
   * @default false
   */
  show_inactive?: boolean;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetExternalDataPerformanceParams {
  /**
   * Sort By
   * @default "created_at"
   */
  sort_by?: TypeExternalDataPerformanceItemsSortBy | null;
  /**
   * Source Type
   * Type of source
   */
  source_type?: TypeExternalDataType[];
  /**
   * Source Provider
   * Source provider name
   */
  source_provider?: TypeExternalDataProvider | null;
  /**
   * Max Age Days
   * Maximum age of entries, in days
   */
  max_age_days?: number | null;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetExternalDataPerformanceAggregatedParams {
  /**
   * Max Age Days
   * Maximum age of entries, in days
   */
  max_age_days?: number | null;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetFragmentationEventsParams {
  /**
   * Epoch
   * @default "future"
   */
  epoch?: TypeEpoch;
  /** Search Query */
  search_query?: string | null;
  /**
   * Sort By
   * @default "event_epoch"
   */
  sort_by?: TypeFragmentationEventsSortBy;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
}

export interface TypeGetFragmentationReportsParams {
  /**
   * Sort By
   * @default "event_epoch"
   */
  sort_by?: TypeFragmentationReportSortBy;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetFragmentationReportsFragmentationEventShortIdParams {
  /**
   * Sort By
   * @default "event_epoch"
   */
  sort_by?: TypeFragmentationReportSortBy;
  /**
   * Show Only Active
   * @default false
   */
  show_only_active?: boolean;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
  /** Short Id */
  shortId: string;
}

export interface TypeGetManoeuvrePlotsParams {
  /**
   * Sort By
   * @default "created_at"
   */
  sort_by?: TypeManoeuvrePlotMetadataSortBy;
  /**
   * Sort Order
   * @default "desc"
   */
  sort_order?: TypeSortOrder;
  /**
   * Show Only Active
   * @default true
   */
  show_only_active?: boolean;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
}

export interface TypeGetManoeuvrePlotsByEventEventShortIdParams {
  /**
   * Sort By
   * Sorting column
   * @default "cdm_external_id"
   */
  sort_by?: TypeManoeuvrePlotMetadataSortBy;
  /**
   * Show Only Active
   * @default true
   */
  show_only_active?: boolean;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
  /** Event Short Id */
  eventShortId: string;
}

export interface TypePostReentryEventReportsParams {
  /**
   * Source
   * @default "UKSA"
   */
  source?: TypeExternalDataProvider;
}

export interface TypeGetReentryEventReportsReentryEventShortIdParams {
  /**
   * Show Only Active
   * @default true
   */
  show_only_active?: boolean;
  /**
   * Sort By
   * Sorting column
   * @default "report_number"
   */
  sort_by?: TypeReentryReportSortBy;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
  /** Short Id */
  shortId: string;
}

export interface TypeGetReentryEventsStatsParams {
  /**
   * Epoch
   * @default "future"
   */
  epoch?: TypeEpoch;
}

export interface TypeGetReentryEventsParams {
  /**
   * Report
   * @default "all"
   */
  report?: TypeReportFlagSettings;
  /**
   * Epoch
   * @default "future"
   */
  epoch?: TypeEpoch;
  /**
   * Sort By
   * Sorting column
   * @default "decay_epoch"
   */
  sort_by?: TypeReentryEventSortBy;
  /**
   * Search Like
   * Pattern search value, ie: 'ONE-'
   */
  search_like?: string | null;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetConjunctionEventsParams {
  /**
   * Sort By
   * Sorting column
   * @default "tca_time"
   */
  sort_by?: TypeEventsSortBy;
  /**
   * Norad Id
   * Satellite NORAD ID
   */
  norad_id?: string | null;
  /**
   * Search Like
   * Pattern search value, ie: 'ONE-'
   */
  search_like?: string | null;
  /**
   * Epoch
   * Describes future or past Events
   * @default "future"
   */
  epoch?: TypeEpoch;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetConjunctionEventsFutureEventsParams {
  /**
   * Sort By
   * Sorting column
   * @default "tca_time"
   */
  sort_by?: TypeEventsSortBy;
  /**
   * Norad Id
   * Satellite NORAD ID
   */
  norad_id?: string | null;
  /**
   * Search Like
   * Pattern search value, ie: 'ONE-'
   */
  search_like?: string | null;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetConjunctionEventsForAnalysisParams {
  /**
   * Threshold
   * Collision probability threshold in decimal format
   */
  threshold: number;
  /**
   * Sort By
   * Sorting column
   * @default "tca_time"
   */
  sort_by?: TypeEventsForAnalysisSortBy;
  /**
   * Max Age Days
   * Maximum age of Events (count from TCA)
   * @default 7
   */
  max_age_days?: number;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetConjunctionEventsFutureEventsForAnalysisParams {
  /**
   * Threshold
   * Collision probability threshold in decimal format. Events have to have probability of collision higher than 1e-5 (0.00001)
   */
  threshold: number;
  /**
   * Sort By
   * Sorting column
   * @default "tca_time"
   */
  sort_by?: TypeEventsForAnalysisSortBy;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetConjunctionEventsListParams {
  /**
   * Sort By
   * Sorting column
   * @default "tca_time"
   */
  sort_by?: TypeEventsSortBy;
  /**
   * Norad Id
   * Satellite NORAD ID
   */
  norad_id?: string | null;
  /**
   * Search Like
   * Pattern search value, ie: 'ONE-'
   */
  search_like?: string | null;
  /**
   * Epoch
   * Describes future or past Events
   * @default "future"
   */
  epoch?: TypeEpoch;
  /**
   * Report
   * @default "all"
   */
  report?: TypeReportFlagSettings;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetConjunctionEventsStatsParams {
  /**
   * Epoch
   * @default "future"
   */
  epoch?: TypeEpoch;
}

export interface TypeGetConjunctionEventsEventIdSummaryParams {
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
  /**
   * Event Id
   * Event short ID
   */
  eventId: string;
}

export interface TypeGetConjunctionEventsEventIdDataSourcesParams {
  /**
   * Cdm External Id
   * SpaceTrack CDM ID
   */
  cdm_external_id?: string | null;
  /**
   * Event Id
   * Event short ID
   */
  eventId: string;
}

export interface TypeGetConjunctionEventsCdmExternalIdParams {
  /**
   * Sort By
   * Sorting column
   */
  sort_by: TypeEventsByCDMExternalIDSortBy;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
  /**
   * Cdm External Id
   * SpaceTrack CDM External ID
   */
  cdmExternalId: string;
}

export interface TypeGetSatellitesWithMetadataParams {
  /**
   * Sort By
   * @default "future_events_count"
   */
  sort_by?: TypeSatellitesSortBy;
  /** Search Like */
  search_like?: string | null;
  /** Organization Id */
  organization_id?: string | null;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetSatellitesMonitoredParams {
  /** Sort By */
  sort_by?: TypeSatellitesOrganizationsSortBy | null;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetSatellitesByOrganizationsParams {
  /** Sort By */
  sort_by?: TypeSatellitesInOrganizationsSortBy | null;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetStatsEventsTypeParams {
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
}

export interface TypeGetStatsEventsByOrganizationParams {
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
}

export interface TypeGetStatsEventsBySatelliteParams {
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
  /**
   * Organization Id
   * @default "all"
   */
  organization_id?: string | "all";
}

export interface TypeGetStatsNotificationsSentParams {
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
  /**
   * Group By Month
   * @default false
   */
  group_by_month?: boolean | null;
  /**
   * Limit
   * @default 100
   */
  limit?: number;
  /**
   * Offset
   * @default 0
   */
  offset?: number;
  /**
   * Sort Order
   * @default "asc"
   */
  sort_order?: TypeSortOrder;
}

export interface TypeGetStatsCountConjunctionEventsParams {
  /**
   * Epoch
   * @default "future"
   */
  epoch?: TypeEpoch;
}

export interface TypeGetStatsCountReentryEventsParams {
  /**
   * Epoch
   * @default "future"
   */
  epoch?: TypeEpoch;
}

export interface TypeGetStatsCountReentryReportsParams {
  /**
   * Epoch
   * @default "future"
   */
  epoch?: TypeEpoch;
}

export interface TypeGetStatsMonthlyAnalysesParams {
  /**
   * Start Date
   * @format date
   * @default "2022-01-01"
   */
  start_date?: string;
  /**
   * End Date
   * @format date
   * @default "2026-03-01"
   */
  end_date?: string;
}

export interface TypeGetStatsMonthlyUsersParams {
  /**
   * Start Date
   * @format date
   * @default "2022-01-01"
   */
  start_date?: string;
  /**
   * End Date
   * @format date
   * @default "2026-03-01"
   */
  end_date?: string;
}

export interface TypeGetStatsMonthlyOrganizationsParams {
  /**
   * Start Date
   * @format date
   * @default "2022-01-01"
   */
  start_date?: string;
  /**
   * End Date
   * @format date
   * @default "2026-03-01"
   */
  end_date?: string;
}

export interface TypeGetStatsMonthlyManoeuvrePlotsParams {
  /**
   * Start Date
   * @format date
   * @default "2022-01-01"
   */
  start_date?: string;
  /**
   * End Date
   * @format date
   * @default "2026-03-01"
   */
  end_date?: string;
}

export interface TypeGetStatsMonthlyConjunctionEventsParams {
  /**
   * Start Date
   * @format date
   * @default "2022-01-01"
   */
  start_date?: string;
  /**
   * End Date
   * @format date
   * @default "2026-03-01"
   */
  end_date?: string;
}

export interface TypeGetStatsMonthlyConjunctionEventsByObjectTypeParams {
  /**
   * Start Date
   * @format date
   * @default "2022-01-01"
   */
  start_date?: string;
  /**
   * End Date
   * @format date
   * @default "2026-03-01"
   */
  end_date?: string;
}

export interface TypeGetStatsMonthlyObjectsLaunchedParams {
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
  /**
   * Only Uk Licensed
   * @default false
   */
  only_uk_licensed?: boolean;
}

export interface TypeGetStatsMonthlyReentryEventsParams {
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
}

export interface TypeGetStatsMonthlyReentryEventsByObjectTypeParams {
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
}

export interface TypeGetStatsReentryEventsParams {
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
  /**
   * Reentry Level
   * @default "Event"
   */
  reentry_level?: TypeEventLevel;
}

export interface TypeGetStatsFragmentationEventsParams {
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
}

export interface TypeGetStatsFragmentationEventsByFragmentationTypeParams {
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
}

export interface TypeGetStatsMonthlyFragmentationEventsParams {
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
}

export interface TypeGetStatsMonthlyFragmentationEventsByObjectTypeParams {
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
}

export interface TypeGetStatsMonthlyFragmentationEventsByFragmentationTypeParams {
  /** Start Date */
  start_date?: string | null;
  /** End Date */
  end_date?: string | null;
}

export interface TypePostTipsParams {
  /**
   * Source
   * @default "UKSA"
   */
  source?: TypeExternalDataProvider;
}

export interface TypeGetTipsLatestParams {
  /**
   * Show Only Active
   * @default true
   */
  show_only_active?: boolean;
}

export interface TypeGetTipsNoradIdParams {
  /**
   * Show Only Active
   * @default true
   */
  show_only_active?: boolean;
  /** Norad Id */
  noradId: string;
}
