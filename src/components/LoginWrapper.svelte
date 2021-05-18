<script lang="typescript">
  import { createEventDispatcher } from "svelte";
  export let title: string;
  const dispatch = createEventDispatcher();
  function onSubmit(e: Event) {
    dispatch("submit");
    e.preventDefault();
  }
</script>

<main class="form-signin">
  <form on:submit={onSubmit}>
    <img
      class="mb-4"
      src="../assets/brand/bootstrap-logo.svg"
      alt=""
      width="72"
      height="57"
    />
    <h1 class="h3 mb-3 fw-normal">{title}</h1>
    <slot />
    <p class="mt-5 mb-3 text-muted">&copy; 2017â2021</p>
  </form>
</main>
