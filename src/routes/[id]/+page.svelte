<script lang="ts">
  import { browser } from "$app/environment";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { onDestroy } from "svelte";
  import type { PageData } from "./$types";
  import { page } from "$app/stores";

  export let data: PageData;

  $: height = data.art.height;
  $: width = data.art.width;
  $: name = data.art.name;
  $: createdBy = data.art.createdBy;

  let forms: Record<number, HTMLFormElement> = {};

  let color = "#ffffff"; // initial color
  let placedBy = "Anonymous"; // initial editor

  if (browser) {
    let es: EventSource;

    es = new EventSource(`/${$page.params.id}`);
    es.onmessage = (event) => {
      const pixel = JSON.parse(event.data);

      /* add the new message */
      if (pixel) {
        const index = pixel.y * width + pixel.x;
        data.art.pixels[index] = pixel;
      }
    };

    onDestroy(() => {
      es.close();
    });
  }
</script>

<h1>{name}</h1>
<p>Created by {createdBy}</p>

<hr />
<label>Editor:</label>
<input type="text" bind:value={placedBy} />
<hr />

<div
  class="container mx-auto flex gap-20 justify-center items-center w-full
h-screen"
>
  <!-- color picker with nice label -->
  <div class="flex flex-col gap-20">
    <div class="grid grid-cols-4 gap-4">
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #FF0000"
        on:click={() => (color = "#FF0000")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #FFA500"
        on:click={() => (color = "#FFA500")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #FFFF00"
        on:click={() => (color = "#FFFF00")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #008000"
        on:click={() => (color = "#008000")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #008080"
        on:click={() => (color = "#008080")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #0000FF"
        on:click={() => (color = "#0000FF")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #4B0082"
        on:click={() => (color = "#4B0082")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #800080"
        on:click={() => (color = "#800080")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #FFC0CB"
        on:click={() => (color = "#FFC0CB")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #808080"
        on:click={() => (color = "#808080")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #000000"
        on:click={() => (color = "#000000")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #FFFFFF"
        on:click={() => (color = "#FFFFFF")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #FF6347"
        on:click={() => (color = "#FF6347")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #40E0D0"
        on:click={() => (color = "#40E0D0")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #ADFF2F"
        on:click={() => (color = "#ADFF2F")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #FFD700"
        on:click={() => (color = "#FFD700")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #DC143C"
        on:click={() => (color = "#DC143C")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #7B68EE"
        on:click={() => (color = "#7B68EE")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #32CD32"
        on:click={() => (color = "#32CD32")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #FF4500"
        on:click={() => (color = "#FF4500")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #DA70D6"
        on:click={() => (color = "#DA70D6")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #EEE8AA"
        on:click={() => (color = "#EEE8AA")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #8B4513"
        on:click={() => (color = "#8B4513")}
      ></button>
      <button
        class="w-16 border-2 border-black h-16 rounded cursor-pointer"
        style="background-color: #FA8072"
        on:click={() => (color = "#FA8072")}
      ></button>
    </div>
    <button
      disabled
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      style="background-color: {color}"
    ></button>
  </div>
  <!-- CURRENT COLOR HERE AS A LONG BAR OF THE COLOR -->

  <div class="flex flex-col gap-20">
    <div id="grid" class="grid" style="--width: {width}; --height: {height};">
      {#each data.art.pixels as pixel, i}
        <form
          bind:this={forms[i]}
          use:enhance={({ cancel }) => {
            if (pixel.color === color) {
              cancel();
            }
            let temp = pixel.color;
            pixel.color = color;
            return ({ result, update }) => {
              if (result.type === "error") {
                pixel.color = temp;
              }
              // do nothing to prevent each form submit to trigger invalidateAll.
              // invalidateAll is triggered manually on interval
            };
          }}
          action="?/edit"
          method="post"
        >
          <input type="hidden" name="x" bind:value={pixel.x} />
          <input type="hidden" name="y" bind:value={pixel.y} />
          <input type="hidden" name="color" bind:value={color} />
          <input type="hidden" name="placedBy" bind:value={placedBy} />
          {#if "id" in pixel}
            <input type="hidden" name="id" bind:value={pixel.id} />
          {/if}

          <button
            on:mousedown={(e) => {
              if (pixel.color === color) {
                return;
              }
              // submit this form
              forms[i].dispatchEvent(new Event("submit"));
            }}
            on:mousemove={(e) => {
              if (e.buttons !== 1) {
                return;
              }
              if (pixel.color === color) {
                return;
              }
              // submit this form
              forms[i].dispatchEvent(new Event("submit"));
            }}
            class="pixel"
            style="background-color: {pixel.color}"
          ></button>
        </form>
      {/each}
    </div>
  </div>
</div>

<style>
  #grid {
    grid-template-columns: repeat(var(--width), minmax(0, 1fr));
    grid-template-rows: repeat(var(--height), minmax(0, 1fr));
    gap: 1px;
  }

  form {
    margin: 0;
    padding: 0;
    display: flex;
  }

  .pixel {
    width: 16px;
    height: 16px;
  }

  input {
    color: black;
  }
</style>
