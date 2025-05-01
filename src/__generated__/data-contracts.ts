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

/** AlertDryRunOut */
export interface TypeAlertDryRunOut {
  /** Emailrecipients */
  emailRecipients: TypeUserOut[];
  /** Smsrecipients */
  smsRecipients: TypeUserOut[];
  /** Additionalemails */
  additionalEmails: string[];
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
}

/** AlertSettingsIn */
export interface TypeAlertSettingsIn {
  conjunction_alert_settings: TypeConjunctionAlertSettings;
  reentry_alert_settings: TypeReentryAlertSettings;
}

/** AlertSettingsOut */
export interface TypeAlertSettingsOut {
  conjunction_alert_settings?: TypeConjunctionAlertSettings | null;
  reentry_alert_settings?: TypeReentryAlertSettings | null;
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
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  /**
   * Tcatime
   * @format date-time
   */
  tcaTime: string;
  /**
   * Collisionprobability
   * @min 0
   * @max 1
   */
  collisionProbability: number;
  /** Collisionprobabilitymethod */
  collisionProbabilityMethod: string;
  /**
   * Updatetime
   * @format date-time
   */
  updateTime: string;
  /** Cdmexternalid */
  cdmExternalId: string;
  /**
   * Isactive
   * @default true
   */
  isActive?: boolean | null;
  /** Missdistance */
  missDistance: number;
  /** Radialmissdistance */
  radialMissDistance?: number | null;
  /** Intrackmissdistance */
  intrackMissDistance?: number | null;
  /** Crosstrackmissdistance */
  crosstrackMissDistance?: number | null;
  missDistanceUncertainty?: TypeMissDistanceUncertainty | null;
  /** Altitude */
  altitude?: number | null;
  /** Latitude */
  latitude?: number | null;
  /** Longitude */
  longitude?: number | null;
  /** Relativevelocity */
  relativeVelocity?: number | null;
  /** Combinedmass */
  combinedMass?: number | null;
  /** Possiblefragments */
  possibleFragments?: number | null;
  /** Primaryobjectnoradid */
  primaryObjectNoradId: string;
  /** Secondaryobjectnoradid */
  secondaryObjectNoradId: string;
  primaryObjectObservationsData?: TypeSatelliteObservationsData | null;
  secondaryObjectObservationsData?: TypeSatelliteObservationsData | null;
  /**
   * Eventid
   * @format uuid
   */
  eventId: string;
  /** Eventshortid */
  eventShortId: string;
  /** Uploadedbyid */
  uploadedById?: string | null;
  /** Deletedbyid */
  deletedById?: string | null;
  /** Restoredbyid */
  restoredById?: string | null;
  /** Uploadedbyemail */
  uploadedByEmail?: string | null;
  /** Deletedbyemail */
  deletedByEmail?: string | null;
  /** Restoredbyemail */
  restoredByEmail?: string | null;
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
   * Isactive
   * @default true
   */
  isActive?: boolean;
}

/** BannerMessageSeverity */
export type TypeBannerMessageSeverity = "Low" | "Medium" | "High";

/** BannerMessageUpdate */
export interface TypeBannerMessageUpdate {
  /**
   * Messageid
   * @format uuid
   */
  messageId: string;
  /** Content */
  content?: string | null;
  /** @default "Low" */
  severity?: TypeBannerMessageSeverity | null;
  /** Title */
  title?: string | null;
  /**
   * Isactive
   * @default true
   */
  isActive?: boolean | null;
}

/** BannerMessagesBroadcastedOut */
export interface TypeBannerMessagesBroadcastedOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  /** Content */
  content: string;
  severity?: TypeBannerMessageSeverity | null;
  /** Title */
  title: string;
  /** Isactive */
  isActive: boolean;
  /**
   * Createdbyid
   * @format uuid
   */
  createdById: string;
  /**
   * Broadcaststart
   * @format date-time
   */
  broadcastStart: string;
  /**
   * Broadcastend
   * @format date-time
   */
  broadcastEnd: string;
  /**
   * Messageid
   * @format uuid
   */
  messageId: string;
  /**
   * Setbyid
   * @format uuid
   */
  setById: string;
}

/** BannerMessagesOut */
export interface TypeBannerMessagesOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  /** Content */
  content: string;
  severity?: TypeBannerMessageSeverity | null;
  /** Title */
  title: string;
  /** Isactive */
  isActive: boolean;
  /**
   * Createdbyid
   * @format uuid
   */
  createdById: string;
  /** Email */
  email: string;
  /** Firstname */
  firstName?: string | null;
  /** Lastname */
  lastName?: string | null;
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
   * Broadcaststart
   * @format date-time
   */
  broadcastStart: string;
  /**
   * Broadcastend
   * @format date-time
   */
  broadcastEnd: string;
  /**
   * Isactive
   * @default true
   */
  isActive?: boolean;
  /**
   * Messageid
   * @format uuid
   */
  messageId: string;
}

