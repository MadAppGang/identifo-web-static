<script>
  import LoginWrapper from "../components/LoginWrapper.svelte";
  var urlParams = new URLSearchParams(window.location.search);
  const access_token = urlParams.get("access_token");
  const refresh_token = urlParams.get("refresh_token");
</script>

<LoginWrapper title="Login">
  <a href="login?callback_uri=/">Login</a>
  <div class="">
    <div class="">Access token:</div>
    {access_token}
  </div>
  <div>
    <div class="">Refresh token:</div>
    {refresh_token}
  </div>
</LoginWrapper>
