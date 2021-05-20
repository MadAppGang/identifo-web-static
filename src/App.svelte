<script lang="ts">
  import "./bootstrap/css/bootstrap.min.css";
  import "./styles.css";
  import IdentifoAuth from "@madappgang/identifo-js";
  import { auth } from "./store";

  import router from "page";
  import routes from "./routes";

  let page;
  let params;

  var urlParams = new URLSearchParams(window.location.search);
  const app_id = urlParams.get("app_id");

  auth.set(
    new IdentifoAuth({
      url: "http://localhost:8081/", //location.origin,
      appId: app_id,
    })
  );
  router.base("");
  if (document.getElementsByTagName("base")[0]) {
    const baseHref = `${document
      .getElementsByTagName("base")[0]
      .getAttribute("href")
      .replace(/\/$/, "")}`;
    console.log(`set base ${baseHref}`);
    router.base(baseHref);
  }
  routes.forEach((route) => {
    router(
      route.path,

      // Set the params variable to the context.
      // We use this on the component initialisation
      (ctx, next) => {
        params = ctx.params;
        next();
      },

      // Check if auth is valid. If so, set the page to the component
      // otherwise redirect to login.
      () => {
        page = route.component;
      }
    );
  });
  router.start();
</script>

<svelte:head>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
    crossorigin="anonymous"
  />
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
    crossorigin="anonymous"></script>
</svelte:head>

<div class="text-center w-100">
  {#if !app_id}
    app_id query param not set
  {:else}
    <svelte:component this={page} {params} />
  {/if}
</div>
