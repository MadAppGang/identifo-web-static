<script lang="typescript">
  import { TFAType } from "@madappgang/identifo-js";
  import { auth } from "../store";
  import LoginWrapper from "../components/LoginWrapper.svelte";

  var urlParams = new URLSearchParams(window.location.search);
  const callback = urlParams.get("callback_uri");
  const appID = urlParams.get("app_id");

  let phone = "";
  let email = "";
  let type: TFAType;

  let code = "";
  function verifyTFA() {
    $auth.api.verifyTFA(code, [], urlParams.get("token")).then((e) => {
      console.log(e);
      if (callback && e.access_token && e.refresh_token) {
        window.location.href = `${callback}?access_token=${e.access_token}&refresh_token=${e.refresh_token}`;
        return;
      }
      if (callback && e.access_token && !e.refresh_token) {
        window.location.href = `${callback}?access_token=${e.access_token}`;
        return;
      }
    });
  }

  $auth.api.getAppSettings().then((r) => {
    type = r.tfaType;
  });

  $auth.api.getUser(urlParams.get("token")).then((r) => {
    phone = r.phone || "";
    email = r.email || "";
  });
</script>

<LoginWrapper title="Confirm 2FA" on:submit={verifyTFA}>
  <div>
    {#if type == TFAType.TFATypeApp}
      Please use google authenticator app and enter code
    {/if}
    {#if type == TFAType.TFATypeSMS}
      Please check your phone number {phone} for the code
    {/if}
    {#if type == TFAType.TFATypeEmail}
      Check your email {email}
    {/if}
  </div>

  Please enter code<br />
  <div class="form-floating">
    <input
      type="text"
      class="form-control"
      id="floatingUsername"
      bind:value={code}
      placeholder="XXXX"
    />
    <label for="floatingInput">Verify code</label>
  </div>
  <button class="w-100 btn btn-lg btn-primary my-3" on:click={verifyTFA}
    >Ok</button
  >
  <div class="d-flex flex-column">
    <a href="">Go back</a>
    <a href="">I am not reciving code</a>
  </div>
</LoginWrapper>
