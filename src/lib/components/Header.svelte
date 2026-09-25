<script lang="ts">
</script>

<nav class="header">
  <a href="/">Dwell</a>
  <a href="/history">History</a>
</nav>

<style>
  .header {
    background-color: var(--color-positive);
    color: var(--color-text);
    display: flex;
    justify-content: space-between;
    padding: var(--space-m) var(--space-l);
    gap: var(--space-m);
  }

  .header a {
    text-decoration: none;
    color: inherit;
    transition: color 120ms ease;
  }

  .header a:hover {
    color: var(--color-selected);
  }
</style>
