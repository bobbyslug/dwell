<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import List from "$lib/components/List.svelte";
  let { data } = $props();
</script>

{#snippet avoidanceRow(avoidance)}
  <div>
    <div class={avoidance.paused ? "success" : "fail"}>{avoidance.text}</div>
  </div>
{/snippet}
<div class="container section">
  <div class="split">
    <List
      items={data.success}
      row={avoidanceRow}
      isVertical={true}
      header="Successful"
      footer={data.success.length}
    />
    <List
      items={data.fail}
      row={avoidanceRow}
      isVertical={true}
      header="Unsuccessful"
      footer={data.fail.length}
    />
  </div>
  <div>feature idea: weekly/daily trends</div>
  <Button bg="gray" onclick={() => history.back()}>Back</Button>
</div>

<style>
  .split {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: var(--space-l);
  }

  .success {
    color: var(--color-positive);
  }
  .fail {
    color: var(--color-negative);
  }
</style>
