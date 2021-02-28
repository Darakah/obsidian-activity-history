<script>
  export let options = [];
  export let display_func = (value) => value;
  export let index = 0;
</script>

<select class="selectYear" bind:value={index}>
  {#each options as option, i}
    <option value={i}>{display_func(option)}</option>
  {/each}
</select>
