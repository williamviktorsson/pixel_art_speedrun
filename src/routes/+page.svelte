<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<!-- form action create new pixel art and list em by id -->

<script lang="ts">
  export let data;
</script>

<form action="?/create" method="post">
  <label for="name">Name:</label>
  <input id="name" type="text" name="name" required />

  <label for="width">Width:</label>
  <input id="width" type="number" name="width" max=64 required />

  <label for="height">Height:</label>
  <input id="height" type="number" name="height" max="64" required />

  <label for="createdBy">Created By:</label>
  <input id="createdBy" type="text" name="createdBy" required />

  <input type="submit" value="Submit" />
</form>

<hr />

<!-- list all pixel art by id -->
<h1>Arts</h1>
{#each data.arts as art}
  <a href="/{art.id}">{art.name}</a>
{/each}

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
  }

  label {
    font-weight: bold;
    margin-top: 10px;
  }

  input {
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    color: black;
  }

  input[type="submit"] {
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background-color: #0056b3;
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 1.2em;
    margin-bottom: 10px;
    display: block;
  }

  a:hover {
    color: #007bff;
  }
</style>
