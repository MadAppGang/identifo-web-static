<script lang="typescript">
  import { TFAType, User } from "@madappgang/identifo-js";
  import { auth } from "../store";
  import LoginWrapper from "../components/LoginWrapper.svelte";

  var urlParams = new URLSearchParams(window.location.search);
  const callback = urlParams.get("callback_uri");
  const appID = urlParams.get("app_id") || urlParams.get("appId");

  const mandatory = urlParams.get("mandatory") === "true";
  let type: TFAType;
  let user: User;
  let phone = "";
  let email = "";
  let provisioningURI = "";
  let qrBase64 = "";
  let accessToken = "";

  $auth.api.getAppSettings().then((r) => {
    type = r.tfaType;
  });

  $auth.api.getUser(urlParams.get("token")).then((r) => {
    user = r;
    phone = r.phone || "";
    email = r.email || "";
  });

  async function setuptfa() {
    if (type == TFAType.TFATypeSMS) {
      await $auth.api.updateUser({ new_phone: phone }, urlParams.get("token"));
    }

    if (type == TFAType.TFATypeEmail) {
      await $auth.api.updateUser({ new_email: email }, urlParams.get("token"));
    }

    await $auth.api.enableTFA(urlParams.get("token")).then((r) => {
      accessToken = r.access_token;
      if (!r.provisioning_uri) {
        verifytfa();
      }
      if (r.provisioning_uri) {
        provisioningURI = r.provisioning_uri;
        qrBase64 = r.provisioning_qr;
      }
    });
  }
  function verifytfa() {
    var urlParams = new URLSearchParams({
      token: accessToken,
      callback_uri: callback,
      app_id: appID,
    });
    window.location.href = `tfa/verify?${urlParams.toString()}`;
  }
</script>

<LoginWrapper title="Setup 2FA" on:submit={setuptfa}>
  {#if type == TFAType.TFATypeApp}
    <div>
      Use GoogleAuth as 2fa
      {#if provisioningURI}
        <img src="data:image/png;base64, {qrBase64}" alt="provisioningURI" />
        <div>{provisioningURI}</div>
        <button class="w-100 btn btn-lg btn-primary my-3" on:click={verifytfa}
          >Next</button
        >
      {/if}
      {#if !provisioningURI}
        <button class="w-100 btn btn-lg btn-primary my-3" on:click={setuptfa}
          >Setup</button
        >
      {/if}
    </div>
  {/if}
  {#if type == TFAType.TFATypeSMS}
    <div>
      Use phone as 2fa, please check your phone bellow, we will send
      confirmation code to this phone
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          bind:value={phone}
          placeholder="+1 234 567 89 00"
        />
        <label for="floatingInput">Phone number</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary my-3" on:click={setuptfa}
        >Setup email</button
      >
    </div>
  {/if}
  {#if type == TFAType.TFATypeEmail}
    <div>
      Use email as 2fa, please check your email bellow, we will send
      confirmation code to this email
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          bind:value={email}
          placeholder="user@domain.com"
        />
        <label for="floatingInput">Email</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary my-3" on:click={setuptfa}
        >Setup phone</button
      >
    </div>
  {/if}
  {#if !mandatory}
    <button>Continue</button>
  {/if}
</LoginWrapper>