/** BannerSchedulesOut */
export interface TypeBannerSchedulesOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  /**
   * Broadcaststart
   * @format date-time
   */
  broadcastStart: string;
  /**
   * Broadcastend
   * @format date-time
   */
  broadcastEnd: string;
  /** Isactive */
  isActive: boolean;
  /**
   * Messageid
   * @format uuid
   */
  messageId: string;
  /**
   * Setbyid
   * @format uuid
   */
  setById: string;
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

/** Body_upload_conjunction_report_v1_conjunction_reports__post */
export interface TypeBodyUploadConjunctionReportV1ConjunctionReportsPost {
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
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  /** Externalid */
  externalId?: string | null;
  /**
   * Eventid
   * @format uuid
   */
  eventId: string;
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
  chosen_option: "all" | "priority" | "none";
  /**
   * Notification Types
   * @uniqueItems true
   * @default []
   */
  notification_types?: TypeNotificationType[];
}

/** ConjunctionEventAlertIn */
export interface TypeConjunctionEventAlertIn {
  /** Alerttype */
  alertType: ("standard" | "priority")[];
  /** Additionalemails */
  additionalEmails: string[];
}

/** ConjunctionEventAlertOut */
export interface TypeConjunctionEventAlertOut {
  /** Conjunctioneventshortid */
  conjunctionEventShortId: string;
  /**
   * Conjunctionreportid
   * @format uuid
   */
  conjunctionReportId: string;
  /** Alerttype */
  alertType: ("standard" | "priority")[];
  /** Additionalrecipients */
  additionalRecipients: string[] | null;
  /** Emailnotificationsendingstatus */
  emailNotificationSendingStatus: "scheduled" | "in-progress" | "delivered";
  /** Smsnotificationsendingstatus */
  smsNotificationSendingStatus: "scheduled" | "in-progress" | "delivered";
}

/** ConjunctionEventCount */
export interface TypeConjunctionEventCount {
  /**
   * Conjunctioneventalertcount
   * @default 0
   */
  conjunctionEventAlertCount?: number;
  /**
   * Conjunctioneventnormalcount
   * @default 0
   */
  conjunctionEventNormalCount?: number;
  /** Conjunctioneventtotalcount */
  conjunctionEventTotalCount: number;
}

/** ConjunctionReportOut */
export interface TypeConjunctionReportOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  /** Shortid */
  shortId: string;
  /** Reportnumber */
  reportNumber: number;
  /** Reporttime */
  reportTime?: string | null;
  /** Risk */
  risk: "Low" | "Medium" | "High";
  /** Alerttype */
  alertType: ("priority" | "standard")[];
  /** Tcatime */
  tcaTime?: string | null;
  /** Collisionprobability */
  collisionProbability: number;
  /** Manoeuvreexpected */
  manoeuvreExpected?: string | null;
  /** Primaryobjectcommonname */
  primaryObjectCommonName: string;
  /** Primaryobjectnoradid */
  primaryObjectNoradId: string;
  /** Primaryobjectlicensingcountry */
  primaryObjectLicensingCountry?: string | null;
  /** Primaryobjecttype */
  primaryObjectType?: string | null;
  /** Primaryobjectmission */
  primaryObjectMission?: string | null;
  /** Primaryobjectmass */
  primaryObjectMass?: number | null;
  /** Primaryobjectmanoeuvrable */
  primaryObjectManoeuvrable?: string | null;
  /** Secondaryobjectcommonname */
  secondaryObjectCommonName: string;
  /** Secondaryobjectnoradid */
  secondaryObjectNoradId: string;
  /** Secondaryobjectlicensingcountry */
  secondaryObjectLicensingCountry?: string | null;
  /** Secondaryobjecttype */
  secondaryObjectType?: string | null;
  /** Secondaryobjectmission */
  secondaryObjectMission?: string | null;
  /** Secondaryobjectmass */
  secondaryObjectMass?: number | null;
  /** Secondaryobjectmanoeuvrable */
  secondaryObjectManoeuvrable?: string | null;
  /** Execsummaryaddition */
  execSummaryAddition?: string | null;
  /** Manoeuvreaddition */
  manoeuvreAddition?: string | null;
  /** Immediateimpactaddition */
  immediateImpactAddition?: string | null;
  /** Shorttermimpactaddition */
  shortTermImpactAddition?: string | null;
  /** Riskataltitude */
  riskAtAltitude?: string | null;
  /** Longtermimpactaddition */
  longTermImpactAddition?: string | null;
  /** Ukresponseaddition */
  ukResponseAddition?: string | null;
  /** Pressattentionaddition */
  pressAttentionAddition?: string | null;
  /** Missdistance */
  missDistance?: number | null;
  /** Impactspeed */
  impactSpeed?: number | null;
  /** Altitude */
  altitude?: number | null;
  /** Latitude */
  latitude?: number | null;
  /** Longitude */
  longitude?: number | null;
  /** Predictedfragments */
  predictedFragments?: number | null;
  /** Increaseinfuturecollisions */
  increaseInFutureCollisions?: number | null;
  /**
   * Isactive
   * @default true
   */
  isActive?: boolean;
  /** Uploadedbyid */
  uploadedById?: string | null;
  /** Deletedbyid */
  deletedById?: string | null;
  /** Presignedurl */
  presignedUrl?: string | null;
  /** Filename */
  fileName: string;
}

