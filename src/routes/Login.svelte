<script lang="typescript">
  import {
    afterLoginRedirect,
    loginCatchRedirect,
  } from "src/afterLoginRedirect.js";

  import type { ApiError } from "@madappgang/identifo-js";
  import { auth } from "../store";

  import LoginWrapper from "../components/LoginWrapper.svelte";

  let username = "testuser";
  let password = "Password";
  let registration = false;
  let lastError: ApiError = null;

  var urlParams = new URLSearchParams(window.location.search);
  const callback = urlParams.get("callback_uri");

  $auth.api.getAppSettings().then((r) => {
    registration = !r.registrationForbidden;
  });

  async function login() {
    lastError = null;
    $auth.api
      .login(username, password, "", [""])
      .then(afterLoginRedirect)
      .catch((data: ApiError) => {
        loginCatchRedirect(data);
        lastError = data;
      });
  }
  function exit() {
    window.location.href = `${callback}`;
  }
</script>

<LoginWrapper title="Login" on:submit={login}>
  <div class="form-floating">
    <input
      type="text"
      class="form-control"
      id="floatingInput"
      bind:value={username}
      placeholder="username"
    />
    <label for="floatingInput">Username</label>
  </div>
  <div class="form-floating">
    <input
      type="password"
      class="form-control"
      id="floatingPassword"
      bind:value={password}
      placeholder="Password"
    />
    <label for="floatingPassword">Password</label>
  </div>

  {#if !!lastError}
    <div class="alert alert-danger" role="alert">
      {lastError?.detailedMessage}
    </div>
  {/if}

  <button class="w-100 btn btn-lg btn-primary my-3">Sign in</button>
  <div class="d-flex flex-column">
    <a href={"password/forgot?" + urlParams.toString()}>Forgot password</a>
    {#if registration}
      <a href={"register?" + urlParams.toString()}>Register new account</a>
    {/if}
    {#if !!callback}
      <a on:click={exit}>Cancel/exit</a>
    {/if}
    <a href="user-agreement">User agreement</a>
    <a href="privacy-policy">Privacy policy</a>
  </div>
</LoginWrapper>

<!-- If OTP
<div>username/email/phone</div>
<Username value="testuser" />  
ELSE -->
