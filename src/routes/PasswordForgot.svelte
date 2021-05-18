<script lang="typescript">
  import LoginWrapper from "../components/LoginWrapper.svelte";
  import type { ApiError, SuccessResponse } from "@madappgang/identifo-js";
  import { auth } from "../store";

  let urlParams = new URLSearchParams(window.location.search);
  let username = "";
  let lastError: ApiError = null;
  let success: boolean = false;

  async function restorePassword() {
    lastError = null;
    return $auth.api
      .requestResetPassword(username)
      .then((e: SuccessResponse) => {
        success = true;
      })
      .catch((data: ApiError) => {
        console.log(data);
        lastError = data;
      });
  }
</script>

<LoginWrapper title="Restore password" on:submit={restorePassword}>
  <div class="form-floating">
    <input
      type="username"
      class="form-control"
      id="floatingUsername"
      bind:value={username}
      placeholder="username"
    />
    <label for="floatingUsername">Username</label>
  </div>

  {#if !!lastError}
    <div class="alert alert-danger" role="alert">
      {lastError?.detailedMessage}
    </div>
  {/if}

  {#if !success}
    <button class="w-100 btn btn-lg btn-primary my-3">Restore password</button>
  {/if}
  {#if success}
    <div class="alert alert-success my-3" role="alert">
      Reset password link sended to email
    </div>
  {/if}
  <div class="d-flex flex-column">
    <a href={"login?" + urlParams.toString()}>Back to login</a>
  </div>
</LoginWrapper>

<!-- If OTP
<div>username/email/phone</div>
<Username value="testuser" />  
ELSE -->