/** ContactAnalystIn */
export interface TypeContactAnalystIn {
  /** Eventid */
  eventId: string;
  /** Messagecontent */
  messageContent?: string | null;
  /** Ccemail */
  ccEmail?: string | null;
}

/** DataSource */
export type TypeDataSource = "Space-Track CDM" | "UKSA Analysis";

/** DataSourcesOut */
export interface TypeDataSourcesOut {
  /** Spacetrackcdm */
  spaceTrackCdm: TypeEventDataSource[];
  /** Uksaanalysis */
  uksaAnalysis: TypeEventDataSource[];
}

/** EphemerisOut */
export interface TypeEphemerisOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  /** Isactive */
  isActive?: boolean | null;
  /**
   * Creationdate
   * @format date-time
   */
  creationDate: string;
  /** Originator */
  originator: string;
  /** Objectname */
  objectName: string;
  /** Internationaldesignator */
  internationalDesignator: string;
  refFrame: TypeReferenceFrame;
  timeSystem: TypeTimeSystem;
  /**
   * Starttime
   * @format date-time
   */
  startTime: string;
  /**
   * Stoptime
   * @format date-time
   */
  stopTime: string;
  /** Centername */
  centerName: string;
  /** Filename */
  fileName: string;
  /** Satellite */
  satellite: string;
  /**
   * Uploader
   * @format uuid
   */
  uploader: string;
  /**
   * Uploaderorganization
   * @format uuid
   */
  uploaderOrganization: string;
  /** Deletedbyid */
  deletedById?: string | null;
  /** Restoredbyid */
  restoredById?: string | null;
  /** Uploadedbyemail */
  uploadedByEmail?: string | null;
  /** Uploadedbyorganizationname */
  uploadedByOrganizationName?: string | null;
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
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  /** Shortid */
  shortId: string;
  /** Primaryobjectnoradid */
  primaryObjectNoradId: string;
  /** Secondaryobjectnoradid */
  secondaryObjectNoradId: string;
  /** Primaryobjectcommonname */
  primaryObjectCommonName?: string | null;
  /** Secondaryobjectcommonname */
  secondaryObjectCommonName?: string | null;
  /**
   * Tcatime
   * @format date-time
   */
  tcaTime: string;
  /** Collisionprobability */
  collisionProbability?: number | null;
  /** Collisionprobabilitymethod */
  collisionProbabilityMethod?: string | null;
  dataSource: TypeDataSource;
  /** Missdistance */
  missDistance: number;
  /** Radialmissdistance */
  radialMissDistance?: number | null;
  /** Intrackmissdistance */
  intrackMissDistance?: number | null;
  /** Crosstrackmissdistance */
  crosstrackMissDistance?: number | null;
  /** Altitude */
  altitude?: number | null;
  /** Latitude */
  latitude?: number | null;
  /** Longitude */
  longitude?: number | null;
  /** Relativevelocity */
  relativeVelocity?: number | null;
  /** Combinedmass */
  combinedMass?: number | null;
  /** Possiblefragments */
  possibleFragments?: number | null;
  /** Cdmcreationdate */
  cdmCreationDate?: string | null;
  /** Cdmexternalid */
  cdmExternalId: string;
}

