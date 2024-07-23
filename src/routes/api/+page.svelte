<script lang="ts">
  import { browser } from "$app/environment";
  import { invalidateAll } from "$app/navigation";
  import type { PageData } from "./$types";

  export let data: PageData;

  if (browser) {
    setInterval(invalidateAll, 1000);
  }
</script>

<h1>{JSON.stringify(data.picos)}</h1>
