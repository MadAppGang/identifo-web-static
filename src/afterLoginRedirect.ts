import {
  ApiError,
  APIErrorCodes,
  LoginResponse,
} from "@madappgang/identifo-js";

export function afterLoginRedirect(e: LoginResponse) {
  var urlParams = new URLSearchParams(window.location.search);
  const callback = urlParams.get("callback_uri");
  const appID = urlParams.get("app_id");

  if (e.require_2fa) {
    if (!e.enabled_2fa) {
      var urlParams = new URLSearchParams({
        mandatory: "true",
        token: e.access_token,
        callback_uri: callback,
        app_id: appID,
      });
      window.location.href = `tfa/setup?${urlParams.toString()}`;
      return;
    }
    if (e.enabled_2fa) {
      var urlParams = new URLSearchParams({
        token: e.access_token,
        callback_uri: callback,
        app_id: appID,
      });
      window.location.href = `tfa/verify?${urlParams.toString()}`;
      return;
    }
  }
  if (callback && e.access_token && e.refresh_token) {
    var urlParams = new URLSearchParams({
      access_token: e.access_token,
      refresh_token: e.refresh_token,
      app_id: appID,
    });
    window.location.href = `${callback}?${urlParams.toString()}`;
    return;
  }
  if (callback && e.access_token && !e.refresh_token) {
    var urlParams = new URLSearchParams({
      access_token: e.access_token,
      app_id: appID,
    });
    window.location.href = `${callback}?${urlParams.toString()}`;
    return;
  }
}
export function loginCatchRedirect(data: ApiError) {
  var urlParams = new URLSearchParams(window.location.search);
  const callback = urlParams.get("callback_uri");
  const appID = urlParams.get("app_id");

  if (data.id === APIErrorCodes.PleaseEnableTFA) {
    var urlParams = new URLSearchParams({
      mandatory: "true",
      app_id: appID,
      callback_uri: callback,
    });
    window.location.href = `tfa/setup?${urlParams.toString()}`;
  }
}