/** EventDataSource */
export interface TypeEventDataSource {
  dataSource?: TypeDataSource | null;
  /** Datareceived */
  dataReceived?: string | null;
  /** Observationsnumber */
  observationsNumber?: number | null;
  /** Observationstimespan */
  observationsTimespan?: number | null;
  /** Noradid */
  noradId: string;
  /** Ephemerisname */
  ephemerisName?: string | null;
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

/** EventOut */
export interface TypeEventOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  /** Shortid */
  shortId: string;
  /** Primaryobjectnoradid */
  primaryObjectNoradId: string;
  /** Secondaryobjectnoradid */
  secondaryObjectNoradId: string;
  /** Primaryobjectcommonname */
  primaryObjectCommonName?: string | null;
  /** Secondaryobjectcommonname */
  secondaryObjectCommonName?: string | null;
  /**
   * Tcatime
   * @format date-time
   */
  tcaTime: string;
  /** Collisionprobability */
  collisionProbability?: number | null;
  /** Collisionprobabilitymethod */
  collisionProbabilityMethod?: string | null;
  dataSource: TypeDataSource;
  /** Missdistance */
  missDistance: number;
  /** Radialmissdistance */
  radialMissDistance?: number | null;
  /** Intrackmissdistance */
  intrackMissDistance?: number | null;
  /** Crosstrackmissdistance */
  crosstrackMissDistance?: number | null;
  /** Altitude */
  altitude?: number | null;
  /** Latitude */
  latitude?: number | null;
  /** Longitude */
  longitude?: number | null;
  /** Relativevelocity */
  relativeVelocity?: number | null;
  /** Combinedmass */
  combinedMass?: number | null;
  /** Possiblefragments */
  possibleFragments?: number | null;
  /** Cdmcreationdate */
  cdmCreationDate?: string | null;
  /** Cdmexternalid */
  cdmExternalId?: string | null;
  userInterest: TypeUserInterest;
  additionalAnalysis?: TypeAdditionalAnalysis | null;
  /** Reportnumber */
  reportNumber?: number | null;
}

/** EventSatellitesOut */
export interface TypeEventSatellitesOut {
  /** Shortid */
  shortId: string;
  primaryObject: TypeSatelliteOut;
  secondaryObject: TypeSatelliteOut | null;
}

