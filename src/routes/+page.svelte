<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import List from "$lib/components/List.svelte";
  import { goto } from "$app/navigation";
  import type { Snapshot } from "./$types";

  let step: "COUNTDOWN" | "SELECT_INTENT" | "DONE" = $state("COUNTDOWN");
  let countdown = $state(3);
  let ready = $derived(countdown <= 0);

  let intentOptions = ["Question", "Distraction", "Task", "Fun"];
  let selectedIntent: string | null = $state(null);

  let avoidanceText = $state("");
  let pausedSuccessfully = $state(true);
  let submitDisabled = $derived(
    selectedIntent === "Distraction" && !avoidanceText.trim(),
  );

  async function saveAvoidance() {
    await fetch("api/history", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        intention: selectedIntent,
        text: avoidanceText,
        paused: pausedSuccessfully,
      }),
    });
    step = "DONE";
  }

  //Countdown
  $effect(() => {
    if (step !== "COUNTDOWN") return;
    const ivl = setInterval(() => {
      countdown -= 1;

      if (ready) {
        clearInterval(ivl);
        step = "SELECT_INTENT";
      }
    }, 1000);

    return () => {
      clearInterval(ivl);
    };
  });

  //Prevent countdown when navigating back to home page
  export const snapshot: Snapshot<string> = {
    capture: () => step,
    restore: (value) => (step = value),
  };
</script>

<!--Intent Buttons-->
{#snippet intentRow(intent)}
  <Button
    variant={selectedIntent === intent ? "selected" : "neutral"}
    onclick={() => (selectedIntent = intent)}>{intent}</Button
  >
{/snippet}
<div class="container">
  <!--Content-->
  {#if step === "COUNTDOWN"}
    <h1>{countdown}</h1>
  {:else if step === "SELECT_INTENT"}
    <div class="container section">
      <h1>You are the captain now...</h1>
      <div>What is your intention?</div>
      <List id="intentOptions" items={intentOptions} row={intentRow} />
    </div>

    {#if selectedIntent === "Distraction"}
      <div class="container section">
        <div>
          <label for="prompt">What are you avoiding?</label>
          <input type="text" id="prompt" bind:value={avoidanceText} />
        </div>
        <div class="row">
          <div>Go back to living?</div>
          <Button
            id="pausedSuccessfullyButton"
            variant={pausedSuccessfully ? "positive" : "negative"}
            onclick={() => (pausedSuccessfully = !pausedSuccessfully)}
          >
            {pausedSuccessfully
              ? "I will go touch grass :)"
              : "Too drained at the moment :("}
          </Button>
        </div>
      </div>
    {/if}

    <Button
      variant="neutral"
      onclick={() => {
        step = "DONE";
        saveAvoidance();
      }}
      disabled={submitDisabled}>Submit</Button
    >
    <Button variant="neutral" onclick={() => goto("/history")}
      >View Avoidance History</Button
    >
  {:else if step === "DONE"}
    <p>Carry on</p>
    <Button
      id="backButton"
      variant="neutral"
      onclick={() => (step = "SELECT_INTENT")}
    >
      Back
    </Button>
  {/if}
</div>
