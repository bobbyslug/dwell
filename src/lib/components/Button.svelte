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
    --btn-bg: var(--color-neutral);
    --btn-fg: var(--color-text);

    border: none;
    border-radius: 6px;
    font: inherit;
    font-size: 1.1rem;
    cursor: pointer;
    background-color: var(--btn-bg);
    color: var(--btn-fg);
    padding: var(--space-sm);
    transition:
      background-color 120ms ease,
      transform 80ms ease;
  }

  .button:hover:not(:disabled) {
    background-color: color-mix(in srgb, var(--btn-bg) 88%, black);
  }

  .button:active:not(:disabled) {
    transform: translateY(1px);
  }

  .button:focus-visible {
    outline: 2px solid var(--color-text);
    outline-offset: 2px;
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button.positive {
    --btn-bg: var(--color-positive);
    --btn-fg: var(--color-bg);
  }

  .button.negative {
    --btn-bg: var(--color-negative);
    --btn-fg: var(--color-bg);
  }

  .button.selected {
    --btn-bg: var(--color-selected);
  }
</style>