/** EventSummaryOut */
export interface TypeEventSummaryOut {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Shortid */
  shortId: string;
  /**
   * Updatetime
   * @format date-time
   */
  updateTime: string;
  /** Cdmid */
  cdmId?: string | null;
  /** Cdmexternalid */
  cdmExternalId: string;
  /** Primaryobjectephemerisname */
  primaryObjectEphemerisName?: string | null;
  /** Secondaryobjectephemerisname */
  secondaryObjectEphemerisName?: string | null;
  /** Primaryobjectnoradid */
  primaryObjectNoradId: string;
  /** Secondaryobjectnoradid */
  secondaryObjectNoradId: string;
  /**
   * Tcatime
   * @format date-time
   */
  tcaTime: string;
  /** Collisionprobability */
  collisionProbability?: number | null;
  /** Collisionprobabilitymethod */
  collisionProbabilityMethod?: string | null;
  dataSource: TypeDataSource;
  /** Missdistance */
  missDistance: number;
  /** Radialmissdistance */
  radialMissDistance?: number | null;
  /** Intrackmissdistance */
  intrackMissDistance?: number | null;
  /** Crosstrackmissdistance */
  crosstrackMissDistance?: number | null;
  primaryObjectUncertainties?: TypePositionUncertainty | null;
  secondaryObjectUncertainties?: TypePositionUncertainty | null;
  primaryObjectCdmType?: TypeCDMType | null;
  secondaryObjectCdmType?: TypeCDMType | null;
  /** Altitude */
  altitude?: number | null;
  /** Latitude */
  latitude?: number | null;
  /** Longitude */
  longitude?: number | null;
  /** Relativevelocity */
  relativeVelocity?: number | null;
  /** Combinedmass */
  combinedMass?: number | null;
  /** Possiblefragments */
  possibleFragments?: number | null;
  /** Primaryobjectsize */
  primaryObjectSize?: number | null;
  /** Secondaryobjectsize */
  secondaryObjectSize?: number | null;
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
  | "user_interest";

/** ExternalDataPerformanceAggregateOut */
export interface TypeExternalDataPerformanceAggregateOut {
  /** Sourcetype */
  sourceType: string;
  /** Sourceprovider */
  sourceProvider: string;
  /** Ingestionsum */
  ingestionSum?: number | null;
  /**
   * Ingestiondate
   * @format date-time
   */
  ingestionDate: string;
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
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  sourceProvider: TypeExternalDataProvider;
  sourceType: TypeExternalDataType;
  /**
   * Ingestionstart
   * @format date-time
   */
  ingestionStart: string;
  /** Ingestionend */
  ingestionEnd?: string | null;
  /** Itemsfetched */
  itemsFetched?: number | null;
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
  | "Conjunction Report";

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
   * Tcatime
   * @format date-time
   */
  tcaTime: string;
  /** Eventshortid */
  eventShortId: string;
  /** Cdmexternalid */
  cdmExternalId: string;
  /** Primaryobjectnoradid */
  primaryObjectNoradId: string;
  /** Secondaryobjectnoradid */
  secondaryObjectNoradId: string;
  /** Filename */
  fileName: string;
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
  /** Filename */
  fileName: string;
  /** Presignedurl */
  presignedUrl: string;
}

/** ManoeuvrePlotWithUserMetadataOut */
export interface TypeManoeuvrePlotWithUserMetadataOut {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /**
   * Createdat
   * @format date-time
   */
  createdAt: string;
  /**
   * Tcatime
   * @format date-time
   */
  tcaTime: string;
  /** Eventshortid */
  eventShortId: string;
  /** Cdmexternalid */
  cdmExternalId: string;
  /** Primaryobjectnoradid */
  primaryObjectNoradId: string;
  /** Secondaryobjectnoradid */
  secondaryObjectNoradId: string;
  /** Uploadedbyemail */
  uploadedByEmail: string | null;
  /** Uploadedbyid */
  uploadedById: string | null;
  /** Filename */
  fileName: string;
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
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  /** Name */
  name: string;
  /** Emaildomain */
  emailDomain: string;
  /** Allowedroles */
  allowedRoles?: TypeUserRole[] | null;
  /** Accountscount */
  accountsCount: number;
  /** Adminaccountscount */
  adminAccountsCount: number;
  /** Satellitescount */
  satellitesCount: number;
}

/** PositionUncertainty */
export interface TypePositionUncertainty {
  /** Radialpositionuncertainty */
  radialPositionUncertainty: number;
  /** Intrackpositionuncertainty */
  intrackPositionUncertainty: number;
  /** Crosstrackpositionuncertainty */
  crosstrackPositionUncertainty: number;
}

/** ReentryAlertSettings */
export interface TypeReentryAlertSettings {
  /**
   * Alert Type
   * @default "reentry"
   */
  alert_type?: "reentry";
  /** Chosen Option */
  chosen_option: "all" | "priority" | "uk_satellites_only" | "none";
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

/** ReentryEventAlertIn */
export interface TypeReentryEventAlertIn {
  /** Alerttype */
  alertType: ("standard" | "priority" | "uk_satellites_only" | "closedown")[];
  /**
   * Additionalemails
   * @default []
   */
  additionalEmails?: string[];
}

/** ReentryEventAlertOut */
export interface TypeReentryEventAlertOut {
  /**
   * Reentryeventid
   * @format uuid
   */
  reentryEventId: string;
  /**
   * Reentryreportid
   * @format uuid
   */
  reentryReportId: string;
  /** Alerttype */
  alertType: ("standard" | "priority" | "uk_satellites_only" | "closedown")[];
  /** Additionalrecipients */
  additionalRecipients: string[] | null;
  /** Emailnotificationsendingstatus */
  emailNotificationSendingStatus: "scheduled" | "in-progress" | "delivered";
  /** Smsnotificationsendingstatus */
  smsNotificationSendingStatus: "scheduled" | "in-progress" | "delivered";
}

/** ReentryEventCount */
export interface TypeReentryEventCount {
  /**
   * Reentryeventalertcount
   * @default 0
   */
  reentryEventAlertCount?: number;
  /**
   * Reentryeventnormalcount
   * @default 0
   */
  reentryEventNormalCount?: number;
  /** Reentryeventtotalcount */
  reentryEventTotalCount: number;
}

/** ReentryEventOut */
export interface TypeReentryEventOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  /** Shortid */
  shortId: string;
  /** Noradid */
  noradId: string;
  /**
   * Timewindowstart
   * @format date-time
   */
  timeWindowStart: string;
  /**
   * Timewindowend
   * @format date-time
   */
  timeWindowEnd: string;
  /** Decayepoch */
  decayEpoch?: string | null;
  /** Uncertaintywindow */
  uncertaintyWindow?: number | null;
  /** Tipexternalid */
  tipExternalId: string;
  /** Reentryreportnumber */
  reentryReportNumber?: number | null;
  /** Montecarloprobability */
  monteCarloProbability?: number | null;
  monteCarloRisk?: TypeReentryRisk | null;
  /** Fragmentsprobability */
  fragmentsProbability?: number | null;
  fragmentsRisk?: TypeReentryRisk | null;
  /** Fragmentsnumber */
  fragmentsNumber?: number | null;
  /** Humancasualtyprobability */
  humanCasualtyProbability?: number | null;
  humanCasualtyRisk?: TypeReentryRisk | null;
  /** Overflighttime */
  overflightTime: string[];
  survivability?: TypeReentrySurvivability | null;
  /** Survivabilitycomment */
  survivabilityComment?: string | null;
  /** Execsummary */
  execSummary?: string | null;
  /** Immediateresponse */
  immediateResponse?: string | null;
  /** Recoveryandcleanup */
  recoveryAndCleanUp?: string | null;
  /** Damagesliability */
  damagesLiability?: string | null;
  /** Pressattention */
  pressAttention?: string | null;
  /** Objectname */
  objectName?: string | null;
  /** Objecttype */
  objectType?: string | null;
  /** Estimatedmass */
  estimatedMass?: number | null;
  /** Licensecountry */
  licenseCountry?: string | null;
  /** Internationaldesignator */
  internationalDesignator?: string | null;
  /** Objectheight */
  objectHeight?: number | null;
  /** Objectwidth */
  objectWidth?: number | null;
  /** Objectspan */
  objectSpan?: number | null;
  /** Launchingyear */
  launchingYear?: number | null;
  /** Apogee */
  apogee?: number | null;
  /** Perigee */
  perigee?: number | null;
  /** Inclination */
  inclination?: number | null;
  /** Approvedbyid */
  approvedById?: string | null;
  /** Approvedat */
  approvedAt?: string | null;
  /** Licensedcountry */
  licensedCountry?: string | null;
  /** Ukreentryprobability */
  ukReentryProbability?: string | null;
}

/** ReentryEventPatch */
export interface TypeReentryEventPatch {
  /** Exec Summary */
  exec_summary?: string | null;
  /** Immediate Response */
  immediate_response?: string | null;
  /** Recovery And Clean Up */
  recovery_and_clean_up?: string | null;
  /** Damages Liability */
  damages_liability?: string | null;
  /** Press Attention */
  press_attention?: string | null;
}

/** ReentryEventReportOut */
export interface TypeReentryEventReportOut {
  /**
   * Id
   * @format uuid
   */
  id?: string;
  /**
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  /** Shortid */
  shortId: string;
  /** Noradid */
  noradId: string;
  /** Tipexternalid */
  tipExternalId?: string | null;
  /**
   * Timewindowstart
   * @format date-time
   */
  timeWindowStart: string;
  /**
   * Timewindowend
   * @format date-time
   */
  timeWindowEnd: string;
  /**
   * Decayepoch
   * @format date-time
   */
  decayEpoch: string;
  /** Uncertaintywindow */
  uncertaintyWindow?: number | null;
  /** Reportnumber */
  reportNumber: number;
  /** Alerttype */
  alertType: ("priority" | "standard" | "uk_satellites_only" | "closedown")[];
  /**
   * Reporttime
   * @format date-time
   */
  reportTime: string;
  /** Montecarloprobability */
  monteCarloProbability: number;
  monteCarloRisk?: TypeReentryRisk | null;
  /** Fragmentsprobability */
  fragmentsProbability?: number | null;
  fragmentsRisk?: TypeReentryRisk | null;
  /** Fragmentsnumber */
  fragmentsNumber?: number | null;
  /** Humancasualtyprobability */
  humanCasualtyProbability?: number | null;
  humanCasualtyRisk?: TypeReentryRisk | null;
  survivability: TypeReentrySurvivability;
  /** Survivabilitycomment */
  survivabilityComment?: string | null;
  /** Overflighttime */
  overflightTime: string[];
  /**
   * Isactive
   * @default true
   */
  isActive?: boolean;
  /** Objectname */
  objectName?: string | null;
  /** Objecttype */
  objectType?: string | null;
  /** Estimatedmass */
  estimatedMass?: number | null;
  /** Licensing Country */
  licensing_country?: string | null;
  /** Internationaldesignator */
  internationalDesignator?: string | null;
  /** Objectheight */
  objectHeight?: number | null;
  /** Objectwidth */
  objectWidth?: number | null;
  /** Objectspan */
  objectSpan?: number | null;
  /** Launchingyear */
  launchingYear?: number | null;
  /** Apogee */
  apogee?: number | null;
  /** Perigee */
  perigee?: number | null;
  /** Inclination */
  inclination?: number | null;
  impact?: TypeReentryEventReportImpact | null;
  /** Uploadedbyid */
  uploadedById?: string | null;
  /** Deletedbyid */
  deletedById?: string | null;
  /** Presignedurl */
  presignedUrl?: string | null;
  /** Filename */
  fileName: string;
}

/** ReentryEventSortBy */
export type TypeReentryEventSortBy =
  | "created_at"
  | "license_country"
  | "norad_id"
  | "object_name"
  | "monte_carlo_probability"
  | "short_id"
  | "survivability"
  | "time_window_end"
  | "time_window_start"
  | "tip_external_id"
  | "uk_reentry_probability"
  | "overflight_time"
  | "updated_at";

/** ReentryInterest */
export type TypeReentryInterest = "low" | "high";

/** ReentryReportSortBy */
export type TypeReentryReportSortBy = "created_at" | "tip_external_id" | "report_number" | "updated_at";

/** ReentryRisk */
export type TypeReentryRisk = "Low" | "Medium" | "High";

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
  /** Noradid */
  noradId: string;
  /** Commonname */
  commonName: string;
  /**
   * Organizationid
   * @format uuid
   */
  organizationId: string;
  /** Organizationname */
  organizationName?: string | null;
  /** Internationaldesignator */
  internationalDesignator: string;
  /** Esadiscosid */
  esaDiscosId?: string | null;
}

