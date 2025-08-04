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

import {
  TypeAlertDryRunOut,
  TypeAlertSettingsDistributionList,
  TypeAlertSettingsIn,
  TypeAlertSettingsOut,
  TypeAnalysis,
  TypeAnalysisOut,
  TypeBannerMessage,
  TypeBannerMessageIn,
  TypeBannerMessageUpdate,
  TypeBannerMessagesBroadcastedOut,
  TypeBannerMessagesOut,
  TypeBannerSchedule,
  TypeBannerScheduleIn,
  TypeBannerSchedulesOut,
  TypeBodyCreateAnalysisV1AnalysesPost,
  TypeBodyCreateEphemerisV1EphemerisPost,
  TypeBodyPostConjunctionReportV1ConjunctionReportsPost,
  TypeBodyPostFragmentationEventReportV1FragmentationReportsPost,
  TypeBodyUploadManoeuvrePlotFileV1ManoeuvrePlotsPost,
  TypeBodyUploadReentryEventReportV1ReentryEventReportsPost,
  TypeBodyUploadTrackingAndImpactPredictionFileV1TipsPost,
  TypeCDMOut,
  TypeConjunctionEventAlertIn,
  TypeConjunctionEventAlertOut,
  TypeConjunctionEventCount,
  TypeConjunctionReportOut,
  TypeContactAnalystIn,
  TypeDataSourcesOut,
  TypeEphemerisOut,
  TypeEventCDMOut,
  TypeEventForAnalysisOut,
  TypeEventOut,
  TypeEventSatellitesOut,
  TypeEventSummaryOut,
  TypeExternalDataPerformanceAggregateOut,
  TypeExternalDataPerformanceOut,
  TypeFragmentationEvent,
  TypeFragmentationReport,
  TypeGetAnalysesParams,
  TypeGetBannersMessagesCurrentParams,
  TypeGetBannersMessagesParams,
  TypeGetBannersSchedulesParams,
  TypeGetConjunctionEventsCdmExternalIdParams,
  TypeGetConjunctionEventsEventIdDataSourcesParams,
  TypeGetConjunctionEventsEventIdSummaryParams,
  TypeGetConjunctionEventsForAnalysisParams,
  TypeGetConjunctionEventsFutureEventsForAnalysisParams,
  TypeGetConjunctionEventsFutureEventsParams,
  TypeGetConjunctionEventsListParams,
  TypeGetConjunctionEventsParams,
  TypeGetConjunctionEventsStatsParams,
  TypeGetConjunctionReportsConjunctionEventShortIdParams,
  TypeGetEphemerisParams,
  TypeGetExternalDataPerformanceAggregatedParams,
  TypeGetExternalDataPerformanceParams,
  TypeGetFragmentationEventsParams,
  TypeGetFragmentationReportsFragmentationEventShortIdParams,
  TypeGetFragmentationReportsParams,
  TypeGetManoeuvrePlotsByEventEventShortIdParams,
  TypeGetManoeuvrePlotsParams,
  TypeGetReentryEventReportsReentryEventShortIdParams,
  TypeGetReentryEventsParams,
  TypeGetReentryEventsStatsParams,
  TypeGetSatellitesByOrganizationsParams,
  TypeGetSatellitesMonitoredParams,
  TypeGetSatellitesWithMetadataParams,
  TypeGetStatsCountConjunctionEventsParams,
  TypeGetStatsCountReentryEventsParams,
  TypeGetStatsCountReentryReportsParams,
  TypeGetStatsEventsByOrganizationParams,
  TypeGetStatsEventsBySatelliteParams,
  TypeGetStatsEventsTypeParams,
  TypeGetStatsFragmentationEventsParams,
  TypeGetStatsMonthlyAnalysesParams,
  TypeGetStatsMonthlyConjunctionEventsByObjectTypeParams,
  TypeGetStatsMonthlyConjunctionEventsParams,
  TypeGetStatsMonthlyFragmentationEventsByObjectTypeParams,
  TypeGetStatsMonthlyFragmentationEventsParams,
  TypeGetStatsMonthlyManoeuvrePlotsParams,
  TypeGetStatsMonthlyObjectsLaunchedParams,
  TypeGetStatsMonthlyOrganizationsParams,
  TypeGetStatsMonthlyReentryEventsByObjectTypeParams,
  TypeGetStatsMonthlyReentryEventsParams,
  TypeGetStatsMonthlyUsersParams,
  TypeGetStatsNotificationsSentParams,
  TypeGetStatsReentryEventsParams,
  TypeGetTipsLatestParams,
  TypeGetTipsNoradIdParams,
  TypeHTTPValidationError,
  TypeManoeuvrePlot,
  TypeManoeuvrePlotMetadataOut,
  TypeManoeuvrePlotOut,
  TypeManoeuvrePlotWithUserMetadataOut,
  TypeOrganizationOut,
  TypePostConjunctionReportsParams,
  TypePostReentryEventReportsParams,
  TypePostTipsParams,
  TypeReentryEventAlertIn,
  TypeReentryEventAlertOut,
  TypeReentryEventCount,
  TypeReentryEventOut,
  TypeReentryEventPatch,
  TypeReentryEventReportOut,
  TypeSatelliteOrganizationOut,
  TypeSatelliteOut,
  TypeSatelliteUpdateIn,
  TypeSatelliteWithMetadataOut,
  TypeSatellitesCountByOrganizationOut,
  TypeStatisticsConjunctionEventsByObjectTypeMonthlyCount,
  TypeStatisticsConjunctionEventsCount,
  TypeStatisticsConjunctionEventsMonthlyCount,
  TypeStatisticsEventsByOrganization,
  TypeStatisticsEventsBySatellite,
  TypeStatisticsEventsType,
  TypeStatisticsFragmentationEventsAndAlertsCount,
  TypeStatisticsFragmentationEventsByObjectTypeMonthlyCount,
  TypeStatisticsFragmentationEventsMonthlyCount,
  TypeStatisticsHighestUpcomingCollisionProbability,
  TypeStatisticsMonthlyCount,
  TypeStatisticsMonthlyRunningSum,
  TypeStatisticsNotificationsSent,
  TypeStatisticsReentryEventReportsCount,
  TypeStatisticsReentryEventsAndAlertsCount,
  TypeStatisticsReentryEventsAndAlertsMonthlyCount,
  TypeStatisticsReentryEventsByObjectTypeMonthlyCount,
  TypeStatisticsReentryEventsCount,
  TypeStatisticsSatelliteTracked,
  TypeTIPOut,
  TypeUniqueEventOut,
  TypeUniqueEventUpdateTextFieldsIn,
  TypeUser,
  TypeUserClientCredentialsOut,
  TypeUserIdOut,
  TypeUserIn,
  TypeUserOut,
  TypeUserUpdate,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class MshService<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|View| |Agency superuser|View|
   *
   * @tags alerts
   * @name GetAlerts
   * @summary Get Users Alert Setting List
   * @request GET:/v1/alerts/
   * @secure
   */
  getAlerts = (params: RequestParams = {}) =>
    this.request<TypeAlertSettingsDistributionList[], any>({
      path: `/v1/alerts/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|Update| |Agency superuser|Update|
   *
   * @tags alerts
   * @name PatchAlertsUserUserId
   * @summary Patch User Alert Settings
   * @request PATCH:/v1/alerts/user/{user_id}
   * @secure
   */
  patchAlertsUserUserId = (userId: string, data: TypeAlertSettingsIn, params: RequestParams = {}) =>
    this.request<TypeAlertSettingsOut, TypeHTTPValidationError>({
      path: `/v1/alerts/user/${userId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|View| |Agency superuser|View|
   *
   * @tags alerts
   * @name GetAlertsUserUserId
   * @summary Get User Alert Settings
   * @request GET:/v1/alerts/user/{user_id}
   * @secure
   */
  getAlertsUserUserId = (userId: string, params: RequestParams = {}) =>
    this.request<TypeAlertSettingsOut, TypeHTTPValidationError>({
      path: `/v1/alerts/user/${userId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Get a full list of uploaded analyses. The list may be sorted by users who uploaded, deleted or restored analyses. It`s also useful when sorted by collision probability or miss distances to check for erroneous uploads. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags analyses
   * @name GetAnalyses
   * @summary Get list of Analyses with sorting
   * @request GET:/v1/analyses/
   * @secure
   */
  getAnalyses = (query?: TypeGetAnalysesParams, params: RequestParams = {}) =>
    this.request<TypeAnalysisOut[], void | TypeHTTPValidationError>({
      path: `/v1/analyses/`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Allows upload of a single or list of analyses. It`s possible to upload analyses matching the same event short ID. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|Create| |Agency approver|Create| |Agency superuser|Create|
   *
   * @tags analyses
   * @name PostAnalyses
   * @summary Upload Analysis JSON file to database
   * @request POST:/v1/analyses/
   * @secure
   */
  postAnalyses = (data: TypeBodyCreateAnalysisV1AnalysesPost, params: RequestParams = {}) =>
    this.request<object | null, void | TypeHTTPValidationError>({
      path: `/v1/analyses/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gives ability to soft-delete the uploaded analysis. The data is not entirely deleted, it`s marked as inactive (not showing in frontend) but still accessible for monitoring and audit purposes. Soft deletion gives the possibility to restore the analysis in the future. Internal analysis database ID is required to fetch the data. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|Delete| |Agency approver|Delete| |Agency superuser|Delete|
   *
   * @tags analyses
   * @name DeleteAnalysesAnalysisId
   * @summary Soft-delete single Analysis data
   * @request DELETE:/v1/analyses/{analysis_id}
   * @secure
   */
  deleteAnalysesAnalysisId = (analysisId: string, params: RequestParams = {}) =>
    this.request<void, void | TypeHTTPValidationError>({
      path: `/v1/analyses/${analysisId}`,
      method: "DELETE",
      secure: true,
      ...params,
    }); /**
   * @description ## Description Gets detailed information about a single analysis. Internal analysis database ID is required to fetch the data. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags analyses
   * @name GetAnalysesAnalysisId
   * @summary Get single Analysis data
   * @request GET:/v1/analyses/{analysis_id}
   * @secure
   */
  getAnalysesAnalysisId = (analysisId: string, params: RequestParams = {}) =>
    this.request<TypeAnalysis | null, void | TypeHTTPValidationError>({
      path: `/v1/analyses/${analysisId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets list of banner messages. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|-| |Agency superuser|View|
   *
   * @tags banners
   * @name GetBannersMessages
   * @summary Get list of Banner messages
   * @request GET:/v1/banners/messages
   * @secure
   */
  getBannersMessages = (query?: TypeGetBannersMessagesParams, params: RequestParams = {}) =>
    this.request<TypeBannerMessagesOut[], void | TypeHTTPValidationError>({
      path: `/v1/banners/messages`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Create a banner message. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|-| |Agency superuser|Create|
   *
   * @tags banners
   * @name PostBannersMessages
   * @summary Create new Banner message
   * @request POST:/v1/banners/messages
   * @secure
   */
  postBannersMessages = (data: TypeBannerMessageIn, params: RequestParams = {}) =>
    this.request<TypeBannerMessage, void | TypeHTTPValidationError>({
      path: `/v1/banners/messages`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Modify a banner message. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|-| |Agency superuser|Update|
   *
   * @tags banners
   * @name PatchBannersMessages
   * @summary Modify existing Banner message
   * @request PATCH:/v1/banners/messages
   * @secure
   */
  patchBannersMessages = (data: TypeBannerMessageUpdate, params: RequestParams = {}) =>
    this.request<TypeBannerMessage, void | TypeHTTPValidationError>({
      path: `/v1/banners/messages`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets currently broadcasted banner messages. |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags banners
   * @name GetBannersMessagesCurrent
   * @summary Get list of Banner messages which are currently being displayed
   * @request GET:/v1/banners/messages/current
   * @secure
   */
  getBannersMessagesCurrent = (query?: TypeGetBannersMessagesCurrentParams, params: RequestParams = {}) =>
    this.request<TypeBannerMessagesBroadcastedOut[], void | TypeHTTPValidationError>({
      path: `/v1/banners/messages/current`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Soft-delete (set is_active=False) a banner message. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|-| |Agency superuser|Delete|
   *
   * @tags banners
   * @name DeleteBannersMessagesMessageId
   * @summary Delete Banner message
   * @request DELETE:/v1/banners/messages/{message_id}
   * @secure
   */
  deleteBannersMessagesMessageId = (messageId: string, params: RequestParams = {}) =>
    this.request<void, void | TypeHTTPValidationError>({
      path: `/v1/banners/messages/${messageId}`,
      method: "DELETE",
      secure: true,
      ...params,
    }); /**
   * @description ## Description Gets a list of defined banner schedules. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|-| |Agency superuser|View|
   *
   * @tags banners
   * @name GetBannersSchedules
   * @summary Get list of Banner schedules (which Banners should be displayed at which times)
   * @request GET:/v1/banners/schedules
   * @secure
   */
  getBannersSchedules = (query?: TypeGetBannersSchedulesParams, params: RequestParams = {}) =>
    this.request<TypeBannerSchedulesOut[], void | TypeHTTPValidationError>({
      path: `/v1/banners/schedules`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Creates a schedule for a given banner message. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|-| |Agency superuser|Create|
   *
   * @tags banners
   * @name PostBannersSchedules
   * @summary Create a new Banner schedule (schedule a given Banner to be displayed between given times)
   * @request POST:/v1/banners/schedules
   * @secure
   */
  postBannersSchedules = (data: TypeBannerScheduleIn, params: RequestParams = {}) =>
    this.request<TypeBannerSchedule, void | TypeHTTPValidationError>({
      path: `/v1/banners/schedules`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Soft-deletes a schedule. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|-| |Agency superuser|Delete|
   *
   * @tags banners
   * @name DeleteBannersSchedulesScheduleId
   * @summary Delete a Banner schedule
   * @request DELETE:/v1/banners/schedules/{schedule_id}
   * @secure
   */
  deleteBannersSchedulesScheduleId = (scheduleId: string, params: RequestParams = {}) =>
    this.request<void, void | TypeHTTPValidationError>({
      path: `/v1/banners/schedules/${scheduleId}`,
      method: "DELETE",
      secure: true,
      ...params,
    }); /**
   * @description Gives the CDM ID and date/time of the last ingested SpaceTrack CDM. Useful for checking if the ingestion process is alive and SpaceTrack is properly responding. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags cdms
   * @name GetCdmsLatest
   * @summary Get metadata for last ingested SpaceTrack CDM
   * @request GET:/v1/cdms/latest
   * @secure
   */
  getCdmsLatest = (params: RequestParams = {}) =>
    this.request<TypeCDMOut, void>({
      path: `/v1/cdms/latest`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|View| |Agency superuser|View|
   *
   * @tags conjunction-events
   * @name GetConjunctionEventsShortIdAlertsLatest
   * @summary Get Latest Conjunction Event Alert
   * @request GET:/v1/conjunction-events/{short_id}/alerts/latest
   * @secure
   */
  getConjunctionEventsShortIdAlertsLatest = (shortId: string, params: RequestParams = {}) =>
    this.request<TypeConjunctionEventAlertOut, void | TypeHTTPValidationError>({
      path: `/v1/conjunction-events/${shortId}/alerts/latest`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|Put| |Agency superuser|Put|
   *
   * @tags conjunction-events
   * @name PutConjunctionEventsShortIdAlertsLatest
   * @summary Put Latest Conjunction Event Alert
   * @request PUT:/v1/conjunction-events/{short_id}/alerts/latest
   * @secure
   */
  putConjunctionEventsShortIdAlertsLatest = (
    shortId: string,
    data: TypeConjunctionEventAlertIn,
    params: RequestParams = {},
  ) =>
    this.request<any, void | TypeHTTPValidationError>({
      path: `/v1/conjunction-events/${shortId}/alerts/latest`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|Put| |Agency superuser|Put|
   *
   * @tags conjunction-events
   * @name PutConjunctionEventsShortIdAlertsLatestDryRun
   * @summary Put Latest Conjunction Event Alert Dry Run
   * @request PUT:/v1/conjunction-events/{short_id}/alerts/latest/dry-run
   * @secure
   */
  putConjunctionEventsShortIdAlertsLatestDryRun = (
    shortId: string,
    data: TypeConjunctionEventAlertIn,
    params: RequestParams = {},
  ) =>
    this.request<TypeAlertDryRunOut, void | TypeHTTPValidationError>({
      path: `/v1/conjunction-events/${shortId}/alerts/latest/dry-run`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags conjunction-reports
   * @name GetConjunctionReportsSchema
   * @summary Get Schema
   * @request GET:/v1/conjunction-reports/schema
   * @secure
   */
  getConjunctionReportsSchema = (params: RequestParams = {}) =>
    this.request<object, void>({
      path: `/v1/conjunction-reports/schema`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Create Conjunction Report and saves its metadata in database and original file in S3 |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|Create| |Agency approver|Create| |Agency superuser|Create|
   *
   * @tags conjunction-reports
   * @name PostConjunctionReports
   * @summary Upload Conjunction Report file to database & S3
   * @request POST:/v1/conjunction-reports/
   * @secure
   */
  postConjunctionReports = (
    data: TypeBodyPostConjunctionReportV1ConjunctionReportsPost,
    query?: TypePostConjunctionReportsParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeConjunctionReportOut, void | TypeHTTPValidationError>({
      path: `/v1/conjunction-reports/`,
      method: "POST",
      query: query,
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets list of Conjunction Reports data by Conjunction Event short ID ie. bqqxxjo-rrvnper-xkgorz |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags conjunction-reports
   * @name GetConjunctionReportsConjunctionEventShortId
   * @summary Get list of Conjunction Reports by Conjunction Event short ID ie. bqqxxjo-rrvnper-xkgorz
   * @request GET:/v1/conjunction-reports/conjunction-event/{short_id}
   * @secure
   */
  getConjunctionReportsConjunctionEventShortId = (
    { shortId, ...query }: TypeGetConjunctionReportsConjunctionEventShortIdParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeConjunctionReportOut[], void | TypeHTTPValidationError>({
      path: `/v1/conjunction-reports/conjunction-event/${shortId}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Conjunction Report data by UUID |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags conjunction-reports
   * @name GetConjunctionReportsConjunctionReportId
   * @summary Get Conjunction Report Id
   * @request GET:/v1/conjunction-reports/{conjunction_report_id}
   * @secure
   */
  getConjunctionReportsConjunctionReportId = (conjunctionReportId: string, params: RequestParams = {}) =>
    this.request<TypeConjunctionReportOut, void | TypeHTTPValidationError>({
      path: `/v1/conjunction-reports/${conjunctionReportId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description Soft-delete uploaded Conjunction Report metadata setting is_active flag to False thus not showing in frontend. Still accessible for monitoring and audit purposes. The S3 file containing the full file is left intact. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|Delete| |Agency approver|Delete| |Agency superuser|Delete|
   *
   * @tags conjunction-reports
   * @name DeleteConjunctionReportsConjunctionReportId
   * @summary Soft-delete single Conjunction Report
   * @request DELETE:/v1/conjunction-reports/{conjunction_report_id}
   * @secure
   */
  deleteConjunctionReportsConjunctionReportId = (conjunctionReportId: string, params: RequestParams = {}) =>
    this.request<void, void | TypeHTTPValidationError>({
      path: `/v1/conjunction-reports/${conjunctionReportId}`,
      method: "DELETE",
      secure: true,
      ...params,
    }); /**
   * @description ## Description Provides a list of uploaded ephemeris files. The list can be sorted by organizations that own satellites or by satellite name. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags ephemeris
   * @name GetEphemeris
   * @summary Get list of Ephemeris files with sorting
   * @request GET:/v1/ephemeris/
   * @secure
   */
  getEphemeris = (query?: TypeGetEphemerisParams, params: RequestParams = {}) =>
    this.request<TypeEphemerisOut[], void | TypeHTTPValidationError>({
      path: `/v1/ephemeris/`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Allows operators to upload their ephemeris files. Ephemeris files have to be named in a special way according to Space-Track standards to include satellite NORAD ID, otherwise they will be rejected. They also have to be in line with the .oem file format guidelines. More information can be found at the links below: - [OEM file format definition](https://public.ccsds.org/Pubs/502x0b3e1.pdf) - [File naming convention from Space-Track Handbook for Operators (see page 23)](https://www.space-track.org/documents/Spaceflight_Safety_Handbook_for_Operators.pdf) |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|Create within Organisation| |Satellite operator admin|Create within Organisation| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|Create| |Agency approver|Create| |Agency superuser|Create|
   *
   * @tags ephemeris
   * @name PostEphemeris
   * @summary Upload .oem compatible Ephemeris file
   * @request POST:/v1/ephemeris/
   * @secure
   */
  postEphemeris = (data: TypeBodyCreateEphemerisV1EphemerisPost, params: RequestParams = {}) =>
    this.request<any, void | TypeHTTPValidationError>({
      path: `/v1/ephemeris/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets the ephemeris file copy identical to the original upload. Internal database ID is required to get the file. The response is the text file in key-value .oem format. Filename is created after the CREATION_DATE from the ephemeris file to avoid accidental overwrites when similarly named files would be downloaded. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags ephemeris
   * @name GetEphemerisEphemerisId
   * @summary Get Ephemeris file
   * @request GET:/v1/ephemeris/{ephemeris_id}
   * @secure
   */
  getEphemerisEphemerisId = (ephemerisId: string, params: RequestParams = {}) =>
    this.request<any, void | TypeHTTPValidationError>({
      path: `/v1/ephemeris/${ephemerisId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Soft-delete an ephemeris, mark ephemeris in DB as is_active = False, allowing later restoration. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|Delete within Organisation| |Satellite operator admin|Delete within Organisation| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|Delete| |Agency analyst|Delete| |Agency approver|Delete| |Agency superuser|Delete|
   *
   * @tags ephemeris
   * @name DeleteEphemerisEphemerisId
   * @summary Soft-delete a single Ephemeris data
   * @request DELETE:/v1/ephemeris/{ephemeris_id}
   * @secure
   */
  deleteEphemerisEphemerisId = (ephemerisId: string, params: RequestParams = {}) =>
    this.request<void, void | TypeHTTPValidationError>({
      path: `/v1/ephemeris/${ephemerisId}`,
      method: "DELETE",
      secure: true,
      ...params,
    }); /**
   * @description ## Description Restore a soft-deleted ephemeris, mark ephemeris in DB as is_active = True. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|Delete within Organisation| |Satellite operator admin|Delete within Organisation| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|Delete| |Agency analyst|Delete| |Agency approver|Delete| |Agency superuser|Delete|
   *
   * @tags ephemeris
   * @name PostEphemerisEphemerisIdRestore
   * @summary Restore a soft-deleted Ephemeris
   * @request POST:/v1/ephemeris/{ephemeris_id}/restore
   * @secure
   */
  postEphemerisEphemerisIdRestore = (ephemerisId: string, params: RequestParams = {}) =>
    this.request<void, void | TypeHTTPValidationError>({
      path: `/v1/ephemeris/${ephemerisId}/restore`,
      method: "POST",
      secure: true,
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags external-data-performance
   * @name GetExternalDataPerformance
   * @summary Get list of recent data ingestion from external data sources with metadata
   * @request GET:/v1/external-data-performance/
   * @secure
   */
  getExternalDataPerformance = (query?: TypeGetExternalDataPerformanceParams, params: RequestParams = {}) =>
    this.request<TypeExternalDataPerformanceOut[], void | TypeHTTPValidationError>({
      path: `/v1/external-data-performance/`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags external-data-performance
   * @name GetExternalDataPerformanceAggregated
   * @summary Get number of data items ingested, broken down by day and external data source
   * @request GET:/v1/external-data-performance/aggregated
   * @secure
   */
  getExternalDataPerformanceAggregated = (
    query?: TypeGetExternalDataPerformanceAggregatedParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeExternalDataPerformanceAggregateOut[], void | TypeHTTPValidationError>({
      path: `/v1/external-data-performance/aggregated`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Fragmentation Event list. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags fragmentation-events
   * @name GetFragmentationEvents
   * @summary Gets Fragmentation Events list
   * @request GET:/v1/fragmentation-events/
   * @secure
   */
  getFragmentationEvents = (query?: TypeGetFragmentationEventsParams, params: RequestParams = {}) =>
    this.request<TypeFragmentationEvent[], void | TypeHTTPValidationError>({
      path: `/v1/fragmentation-events/`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Fragmentation Event by short ID.. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags fragmentation-events
   * @name GetFragmentationEventsShortId
   * @summary Gets Fragmentation Event by short ID
   * @request GET:/v1/fragmentation-events/{short_id}
   * @secure
   */
  getFragmentationEventsShortId = (shortId: string, params: RequestParams = {}) =>
    this.request<TypeFragmentationEvent, void | TypeHTTPValidationError>({
      path: `/v1/fragmentation-events/${shortId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Fragmentation Events schema. |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags fragmentation-events
   * @name GetFragmentationEventsSchema
   * @summary Gets Fragmentation Events schema
   * @request GET:/v1/fragmentation-events/schema
   * @secure
   */
  getFragmentationEventsSchema = (params: RequestParams = {}) =>
    this.request<object, void>({
      path: `/v1/fragmentation-events/schema`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Uploads Fragmentation Event Report. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|Create| |Agency approver|Create| |Agency superuser|Create|
   *
   * @tags fragmentation-reports
   * @name PostFragmentationReports
   * @summary Uploads Fragmentation Event Report
   * @request POST:/v1/fragmentation-reports/
   * @secure
   */
  postFragmentationReports = (
    data: TypeBodyPostFragmentationEventReportV1FragmentationReportsPost,
    params: RequestParams = {},
  ) =>
    this.request<TypeFragmentationReport, void | TypeHTTPValidationError>({
      path: `/v1/fragmentation-reports/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Fragmentation Event Reports list. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags fragmentation-reports
   * @name GetFragmentationReports
   * @summary Gets Fragmentation Event Reports list
   * @request GET:/v1/fragmentation-reports/
   * @secure
   */
  getFragmentationReports = (query?: TypeGetFragmentationReportsParams, params: RequestParams = {}) =>
    this.request<TypeFragmentationReport[], void | TypeHTTPValidationError>({
      path: `/v1/fragmentation-reports/`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Fragmentation Event Report schema. |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags fragmentation-reports
   * @name GetFragmentationReportsSchema
   * @summary Gets Fragmentation Event Report schema
   * @request GET:/v1/fragmentation-reports/schema
   * @secure
   */
  getFragmentationReportsSchema = (params: RequestParams = {}) =>
    this.request<object, void>({
      path: `/v1/fragmentation-reports/schema`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Fragmentation Event Report by database ID. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags fragmentation-reports
   * @name GetFragmentationReportsFragmentationReportId
   * @summary Gets Fragmentation Event Report by database ID
   * @request GET:/v1/fragmentation-reports/{fragmentation_report_id}
   * @secure
   */
  getFragmentationReportsFragmentationReportId = (fragmentationReportId: string, params: RequestParams = {}) =>
    this.request<TypeFragmentationReport | null, void | TypeHTTPValidationError>({
      path: `/v1/fragmentation-reports/${fragmentationReportId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Deletes Fragmentation Event Report by database ID |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|Delete| |Agency approver|Delete| |Agency superuser|Delete|
   *
   * @tags fragmentation-reports
   * @name DeleteFragmentationReportsFragmentationReportId
   * @summary Deletes Fragmentation Event Report by database ID
   * @request DELETE:/v1/fragmentation-reports/{fragmentation_report_id}
   * @secure
   */
  deleteFragmentationReportsFragmentationReportId = (fragmentationReportId: string, params: RequestParams = {}) =>
    this.request<any, void | TypeHTTPValidationError>({
      path: `/v1/fragmentation-reports/${fragmentationReportId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Fragmentation Event Report for a given Fragmentation Event short ID. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags fragmentation-reports
   * @name GetFragmentationReportsFragmentationEventShortId
   * @summary Gets Fragmentation Event Report for a given Fragmentation Event short ID
   * @request GET:/v1/fragmentation-reports/fragmentation-event/{short_id}
   * @secure
   */
  getFragmentationReportsFragmentationEventShortId = (
    { shortId, ...query }: TypeGetFragmentationReportsFragmentationEventShortIdParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeFragmentationReport[], void | TypeHTTPValidationError>({
      path: `/v1/fragmentation-reports/fragmentation-event/${shortId}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets the latest Fragmentation Event Report for a given Fragmentation Event short ID. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags fragmentation-reports
   * @name GetFragmentationReportsFragmentationEventShortIdLatest
   * @summary Gets latest Fragmentation Event Report for a given Fragmentation Event short ID
   * @request GET:/v1/fragmentation-reports/fragmentation-event/{short_id}/latest
   * @secure
   */
  getFragmentationReportsFragmentationEventShortIdLatest = (shortId: string, params: RequestParams = {}) =>
    this.request<TypeFragmentationReport | null, void | TypeHTTPValidationError>({
      path: `/v1/fragmentation-reports/fragmentation-event/${shortId}/latest`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Manoeuvre Plot file metadata with given ID |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags manoeuvre_plots
   * @name GetManoeuvrePlotsManoeuvrePlotId
   * @summary Get Manouevre Plots file metadata by its database ID
   * @request GET:/v1/manoeuvre_plots/{manoeuvre_plot_id}
   * @secure
   */
  getManoeuvrePlotsManoeuvrePlotId = (manoeuvrePlotId: string, params: RequestParams = {}) =>
    this.request<TypeManoeuvrePlotOut, void | TypeHTTPValidationError>({
      path: `/v1/manoeuvre_plots/${manoeuvrePlotId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description Soft-delete uploaded Manoeuvre Plot metadata setting is_active flag to False thus not showing in frontend. Still accessible for monitoring and audit purposes. The S3 file containing the full file is left intact. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|Delete| |Agency analyst|Delete| |Agency approver|Delete| |Agency superuser|Delete|
   *
   * @tags manoeuvre_plots
   * @name DeleteManoeuvrePlotsManoeuvrePlotId
   * @summary Soft-delete single Manoeuvre Plot
   * @request DELETE:/v1/manoeuvre_plots/{manoeuvre_plot_id}
   * @secure
   */
  deleteManoeuvrePlotsManoeuvrePlotId = (manoeuvrePlotId: string, params: RequestParams = {}) =>
    this.request<void, void | TypeHTTPValidationError>({
      path: `/v1/manoeuvre_plots/${manoeuvrePlotId}`,
      method: "DELETE",
      secure: true,
      ...params,
    }); /**
   * @description ## Description Create Manoeuvre Plot file metadata in database and stores actual file in S3 |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|Create| |Agency approver|Create| |Agency superuser|Create|
   *
   * @tags manoeuvre_plots
   * @name PostManoeuvrePlots
   * @summary Create new Manouevre Plot file metadata
   * @request POST:/v1/manoeuvre_plots/
   * @secure
   */
  postManoeuvrePlots = (data: TypeBodyUploadManoeuvrePlotFileV1ManoeuvrePlotsPost, params: RequestParams = {}) =>
    this.request<TypeManoeuvrePlot, void | TypeHTTPValidationError>({
      path: `/v1/manoeuvre_plots/`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Manoeuvre Plot file list with user metadata (uploaders, deleters etc) |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags manoeuvre_plots
   * @name GetManoeuvrePlots
   * @summary Get Manouevre Plots file list with user data
   * @request GET:/v1/manoeuvre_plots/
   * @secure
   */
  getManoeuvrePlots = (query?: TypeGetManoeuvrePlotsParams, params: RequestParams = {}) =>
    this.request<TypeManoeuvrePlotWithUserMetadataOut[], void | TypeHTTPValidationError>({
      path: `/v1/manoeuvre_plots/`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Manoeuvre Plot file metadata list by Event short ID |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags manoeuvre_plots
   * @name GetManoeuvrePlotsByEventEventShortId
   * @summary Get Manouevre Plots file metadata list by Event short ID
   * @request GET:/v1/manoeuvre_plots/by-event/{event_short_id}
   * @secure
   */
  getManoeuvrePlotsByEventEventShortId = (
    { eventShortId, ...query }: TypeGetManoeuvrePlotsByEventEventShortIdParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeManoeuvrePlotMetadataOut[], void | TypeHTTPValidationError>({
      path: `/v1/manoeuvre_plots/by-event/${eventShortId}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Sends a message to pre-defined analyst email address. We allow all events for all users here. |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags messages
   * @name PostMessagesContactAnalyst
   * @summary Send an email about a given Event to the orbital analyst team
   * @request POST:/v1/messages/contact-analyst
   * @secure
   */
  postMessagesContactAnalyst = (data: TypeContactAnalystIn, params: RequestParams = {}) =>
    this.request<any, void | TypeHTTPValidationError>({
      path: `/v1/messages/contact-analyst`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets list of all organizations with the number of user and admin accounts. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags organizations
   * @name GetOrganizations
   * @summary Get full list of Organizations.
   * @request GET:/v1/organizations/
   * @secure
   */
  getOrganizations = (params: RequestParams = {}) =>
    this.request<TypeOrganizationOut[], void>({
      path: `/v1/organizations/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags reentry-event-reports
   * @name GetReentryEventReportsSchema
   * @summary Get Schema
   * @request GET:/v1/reentry-event-reports/schema
   * @secure
   */
  getReentryEventReportsSchema = (params: RequestParams = {}) =>
    this.request<object, void>({
      path: `/v1/reentry-event-reports/schema`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Create Reentry Event Report and saves its metadata in database and original file in S3 |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|Create| |Agency approver|Create| |Agency superuser|Create|
   *
   * @tags reentry-event-reports
   * @name PostReentryEventReports
   * @summary Upload Reentry Event Report file to database & S3
   * @request POST:/v1/reentry-event-reports/
   * @secure
   */
  postReentryEventReports = (
    data: TypeBodyUploadReentryEventReportV1ReentryEventReportsPost,
    query?: TypePostReentryEventReportsParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeReentryEventReportOut, void | TypeHTTPValidationError>({
      path: `/v1/reentry-event-reports/`,
      method: "POST",
      query: query,
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets list of Reentry Event Reports data by Reentry Event short ID ie. re-20240404-23123 |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags reentry-event-reports
   * @name GetReentryEventReportsReentryEventShortId
   * @summary Get list of Reentry Event Reports by Reentry Event short ID ie. re-20240404-23123
   * @request GET:/v1/reentry-event-reports/reentry-event/{short_id}
   * @secure
   */
  getReentryEventReportsReentryEventShortId = (
    { shortId, ...query }: TypeGetReentryEventReportsReentryEventShortIdParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeReentryEventReportOut[], void | TypeHTTPValidationError>({
      path: `/v1/reentry-event-reports/reentry-event/${shortId}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Reentry Event Report data by UUID |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags reentry-event-reports
   * @name GetReentryEventReportsReentryEventReportId
   * @summary Get Reentry Event Report Id
   * @request GET:/v1/reentry-event-reports/{reentry_event_report_id}
   * @secure
   */
  getReentryEventReportsReentryEventReportId = (reentryEventReportId: string, params: RequestParams = {}) =>
    this.request<TypeReentryEventReportOut, void | TypeHTTPValidationError>({
      path: `/v1/reentry-event-reports/${reentryEventReportId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description Soft-delete uploaded Reentry Event Report metadata setting is_active flag to False thus not showing in frontend. Still accessible for monitoring and audit purposes. The S3 file containing the full file is left intact. Revert some fields in Reentry Event |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|Delete| |Agency analyst|Delete| |Agency approver|Delete| |Agency superuser|Delete|
   *
   * @tags reentry-event-reports
   * @name DeleteReentryEventReportsReentryEventReportId
   * @summary Soft-delete single Reentry Event Report
   * @request DELETE:/v1/reentry-event-reports/{reentry_event_report_id}
   * @secure
   */
  deleteReentryEventReportsReentryEventReportId = (reentryEventReportId: string, params: RequestParams = {}) =>
    this.request<void, void | TypeHTTPValidationError>({
      path: `/v1/reentry-event-reports/${reentryEventReportId}`,
      method: "DELETE",
      secure: true,
      ...params,
    }); /**
   * @description ## Description Get count of Reentry Events with or without reports. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags reentry-events
   * @name GetReentryEventsStats
   * @summary Get count of Reentry Events with or without reports
   * @request GET:/v1/reentry-events/stats
   * @secure
   */
  getReentryEventsStats = (query?: TypeGetReentryEventsStatsParams, params: RequestParams = {}) =>
    this.request<TypeReentryEventCount, void | TypeHTTPValidationError>({
      path: `/v1/reentry-events/stats`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Reentry Event data by Reentry Event short ID ie. re-20240404-23123 |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags reentry-events
   * @name GetReentryEventsShortId
   * @summary Get Reentry Event By Short Id
   * @request GET:/v1/reentry-events/{short_id}
   * @secure
   */
  getReentryEventsShortId = (shortId: string, params: RequestParams = {}) =>
    this.request<TypeReentryEventOut, void | TypeHTTPValidationError>({
      path: `/v1/reentry-events/${shortId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Updates Reentry Event data by Reentry Event short ID ie. re-20240404-23123 |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|Update| |Agency analyst|Update| |Agency approver|Update| |Agency superuser|Update|
   *
   * @tags reentry-events
   * @name PatchReentryEventsShortId
   * @summary Patch Reentry Event By Short Id
   * @request PATCH:/v1/reentry-events/{short_id}
   * @secure
   */
  patchReentryEventsShortId = (shortId: string, data: TypeReentryEventPatch, params: RequestParams = {}) =>
    this.request<TypeReentryEventOut, void | TypeHTTPValidationError>({
      path: `/v1/reentry-events/${shortId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags reentry-events
   * @name GetReentryEventsShortIdAlertsLatest
   * @summary Get Latest Reentry Event Alert
   * @request GET:/v1/reentry-events/{short_id}/alerts/latest
   * @secure
   */
  getReentryEventsShortIdAlertsLatest = (shortId: string, params: RequestParams = {}) =>
    this.request<TypeReentryEventAlertOut, void | TypeHTTPValidationError>({
      path: `/v1/reentry-events/${shortId}/alerts/latest`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|Put| |Agency superuser|Put|
   *
   * @tags reentry-events
   * @name PutReentryEventsShortIdAlertsLatest
   * @summary Put Latest Reentry Event Alert
   * @request PUT:/v1/reentry-events/{short_id}/alerts/latest
   * @secure
   */
  putReentryEventsShortIdAlertsLatest = (shortId: string, data: TypeReentryEventAlertIn, params: RequestParams = {}) =>
    this.request<any, void | TypeHTTPValidationError>({
      path: `/v1/reentry-events/${shortId}/alerts/latest`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|Put| |Agency superuser|Put|
   *
   * @tags reentry-events
   * @name PutReentryEventsShortIdAlertsLatestDryRun
   * @summary Put Latest Reentry Event Alert Dry Run
   * @request PUT:/v1/reentry-events/{short_id}/alerts/latest/dry-run
   * @secure
   */
  putReentryEventsShortIdAlertsLatestDryRun = (
    shortId: string,
    data: TypeReentryEventAlertIn,
    params: RequestParams = {},
  ) =>
    this.request<TypeAlertDryRunOut, void | TypeHTTPValidationError>({
      path: `/v1/reentry-events/${shortId}/alerts/latest/dry-run`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets list of Reentry Events with sorting |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags reentry-events
   * @name GetReentryEvents
   * @summary Get list of Reentry Events
   * @request GET:/v1/reentry-events/
   * @secure
   */
  getReentryEvents = (query?: TypeGetReentryEventsParams, params: RequestParams = {}) =>
    this.request<TypeReentryEventOut[], void | TypeHTTPValidationError>({
      path: `/v1/reentry-events/`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Provides a list of events with metadata (userInterest column). On the user application, this is presented on the /events page. It`s useful when the user needs to look at the past events or tries to find events specific to a single satellite. It`s possible to search with LIKE pattern (ie. when looking for all satellites matching some pattern in their names). It`s also possible to find events with the biggest probability of collision or the lowest miss distance. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags conjunction-events
   * @name GetConjunctionEvents
   * @summary Get list of Events with metadata (searchable)
   * @request GET:/v1/conjunction-events/
   * @secure
   */
  getConjunctionEvents = (query?: TypeGetConjunctionEventsParams, params: RequestParams = {}) =>
    this.request<TypeEventOut[], TypeHTTPValidationError>({
      path: `/v1/conjunction-events/`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Provides a list of events with metadata (userInterest column). On the user application, this is presented on the /events page. Works only for future events (TCA time in future). It`s possible to search with LIKE pattern (ie. when looking for all satellites matching some pattern in their names). It`s also possible to find events with the biggest probability of collision or the lowest miss distance. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags conjunction-events
   * @name GetConjunctionEventsFutureEvents
   * @summary Get list of future Events with metadata (searchable) by using optimized materialized view
   * @request GET:/v1/conjunction-events/future-events
   * @secure
   */
  getConjunctionEventsFutureEvents = (query?: TypeGetConjunctionEventsFutureEventsParams, params: RequestParams = {}) =>
    this.request<TypeEventOut[], TypeHTTPValidationError>({
      path: `/v1/conjunction-events/future-events`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description --- |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags conjunction-events
   * @name GetConjunctionEventsForAnalysis
   * @summary Get Events Needing Analysis
   * @request GET:/v1/conjunction-events/for-analysis
   * @secure
   */
  getConjunctionEventsForAnalysis = (query?: TypeGetConjunctionEventsForAnalysisParams, params: RequestParams = {}) =>
    this.request<TypeEventForAnalysisOut[], TypeHTTPValidationError>({
      path: `/v1/conjunction-events/for-analysis`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Returns the list of Events (based on single CDMs) that have TCA time in future and have probability of collision greater than 1e5 and they don't have an analysis yet. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags conjunction-events
   * @name GetConjunctionEventsFutureEventsForAnalysis
   * @summary Get Events Needing Analysis Faster
   * @request GET:/v1/conjunction-events/future-events-for-analysis
   * @secure
   */
  getConjunctionEventsFutureEventsForAnalysis = (
    query?: TypeGetConjunctionEventsFutureEventsForAnalysisParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeEventForAnalysisOut[], TypeHTTPValidationError>({
      path: `/v1/conjunction-events/future-events-for-analysis`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Provides a list of events with metadata (userInterest column). On the user application, this is presented on the /events page. It`s useful when the user needs to look at the past events or tries to find events specific to a single satellite. It`s possible to search with LIKE pattern (ie. when looking for all satellites matching some pattern in their names). It`s also possible to find events with the biggest probability of collision or the lowest miss distance. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags conjunction-events
   * @name GetConjunctionEventsList
   * @summary Get list of Events with metadata (searchable)
   * @request GET:/v1/conjunction-events/list
   * @secure
   */
  getConjunctionEventsList = (query?: TypeGetConjunctionEventsListParams, params: RequestParams = {}) =>
    this.request<TypeEventOut[], TypeHTTPValidationError>({
      path: `/v1/conjunction-events/list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Get count of Conjunction Events with or without reports. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags conjunction-events
   * @name GetConjunctionEventsStats
   * @summary Get count of Conjunction Events with or without reports
   * @request GET:/v1/conjunction-events/stats
   * @secure
   */
  getConjunctionEventsStats = (query?: TypeGetConjunctionEventsStatsParams, params: RequestParams = {}) =>
    this.request<TypeConjunctionEventCount, TypeHTTPValidationError>({
      path: `/v1/conjunction-events/stats`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Returns summary data for an Event with provided short ID (in the format of bmqvgba-kkjodd-pgnnc). Data can be taken from Analysis or from CDMs (the most recent type is returned). |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags conjunction-events
   * @name GetConjunctionEventsEventIdSummary
   * @summary Get a single Event
   * @request GET:/v1/conjunction-events/{event_id}/summary
   * @secure
   */
  getConjunctionEventsEventIdSummary = (
    { eventId, ...query }: TypeGetConjunctionEventsEventIdSummaryParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeEventSummaryOut[], TypeHTTPValidationError>({
      path: `/v1/conjunction-events/${eventId}/summary`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Used for providing Data Sources part of a single Event page. Data is provided in order for primary and secondary object. Optional SpaceTrack CDM ID can be used to provide not the most recent CDM/Analysis but those for selected CDM ID. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags conjunction-events
   * @name GetConjunctionEventsEventIdDataSources
   * @summary Get the most recent data source used for primary and secondary object positions in a single Event
   * @request GET:/v1/conjunction-events/{event_id}/data-sources
   * @secure
   */
  getConjunctionEventsEventIdDataSources = (
    { eventId, ...query }: TypeGetConjunctionEventsEventIdDataSourcesParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeDataSourcesOut, TypeHTTPValidationError>({
      path: `/v1/conjunction-events/${eventId}/data-sources`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets series of events where one of these events was built upon a given SpaceTrack CDM. Events can be then sorted by CDM IDs to obtain other CDMs and check SpaceTrack source. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags conjunction-events
   * @name GetConjunctionEventsCdmExternalId
   * @summary Get list of Events by SpaceTrack CDM ID
   * @request GET:/v1/conjunction-events/{cdm_external_id}
   * @secure
   */
  getConjunctionEventsCdmExternalId = (
    { cdmExternalId, ...query }: TypeGetConjunctionEventsCdmExternalIdParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeEventCDMOut[], TypeHTTPValidationError>({
      path: `/v1/conjunction-events/${cdmExternalId}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets primary and secondary Satellite data involved in a single Conjunction Event. Primary satellite must be available for user's organization. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags conjunction-events
   * @name GetConjunctionEventsSatelliteEventShortId
   * @summary Get data for both satellites involved in a single Event
   * @request GET:/v1/conjunction-events/satellite/{event_short_id}
   * @secure
   */
  getConjunctionEventsSatelliteEventShortId = (eventShortId: string, params: RequestParams = {}) =>
    this.request<TypeEventSatellitesOut, TypeHTTPValidationError>({
      path: `/v1/conjunction-events/satellite/${eventShortId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Updates Conjunction Event data by Event short ID |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|Update| |Agency analyst|Update| |Agency approver|Update| |Agency superuser|Update|
   *
   * @tags conjunction-events
   * @name PatchConjunctionEventsUniqueEventShortId
   * @summary Patch Unique Event By Short Id
   * @request PATCH:/v1/conjunction-events/unique-event/{short_id}
   * @secure
   */
  patchConjunctionEventsUniqueEventShortId = (
    shortId: string,
    data: TypeUniqueEventUpdateTextFieldsIn,
    params: RequestParams = {},
  ) =>
    this.request<TypeUniqueEventOut, TypeHTTPValidationError>({
      path: `/v1/conjunction-events/unique-event/${shortId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Conjunction Event data by Event short ID from unique_events table |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags conjunction-events
   * @name GetConjunctionEventsUniqueEventShortId
   * @summary Get Unique Event By Short Id
   * @request GET:/v1/conjunction-events/unique-event/{short_id}
   * @secure
   */
  getConjunctionEventsUniqueEventShortId = (shortId: string, params: RequestParams = {}) =>
    this.request<TypeUniqueEventOut, TypeHTTPValidationError>({
      path: `/v1/conjunction-events/unique-event/${shortId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * No description
   *
   * @tags events
   * @name GetEventsRestOfPathpath
   * @summary  Redirect Events To Conjunctions
   * @request GET:/v1/events/{rest_of_path}
   * @secure
   */
  getEventsRestOfPathpath = (restOfPath: string, params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v1/events/${restOfPath}`,
      method: "GET",
      secure: true,
      ...params,
    }); /**
   * @description ## Description Returns a detailed list of satellites. Provides ability to search with simple text search to find groups of satellites matching the same pattern. Available satellites are filtered by user. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags satellites
   * @name GetSatellitesWithMetadata
   * @summary Get list of Satellites with metadata (searchable)
   * @request GET:/v1/satellites/with-metadata
   * @secure
   */
  getSatellitesWithMetadata = (query?: TypeGetSatellitesWithMetadataParams, params: RequestParams = {}) =>
    this.request<TypeSatelliteWithMetadataOut[], void | TypeHTTPValidationError>({
      path: `/v1/satellites/with-metadata`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Lists Satellites with organization data. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags satellites
   * @name GetSatellitesMonitored
   * @summary Get list of monitored Satellites with Organization details
   * @request GET:/v1/satellites/monitored
   * @secure
   */
  getSatellitesMonitored = (query?: TypeGetSatellitesMonitoredParams, params: RequestParams = {}) =>
    this.request<TypeSatelliteOrganizationOut[], void | TypeHTTPValidationError>({
      path: `/v1/satellites/monitored`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets Satellite count within organizations and total count. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags satellites
   * @name GetSatellitesByOrganizations
   * @summary Get count of monitored Satellites grouped by Organization
   * @request GET:/v1/satellites/by-organizations
   * @secure
   */
  getSatellitesByOrganizations = (query?: TypeGetSatellitesByOrganizationsParams, params: RequestParams = {}) =>
    this.request<TypeSatellitesCountByOrganizationOut[], void | TypeHTTPValidationError>({
      path: `/v1/satellites/by-organizations`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Provides detailed information about a single satellite and its organization. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags satellites
   * @name GetSatellitesNoradId
   * @summary Get a single Satellite (using NORAD ID)
   * @request GET:/v1/satellites/{norad_id}
   * @secure
   */
  getSatellitesNoradId = (noradId: string, params: RequestParams = {}) =>
    this.request<TypeSatelliteOut, void | TypeHTTPValidationError>({
      path: `/v1/satellites/${noradId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Updates satellite organization bindings. Internal database satellite ID is required to do so. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|-| |Agency superuser|Update|
   *
   * @tags satellites
   * @name PatchSatellitesSatelliteId
   * @summary Modify a single Satellite (using internal Satellite ID)
   * @request PATCH:/v1/satellites/{satellite_id}
   * @secure
   */
  patchSatellitesSatelliteId = (satelliteId: string, data: TypeSatelliteUpdateIn, params: RequestParams = {}) =>
    this.request<void, void | TypeHTTPValidationError>({
      path: `/v1/satellites/${satelliteId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    }); /**
   * @description ## Description Starts Satellite data ingestion process by querying ESA Discos API. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|-| |Agency approver|-| |Agency superuser|Trigger|
   *
   * @tags satellites
   * @name PostSatellitesEsaIntegration
   * @summary Trigger Satellite dimensions/mass import from ESA Discos for all Satellites
   * @request POST:/v1/satellites/esa-integration
   * @secure
   */
  postSatellitesEsaIntegration = (params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v1/satellites/esa-integration`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets number of CDMs, Ephemeris, Satellites and Events in the DB |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStats
   * @summary Get total number of CDMs, Ephemeris, Events and Satellites in the DB
   * @request GET:/v1/stats/
   * @secure
   */
  getStats = (params: RequestParams = {}) =>
    this.request<any, void>({
      path: `/v1/stats/`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Returns number of Events between different types of objects, ie. between UK licensed satellites, debris or non-UK licensed satellites. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags stats
   * @name GetStatsEventsType
   * @summary Get number of Events, broken down by type of object involved in the Event
   * @request GET:/v1/stats/events-type
   * @secure
   */
  getStatsEventsType = (query?: TypeGetStatsEventsTypeParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsEventsType[], void | TypeHTTPValidationError>({
      path: `/v1/stats/events-type`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets the number of Events per organization, groupped into probability of collision ranges: 0..1e-5..1e-3..1. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags stats
   * @name GetStatsEventsByOrganization
   * @summary Get number of Events, broken down by Organization involved in the Event
   * @request GET:/v1/stats/events-by-organization
   * @secure
   */
  getStatsEventsByOrganization = (query?: TypeGetStatsEventsByOrganizationParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsEventsByOrganization[], void | TypeHTTPValidationError>({
      path: `/v1/stats/events-by-organization`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets number of Events groupped by satellites and probability of collision. Superusers and Analysts can choose Organization satellites belong to. Other users can only see Events/Satellites from their organization. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags stats
   * @name GetStatsEventsBySatellite
   * @summary Get number of Events, broken down by Satellite involved in the Event
   * @request GET:/v1/stats/events-by-satellite
   * @secure
   */
  getStatsEventsBySatellite = (query?: TypeGetStatsEventsBySatelliteParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsEventsBySatellite[], void | TypeHTTPValidationError>({
      path: `/v1/stats/events-by-satellite`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets number of Satellites groupped by type (debris/payload/etc) |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsObjectsTracked
   * @summary Get total number of (non-Satellite) objects in DB, broken down by object type
   * @request GET:/v1/stats/objects-tracked
   * @secure
   */
  getStatsObjectsTracked = (params: RequestParams = {}) =>
    this.request<TypeStatisticsSatelliteTracked[], void>({
      path: `/v1/stats/objects-tracked`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets number of Notifications groupped by type (email/SMS) and date (days, months) |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsNotificationsSent
   * @summary Get total number of notifications (email/SMS) sent
   * @request GET:/v1/stats/notifications-sent
   * @secure
   */
  getStatsNotificationsSent = (query?: TypeGetStatsNotificationsSentParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsNotificationsSent[], void | TypeHTTPValidationError>({
      path: `/v1/stats/notifications-sent`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets a total number of past or upcoming Conjunction Events |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsCountConjunctionEvents
   * @summary Get count of Conjunction Events in epoch
   * @request GET:/v1/stats/count/conjunction-events
   * @secure
   */
  getStatsCountConjunctionEvents = (query?: TypeGetStatsCountConjunctionEventsParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsConjunctionEventsCount, void | TypeHTTPValidationError>({
      path: `/v1/stats/count/conjunction-events`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets the highest collision probability in upcoming Conjunction Events from unique_events table |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsHighestCollisionProbability
   * @summary Get the highest collision probability among upcoming conjunction events
   * @request GET:/v1/stats/highest-collision-probability
   * @secure
   */
  getStatsHighestCollisionProbability = (params: RequestParams = {}) =>
    this.request<TypeStatisticsHighestUpcomingCollisionProbability, void>({
      path: `/v1/stats/highest-collision-probability`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets a total number of Reentry Events |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsCountReentryEvents
   * @summary Get count of Reentry Events in epoch
   * @request GET:/v1/stats/count/reentry-events
   * @secure
   */
  getStatsCountReentryEvents = (query?: TypeGetStatsCountReentryEventsParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsReentryEventsCount, void | TypeHTTPValidationError>({
      path: `/v1/stats/count/reentry-events`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets a total number of Reentry Reports |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsCountReentryReports
   * @summary Get count of Reentry Event Reports in epoch
   * @request GET:/v1/stats/count/reentry-reports
   * @secure
   */
  getStatsCountReentryReports = (query?: TypeGetStatsCountReentryReportsParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsReentryEventReportsCount, void | TypeHTTPValidationError>({
      path: `/v1/stats/count/reentry-reports`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Get monthly count of Analyses in a date range, rounded to months |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsMonthlyAnalyses
   * @summary Get monthly count of Analyses
   * @request GET:/v1/stats/monthly/analyses
   * @secure
   */
  getStatsMonthlyAnalyses = (query?: TypeGetStatsMonthlyAnalysesParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsMonthlyCount[], void | TypeHTTPValidationError>({
      path: `/v1/stats/monthly/analyses`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Get monthly running sum & count of Users in a date range, rounded to months by toc_accepted_at column |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsMonthlyUsers
   * @summary Get monthly count of Users added to service
   * @request GET:/v1/stats/monthly/users
   * @secure
   */
  getStatsMonthlyUsers = (query?: TypeGetStatsMonthlyUsersParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsMonthlyRunningSum[], void | TypeHTTPValidationError>({
      path: `/v1/stats/monthly/users`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Get monthly running sum & count of Organizations in a date range, rounded to months by created_at column |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsMonthlyOrganizations
   * @summary Get monthly count of Organizations added to service
   * @request GET:/v1/stats/monthly/organizations
   * @secure
   */
  getStatsMonthlyOrganizations = (query?: TypeGetStatsMonthlyOrganizationsParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsMonthlyRunningSum[], void | TypeHTTPValidationError>({
      path: `/v1/stats/monthly/organizations`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Get monthly count of Manouvre Trade Space Plots in a date range, rounded to months |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsMonthlyManoeuvrePlots
   * @summary Get monthly count of MTPs
   * @request GET:/v1/stats/monthly/manoeuvre_plots
   * @secure
   */
  getStatsMonthlyManoeuvrePlots = (query?: TypeGetStatsMonthlyManoeuvrePlotsParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsMonthlyCount[], void | TypeHTTPValidationError>({
      path: `/v1/stats/monthly/manoeuvre_plots`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Get monthly count of Conjunction Events in probability ranges, within a date range, rounded to months |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsMonthlyConjunctionEvents
   * @summary Get monthly count of Conjunction Events with probability ranges
   * @request GET:/v1/stats/monthly/conjunction-events
   * @secure
   */
  getStatsMonthlyConjunctionEvents = (query?: TypeGetStatsMonthlyConjunctionEventsParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsConjunctionEventsMonthlyCount[], void | TypeHTTPValidationError>({
      path: `/v1/stats/monthly/conjunction-events`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Get monthly count of Conjunction Events with object type, within a date range, rounded to months |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsMonthlyConjunctionEventsByObjectType
   * @summary Get monthly count of Conjunction Events with object type
   * @request GET:/v1/stats/monthly/conjunction-events-by-object-type
   * @secure
   */
  getStatsMonthlyConjunctionEventsByObjectType = (
    query?: TypeGetStatsMonthlyConjunctionEventsByObjectTypeParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeStatisticsConjunctionEventsByObjectTypeMonthlyCount[], void | TypeHTTPValidationError>({
      path: `/v1/stats/monthly/conjunction-events-by-object-type`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets monthly number of Satellites by their launch date |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsMonthlyObjectsLaunched
   * @summary Get the number of Satellites launched each month in given date range
   * @request GET:/v1/stats/monthly/objects-launched
   * @secure
   */
  getStatsMonthlyObjectsLaunched = (query?: TypeGetStatsMonthlyObjectsLaunchedParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsMonthlyRunningSum[], void | TypeHTTPValidationError>({
      path: `/v1/stats/monthly/objects-launched`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Get monthly count of Reentry Events with corresponding Alerts, within a date range, rounded to months |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsMonthlyReentryEvents
   * @summary Get monthly count of Reentry Events with Alert count
   * @request GET:/v1/stats/monthly/reentry-events
   * @secure
   */
  getStatsMonthlyReentryEvents = (query?: TypeGetStatsMonthlyReentryEventsParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsReentryEventsAndAlertsMonthlyCount[], void | TypeHTTPValidationError>({
      path: `/v1/stats/monthly/reentry-events`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Get monthly count of Reentry Events with object type, within a date range, rounded to months |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsMonthlyReentryEventsByObjectType
   * @summary Get monthly count of Reentry Events with object type
   * @request GET:/v1/stats/monthly/reentry-events-by-object-type
   * @secure
   */
  getStatsMonthlyReentryEventsByObjectType = (
    query?: TypeGetStatsMonthlyReentryEventsByObjectTypeParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeStatisticsReentryEventsByObjectTypeMonthlyCount[], void | TypeHTTPValidationError>({
      path: `/v1/stats/monthly/reentry-events-by-object-type`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Get count of Reentry Events with object type within a date range. |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsReentryEvents
   * @summary Get count of Reentry Events with object type within a date range.
   * @request GET:/v1/stats/reentry-events
   * @secure
   */
  getStatsReentryEvents = (query?: TypeGetStatsReentryEventsParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsReentryEventsAndAlertsCount[], void | TypeHTTPValidationError>({
      path: `/v1/stats/reentry-events`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Get count of Fragmentation Events with object type within a date range. |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsFragmentationEvents
   * @summary Get count of Fragmentation Events with object type within a date range.
   * @request GET:/v1/stats/fragmentation-events
   * @secure
   */
  getStatsFragmentationEvents = (query?: TypeGetStatsFragmentationEventsParams, params: RequestParams = {}) =>
    this.request<TypeStatisticsFragmentationEventsAndAlertsCount[], void | TypeHTTPValidationError>({
      path: `/v1/stats/fragmentation-events`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Get monthly count of Fragmentation Events within a date range, rounded to months |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsMonthlyFragmentationEvents
   * @summary Get monthly count of Fragmentation Events
   * @request GET:/v1/stats/monthly/fragmentation-events
   * @secure
   */
  getStatsMonthlyFragmentationEvents = (
    query?: TypeGetStatsMonthlyFragmentationEventsParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeStatisticsFragmentationEventsMonthlyCount[], void | TypeHTTPValidationError>({
      path: `/v1/stats/monthly/fragmentation-events`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Get monthly count of Fragmentation Events with object type, within a date range, rounded to months |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags stats
   * @name GetStatsMonthlyFragmentationEventsByObjectType
   * @summary Get monthly count of Fragmentation Events with object type
   * @request GET:/v1/stats/monthly/fragmentation-events-by-object-type
   * @secure
   */
  getStatsMonthlyFragmentationEventsByObjectType = (
    query?: TypeGetStatsMonthlyFragmentationEventsByObjectTypeParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeStatisticsFragmentationEventsByObjectTypeMonthlyCount[], void | TypeHTTPValidationError>({
      path: `/v1/stats/monthly/fragmentation-events-by-object-type`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Creates Tracking and Impact Prediction data in the database |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|Create| |Agency approver|Create| |Agency superuser|Create|
   *
   * @tags tracking-impact-prediction
   * @name PostTips
   * @summary Upload Tracking and Impact Prediction file to database
   * @request POST:/v1/tips/
   * @secure
   */
  postTips = (
    data: TypeBodyUploadTrackingAndImpactPredictionFileV1TipsPost,
    query?: TypePostTipsParams,
    params: RequestParams = {},
  ) =>
    this.request<TypeTIPOut, void | TypeHTTPValidationError>({
      path: `/v1/tips/`,
      method: "POST",
      query: query,
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    }); /**
   * @description Returns the most recent ingested Tracking and Impact Prediction message |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags tracking-impact-prediction
   * @name GetTipsLatest
   * @summary Gets last ingested Tracking and Impact Prediction message
   * @request GET:/v1/tips/latest
   * @secure
   */
  getTipsLatest = (query?: TypeGetTipsLatestParams, params: RequestParams = {}) =>
    this.request<TypeTIPOut, void | TypeHTTPValidationError>({
      path: `/v1/tips/latest`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description Returns Tracking and Impact Prediction messages by NORAD ID ordered by TIP external ID (newest first) |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags tracking-impact-prediction
   * @name GetTipsNoradId
   * @summary Gets Tracking and Impact Prediction messages by NORAD ID
   * @request GET:/v1/tips/{norad_id}
   * @secure
   */
  getTipsNoradId = ({ noradId, ...query }: TypeGetTipsNoradIdParams, params: RequestParams = {}) =>
    this.request<TypeTIPOut[], void | TypeHTTPValidationError>({
      path: `/v1/tips/${noradId}`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description Soft-delete uploaded TIP by setting marked is_active flag to False thus not showing in frontend. Still accessible for monitoring and audit purposes. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|-| |Government admin|-| |Agency user|-| |Agency admin|-| |Agency analyst|Delete| |Agency approver|Delete| |Agency superuser|Delete|
   *
   * @tags tracking-impact-prediction
   * @name DeleteTipsTipId
   * @summary Soft-delete single TIP message
   * @request DELETE:/v1/tips/{tip_id}
   * @secure
   */
  deleteTipsTipId = (tipId: string, params: RequestParams = {}) =>
    this.request<void, void | TypeHTTPValidationError>({
      path: `/v1/tips/${tipId}`,
      method: "DELETE",
      secure: true,
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|View| |Government admin|View| |Agency user|View| |Agency admin|View| |Agency analyst|View| |Agency approver|View| |Agency superuser|View|
   *
   * @tags users
   * @name GetUsersMeAlertSettings
   * @summary Get Users Me Alert Settings
   * @request GET:/v1/users/me/alert-settings
   * @secure
   */
  getUsersMeAlertSettings = (params: RequestParams = {}) =>
    this.request<TypeAlertSettingsOut, any>({
      path: `/v1/users/me/alert-settings`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|-| |Government user|Create| |Government admin|Create| |Agency user|Create| |Agency admin|Create| |Agency analyst|Create| |Agency approver|Create| |Agency superuser|Create|
   *
   * @tags users
   * @name PostUsersMeAlertSettings
   * @summary Post Users Me Alert Settings
   * @request POST:/v1/users/me/alert-settings
   * @secure
   */
  postUsersMeAlertSettings = (data: TypeAlertSettingsIn, params: RequestParams = {}) =>
    this.request<any, TypeHTTPValidationError>({
      path: `/v1/users/me/alert-settings`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets list of users with metadata in their organization. |User Role|Permissions| |-|-| |Satellite operator user|View within Organisation| |Satellite operator|View within Organisation| |Satellite operator admin|View within Organisation| |Government user|View within Organisation| |Government admin|View within Organisation| |Agency user|View within Organisation| |Agency admin|View within Organisation| |Agency analyst|View within Organisation| |Agency approver|View| |Agency superuser|View|
   *
   * @tags users
   * @name GetUsers
   * @summary Get list of Users in logged in user's Organization
   * @request GET:/v1/users
   * @secure
   */
  getUsers = (params: RequestParams = {}) =>
    this.request<TypeUserOut[], any>({
      path: `/v1/users`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|Create within Organisation| |Government user|-| |Government admin|Create within Organisation| |Agency user|-| |Agency admin|Create within Organisation| |Agency analyst|Create within Organisation| |Agency approver|Create| |Agency superuser|Create|
   *
   * @tags users
   * @name PostUsers
   * @summary Create a new User
   * @request POST:/v1/users
   * @secure
   */
  postUsers = (data: TypeUserIn, params: RequestParams = {}) =>
    this.request<TypeUserIdOut, TypeHTTPValidationError>({
      path: `/v1/users`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Gets full information about logged-in user (notification settings and thresholds, personal information) |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags users
   * @name GetUsersMe
   * @summary Get logged in User information
   * @request GET:/v1/users/me
   * @secure
   */
  getUsersMe = (params: RequestParams = {}) =>
    this.request<TypeUser, any>({
      path: `/v1/users/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Update information about yourself. |User Role|Permissions| |-|-| |Satellite operator user|Update| |Satellite operator|Update| |Satellite operator admin|Update| |Government user|Update| |Government admin|Update| |Agency user|Update| |Agency admin|Update| |Agency analyst|Update| |Agency approver|Update| |Agency superuser|Update|
   *
   * @tags users
   * @name PatchUsersMe
   * @summary Update logged in User information
   * @request PATCH:/v1/users/me
   * @secure
   */
  patchUsersMe = (data: TypeUserUpdate, params: RequestParams = {}) =>
    this.request<TypeUser, TypeHTTPValidationError>({
      path: `/v1/users/me`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags users
   * @name GetUsersMeLogout
   * @summary Logout logged in User
   * @request GET:/v1/users/me/logout
   * @secure
   */
  getUsersMeLogout = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/v1/users/me/logout`,
      method: "GET",
      secure: true,
      ...params,
    }); /**
   * @description ## Description Generate client credentials. |User Role|Permissions| |-|-| |Satellite operator user|Public| |Satellite operator|Public| |Satellite operator admin|Public| |Government user|Public| |Government admin|Public| |Agency user|Public| |Agency admin|Public| |Agency analyst|Public| |Agency approver|Public| |Agency superuser|Public|
   *
   * @tags users
   * @name PostUsersMeClientCredentials
   * @summary Generate API `client_credentials` for logged in User
   * @request POST:/v1/users/me/client-credentials
   * @secure
   */
  postUsersMeClientCredentials = (params: RequestParams = {}) =>
    this.request<TypeUserClientCredentialsOut, any>({
      path: `/v1/users/me/client-credentials`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Retrieves specific user. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|View within Organisation| |Government user|-| |Government admin|View within Organisation| |Agency user|-| |Agency admin|View within Organisation| |Agency analyst|View within Organisation| |Agency approver|View| |Agency superuser|View|
   *
   * @tags users
   * @name GetUsersUserId
   * @summary Get a single User
   * @request GET:/v1/users/{user_id}
   * @secure
   */
  getUsersUserId = (userId: string, params: RequestParams = {}) =>
    this.request<TypeUser, TypeHTTPValidationError>({
      path: `/v1/users/${userId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Updates information about specific user. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|Update within Organisation| |Government user|-| |Government admin|Update within Organisation| |Agency user|-| |Agency admin|Update within Organisation| |Agency analyst|Update within Organisation| |Agency approver|Update within Organisation| |Agency superuser|Update|
   *
   * @tags users
   * @name PatchUsersUserId
   * @summary Update a single User
   * @request PATCH:/v1/users/{user_id}
   * @secure
   */
  patchUsersUserId = (userId: string, data: TypeUserUpdate, params: RequestParams = {}) =>
    this.request<TypeUser, TypeHTTPValidationError>({
      path: `/v1/users/${userId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    }); /**
   * @description ## Description Soft-deletes user and deletes it permanently from Auth0. |User Role|Permissions| |-|-| |Satellite operator user|-| |Satellite operator|-| |Satellite operator admin|Delete within Organisation| |Government user|-| |Government admin|Delete within Organisation| |Agency user|-| |Agency admin|Delete within Organisation| |Agency analyst|Delete within Organisation| |Agency approver|Delete| |Agency superuser|Delete|
   *
   * @tags users
   * @name DeleteUsersUserId
   * @summary Soft-delete a single User and revoke their access
   * @request DELETE:/v1/users/{user_id}
   * @secure
   */
  deleteUsersUserId = (userId: string, params: RequestParams = {}) =>
    this.request<void, TypeHTTPValidationError>({
      path: `/v1/users/${userId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
