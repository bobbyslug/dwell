<script lang="ts">
  let { items, row, isVertical = false, header, footer } = $props();
</script>

<div class="stack">
  {#if header}
    <h3>{header}</h3>
  {/if}
  <ul class={["list", isVertical ? "stack" : "row"]} id="list">
    {#each items as item (item)}
      <li>{@render row(item)}</li>
    {/each}
  </ul>
  {#if footer}
    <div>{footer}</div>
  {/if}
</div>

<style>
  .list {
    display: flex;
    gap: var(--space-sm);
    list-style: none;
    margin: 0;
    padding: 0;
    align-content: flex-start;
  }
</style>