/** SatelliteOut */
export interface TypeSatelliteOut {
  /**
   * Id
   * @format uuid
   */
  id: string;
  /** Ismonitored */
  isMonitored: boolean;
  /** Commonname */
  commonName: string;
  /** Noradid */
  noradId?: string | null;
  /** Esaupdatetime */
  esaUpdateTime?: string | null;
  /** Esadiscosid */
  esaDiscosId?: string | null;
  /** Internationaldesignator */
  internationalDesignator: string;
  /** Objecttype */
  objectType?: string | null;
  /** Licensecountry */
  licenseCountry?: string | null;
  /** Launchdate */
  launchDate?: string | null;
  /** Launchsite */
  launchSite?: string | null;
  /** Apogee */
  apogee?: string | null;
  /** Perigee */
  perigee?: string | null;
  /** Inclination */
  inclination?: number | null;
  /** Period */
  period?: number | null;
  /** Organizationid */
  organizationId?: string | null;
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
  /** Crosssectionmin */
  crossSectionMin?: number | null;
  /** Crosssectionavg */
  crossSectionAvg?: number | null;
  /** Crosssectionmax */
  crossSectionMax?: number | null;
  /** Shape */
  shape?: string | null;
  /** Objectclass */
  objectClass?: string | null;
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
  /** Ismonitored */
  isMonitored: boolean;
  /** Commonname */
  commonName: string;
  /** Noradid */
  noradId?: string | null;
  /** Esaupdatetime */
  esaUpdateTime?: string | null;
  /** Esadiscosid */
  esaDiscosId?: string | null;
  /** Internationaldesignator */
  internationalDesignator: string;
  /** Objecttype */
  objectType?: string | null;
  /** Licensecountry */
  licenseCountry?: string | null;
  /** Launchdate */
  launchDate?: string | null;
  /** Launchsite */
  launchSite?: string | null;
  /** Apogee */
  apogee?: string | null;
  /** Perigee */
  perigee?: string | null;
  /** Inclination */
  inclination?: number | null;
  /** Period */
  period?: number | null;
  /** Organizationid */
  organizationId?: string | null;
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
  /** Crosssectionmin */
  crossSectionMin?: number | null;
  /** Crosssectionavg */
  crossSectionAvg?: number | null;
  /** Crosssectionmax */
  crossSectionMax?: number | null;
  /** Shape */
  shape?: string | null;
  /** Objectclass */
  objectClass?: string | null;
  /** Metadata */
  metadata: object;
}

