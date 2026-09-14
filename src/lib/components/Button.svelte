<script lang="ts">
  let {
    variant = "neutral",
    onclick,
    disabled = false,
    children,
  }: {
    variant?: "neutral" | "positive" | "negative" | "selected";
    disabled?: boolean;
  } = $props();
</script>

<button class={["button", variant]} {onclick} {disabled}>
  {@render children()}
</button>

<style>
  .button {
    font-size: 0.9rem;
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button.positive {
    background-color: var(--color-positive);
  }

  .button.negative {
    background-color: var(--color-negative);
  }

  .button.neutral {
    background-color: var(--color-neutral);
  }

  .button.selected {
    background-color: var(--color-selected);
  }
</style>
