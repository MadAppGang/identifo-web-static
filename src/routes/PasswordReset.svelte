<script lang="typescript">
  import LoginWrapper from "../components/LoginWrapper.svelte";
  import type { ApiError } from "@madappgang/identifo-js";
  import { auth } from "../store";

  let password = "Password";
  let lastError: ApiError = null;
  let success: boolean = false;

  var urlParams = new URLSearchParams(window.location.search);
  const callback = urlParams.get("callback_uri");

  async function resetPassword() {
    var urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    lastError = null;
    $auth.api
      .resetPassword(password, token)
      .then((e) => {
        success = true;
        console.log(e);
      })
      .catch((data: ApiError) => {
        lastError = data;
      });
  }
  function exit() {
    window.location.href = `${callback}`;
  }
</script>

<LoginWrapper title="Reset password" on:submit={resetPassword}>
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

  {#if !success}
    <button class="w-100 btn btn-lg btn-primary my-3">Ok</button>
  {/if}
  {#if success}
    <div class="alert alert-success my-3" role="alert">
      New password has been set. Return to login <a
        href={"login?" + urlParams.toString()}
      />
    </div>
  {/if}
  <div class="d-flex flex-column">
    <a href={"login?" + urlParams.toString()}>Back to login</a>
  </div>
</LoginWrapper>