/** SatellitesCountByOrganizationOut */
export interface TypeSatellitesCountByOrganizationOut {
  /** Organizationname */
  organizationName: string;
  /** Satellitescount */
  satellitesCount: number;
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
  /** Eventtype */
  eventType?: string | null;
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
  /** Collisionprobabilityrange */
  collisionProbabilityRange: string;
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
  /** Collisionprobabilityrange */
  collisionProbabilityRange: string;
}

/** StatisticsEventsBySatellite */
export interface TypeStatisticsEventsBySatellite {
  /** Commonname */
  commonName: string;
  /** Noradid */
  noradId: string;
  /** Events */
  events: number;
  /** Collisionprobabilityrange */
  collisionProbabilityRange: string;
  /** Organizationname */
  organizationName: string;
}

/** StatisticsEventsType */
export interface TypeStatisticsEventsType {
  /** Eventtype */
  eventType: string;
  /** Count */
  count: number;
}

/** StatisticsHighestUpcomingCollisionProbability */
export interface TypeStatisticsHighestUpcomingCollisionProbability {
  /** Collisionprobability */
  collisionProbability: number;
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
  /** Runningtotal */
  runningTotal: number;
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

/** StatisticsReentryEventsAndAlertsMonthlyCount */
export interface TypeStatisticsReentryEventsAndAlertsMonthlyCount {
  /** Month */
  month: string;
  /** Count */
  count: number;
  /** Alertcount */
  alertCount: number;
}

/** StatisticsReentryEventsByObjectTypeMonthlyCount */
export interface TypeStatisticsReentryEventsByObjectTypeMonthlyCount {
  /** Objecttype */
  objectType?: string | null;
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
  /** Objecttype */
  objectType: string;
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
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  /** Noradid */
  noradId: string;
  /** Externalid */
  externalId: string;
  /**
   * Creationdate
   * @format date-time
   */
  creationDate: string;
  /**
   * Decayepoch
   * @format date-time
   */
  decayEpoch: string;
  /** Uncertaintywindow */
  uncertaintyWindow: number;
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
  /** Nextreporttime */
  nextReportTime?: number | null;
  /** @default "SpaceTrack" */
  source?: TypeExternalDataProvider;
  /**
   * Timewindowstart
   * @format date-time
   */
  timeWindowStart?: string;
  /**
   * Timewindowend
   * @format date-time
   */
  timeWindowEnd: string;
  /**
   * Isactive
   * @default true
   */
  isActive?: boolean;
  /** Uploadedbyid */
  uploadedById?: string | null;
  /** Deletedbyid */
  deletedById?: string | null;
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
  /** Shortid */
  shortId: string;
  /**
   * Createdat
   * @format date-time
   */
  createdAt?: string;
  /**
   * Updatedat
   * @format date-time
   */
  updatedAt?: string;
  /** Primaryobjectnoradid */
  primaryObjectNoradId: string;
  /** Secondaryobjectnoradid */
  secondaryObjectNoradId: string;
  /** Primaryobjectcommonname */
  primaryObjectCommonName?: string | null;
  /** Secondaryobjectcommonname */
  secondaryObjectCommonName?: string | null;
  /**
   * Tca
   * @format date-time
   */
  tca: string;
  /** Maximumcollisionprobability */
  maximumCollisionProbability?: number | null;
  /** Reportnumber */
  reportNumber?: number | null;
  /** Execsummaryaddition */
  execSummaryAddition?: string | null;
  /** Manoeuvreaddition */
  manoeuvreAddition?: string | null;
  /** Immediateimpactaddition */
  immediateImpactAddition?: string | null;
  /** Shorttermimpactaddition */
  shortTermImpactAddition?: string | null;
  /** Riskataltitude */
  riskAtAltitude?: string | null;
  /** Longtermimpactaddition */
  longTermImpactAddition?: string | null;
  /** Ukresponseaddition */
  ukResponseAddition?: string | null;
  /** Pressattentionaddition */
  pressAttentionAddition?: string | null;
  /** Missdistance */
  missDistance?: number | null;
  /** Radialmissdistance */
  radialMissDistance?: number | null;
  /** Collisionprobabilityuksa */
  collisionProbabilityUksa?: number | null;
  /** Collisionprobabilityst */
  collisionProbabilitySt?: number | null;
  /** Cdmexternalid */
  cdmExternalId?: string | null;
  /** Cdmcreationdate */
  cdmCreationDate?: string | null;
}

/** UniqueEventUpdateTextFieldsIn */
export interface TypeUniqueEventUpdateTextFieldsIn {
  /**
   * Updated At
   * @default "2025-04-14T07:07:45.410660"
   */
  updated_at?: string | null;
  /** Report Number */
  report_number?: number | null;
  /** Exec Summary Addition */
  exec_summary_addition?: string | null;
  /** Manoeuvre Addition */
  manoeuvre_addition?: string | null;
  /** Immediate Impact Addition */
  immediate_impact_addition?: string | null;
  /** Short Term Impact Addition */
  short_term_impact_addition?: string | null;
  /** Risk At Altitude */
  risk_at_altitude?: string | null;
  /** Long Term Impact Addition */
  long_term_impact_addition?: string | null;
  /** Uk Response Addition */
  uk_response_addition?: string | null;
  /** Press Attention Addition */
  press_attention_addition?: string | null;
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
  /** Firstname */
  firstName?: string | null;
  /** Lastname */
  lastName?: string | null;
  /**
   * Email
   * @format email
   */
  email: string;
  /** Phonenumber */
  phoneNumber?: string | null;
  /** @default "SATELLITE_OPERATOR_USER" */
  role?: TypeUserRole;
  /** Isactive */
  isActive: boolean;
  /**
   * Organizationid
   * @format uuid
   */
  organizationId: string;
  /** Accountdetailsconfirmedat */
  accountDetailsConfirmedAt?: string | null;
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
  | "AGENCY_SUPERUSER";

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
  /** Collisionprobability */
  collisionProbability: number;
  /** Collisionprobabilitymethod */
  collisionProbabilityMethod: string;
  /**
   * Updatetime
   * @format date-time
   */
  updateTime: string;
}

/** _OverflightProbability */
export interface TypeOverflightProbability {
  /** Probability */
  probability: number;
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
   * @default "time_window_start"
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
   * @default "2025-05-01"
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
   * @default "2025-05-01"
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
   * @default "2025-05-01"
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
   * @default "2025-05-01"
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
   * @default "2025-05-01"
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
   * @default "2025-05-01"
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
