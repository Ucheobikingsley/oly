import User from "@/store/modules/User";
import { get, has, isArray, isBoolean, isObject, isString } from "lodash-es";

export enum TokenCreationReasons {
  SIGNUP = "SIGNUP",
  SIGNIN = "SIGNIN",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
}

export type AuthenicationError = {
  authenticated: false;
  tokenSent: false;
  email: string;
};

export type ValidationError<T extends string = string> = {
  constraints: Record<T, string>;
  property: T;
};

export type ValidationErrorResponse<T extends string = string> = {
  errors: Record<string, T>;
  message: T;
};

export type hasSentTokenResponseType<T extends string = string> = {
  status: string;
  message: null | string;
  data: {
    user: Record<string, T>;
    token: T;
  };
};

export enum ErrorCodes {
  INVALID_IP = "001",
  USER_EXIST = "002",
  TOKEN_INVALID = "003",
  TOKEN_EXPIRED = "004",
  PROCESS_FAILED = "005",
  POST_BODY_READING_FAILED = "006",
  SAVING_TO_DATABASE_FAILED = "007",
  RESOURCE_NOT_FOUND = "008",
  UNKNOWN_SERVER_ERROR = "009",
  POST_BODY_VALIDATION_FAILED = "010",
  USER_DOES_NOT_EXIST = "011",
  PASSWORD_CHANGE_FAILED = "O12",
  INVALID_REQUEST_PARAMETERS = "O13",
  INVALID_BIGINT_STRING_VALUE = "014",
  UNAUHTORIZED_ACCESS = "015",
  USER_PROFILE_EXIST = "016",
  UNAUTHENTICATED_ACCESS = "017",
  PAST_DATE = "018",
  CLOSED_JOB_REQUEST = "019",
  SUBDOMAIN_USER_VERIFICATION_FAILED = "020",
}

export type ErrorResponse = {
  status: "failed";
  error: {
    code: ErrorCodes;
    message: string;
    data?: {
      name: string | ErrorCodes;
    };
  };
};

export type UauthenticatedError = {
  code: ErrorCodes.UNAUTHENTICATED_ACCESS;
  message: string;
};

export type UauthorizedError = {
  code: ErrorCodes.UNAUHTORIZED_ACCESS;
  message: string;
};
export function isUauthenticatedErrorResponse(
  data: Record<string, unknown>
): data is UauthenticatedError {
  return (
    isObject(data) &&
    get(data, "code") === ErrorCodes.UNAUTHENTICATED_ACCESS &&
    isString(get(data, "message"))
  );
}

export function isUnauthorizedErrorResponse(
  data: Record<string, unknown>
): data is UauthorizedError {
  return isObject(data) && get(data, "code") === ErrorCodes.UNAUHTORIZED_ACCESS;
}

export type UserProfileCommonType = {
  id: string;
  encodedId: string;
  profileCollectionId: string;
  imageUrl?: string;
  isSuperAdmin: boolean;
};

export type TherapistProfile = UserProfileCommonType & {
  profileType: "therapist";
};

export type UserProfile = UserProfileCommonType & {
  profileType: "user";
};

export const isUserProfile = (
  data: Record<string, unknown>
): data is UserProfile => {
  return isObject(data) && get(data, "profileType") === "user";
};

export const isTherapistProfile = (
  data: Record<string, unknown>
): data is TherapistProfile => {
  return isObject(data) && get(data, "profileType") === "therapist";
};

export type UserProfileType = UserProfile | TherapistProfile;

export function isErrorResponse(
  data: Record<string, unknown>
): data is ErrorResponse {
  return isObject(data) && has(data, "errors");
}

export function isValidationErrorResponse(
  data: Record<string, unknown>
): data is ValidationErrorResponse {
  return isObject(data) && has(data, "errors") && has(data, "message");
}
export type hasLoggedIn = {
  status: "Request was successful";
  message: unknown;
  data: {
    token: string;
    user: Record<string, unknown>;
  };
};

export type SelectListItemType = {
  id: string;
  name: string;
};

export function hasLoggedInResponse(
  data: Record<string, unknown>
): data is hasLoggedIn {
  return (
    isObject(data) &&
    get(data, "status") === "Request was successful" &&
    has(data, "data")
  );
}

export function hasSentTokenResponse(
  data: Record<string, unknown>
): data is hasSentTokenResponseType {
  return (
    isObject(data) &&
    get(data, "status") === "Request was successful" &&
    has(data, "data.token")
  );
}

export function isAuthenticationError(
  data: Record<string, unknown>
): data is AuthenicationError {
  return (
    isObject(data) &&
    get(data, "authenticated") === false &&
    get(data, "tokenSent") === false
  );
}

export type AuthorizationError = {
  data: string | null | "";
  message: string | null | "";
  status: string | null;
};

export function isAuthorizationError(
  data: Record<string, unknown>
): data is AuthorizationError {
  return isObject(data) && get(data, "status") === "Error Occurred,";
}

export type hasDataList<T> = {
  status: string;
  message: null | string;
  data: T[];
};

export function hasDataResponseList<T>(
  data: Record<string, unknown>
): data is hasDataList<T> {
  return (
    isObject(data) &&
    get(data, "status") === "Request was successful" &&
    isArray(get(data, "data"))
  );
}
