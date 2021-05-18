<script lang="typescript">
  import { afterLoginRedirect } from "src/afterLoginRedirect.js";

  import type { ApiError } from "@madappgang/identifo-js";
  import { auth } from "../store";

  import LoginWrapper from "../components/LoginWrapper.svelte";

  let username = `sokolov.stas+${Math.round(Math.random() * 10000)}@gmail.com`;
  let email = `TestUser${Math.round(Math.random() * 10000)}@test.com`;
  let password = "Password";
  let phone = `+${Math.round(Math.random() * 100000000000)}`;

  var urlParams = new URLSearchParams(window.location.search);
  const callback = urlParams.get("callback_uri");

  let lastError: ApiError = null;

  async function register() {
    lastError = null;
    $auth.api
      .register(username, password, email, phone)
      .then(afterLoginRedirect)
      .catch((data: ApiError) => {
        lastError = data;
      });
  }
</script>

<LoginWrapper title="Register" on:submit={register}>
  <div class="form-floating">
    <input
      type="text"
      class="form-control"
      id="floatingUsername"
      bind:value={username}
      placeholder="username"
    />
    <label for="floatingUsername">Username</label>
  </div>
  <!-- <div class="form-floating">
    <input
      type="email"
      class="form-control"
      id="floatingEmail"
      bind:value={email}
      placeholder="user@domain.com"
    />
    <label for="floatingEmail">Email</label>
  </div> -->
  <!-- <div class="form-floating">
    <input
      type="phone"
      class="form-control"
      id="floatingPhone"
      bind:value={phone}
      placeholder="+1 234 567 89 00"
    />
    <label for="floatingPhone">Phone number</label>
  </div> -->
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

  <button class="w-100 btn btn-lg btn-primary my-3">Sign up</button>
  <div class="d-flex flex-column">
    <a href="user-agreement">By clicking register I accept user agreement</a>
    <a href={"login?" + urlParams.toString()}>Go back to login</a>
  </div>
</LoginWrapper>
