<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import List from "$lib/components/List.svelte";
  import { session } from "$lib/session.svelte.ts";

  let countdown = $state(3);
  let ready = $derived(countdown <= 0);

  let intentOptions = ["Question", "Distraction", "Task", "Fun"];
  let selectedIntent: string | null = $state(null);

  let avoiding = $state("");
  let pausedSuccessfully = $state(true);
  let submitDisabled = $derived(
    selectedIntent === "Distraction" && !avoiding.trim(),
  );

  async function saveAvoidance() {
    await fetch("api/history", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        intention: selectedIntent,
        text: avoiding,
        paused: pausedSuccessfully,
      }),
    });
  }

  //Countdown
  $effect(() => {
    if (session.step !== "COUNTDOWN") return;
    const ivl = setInterval(() => {
      countdown -= 1;

      if (ready) {
        clearInterval(ivl);
        session.step = "SELECT_INTENT";
      }
    }, 1000);

    return () => {
      clearInterval(ivl);
    };
  });
</script>

<!--Intent Buttons-->
{#snippet intentRow(intent: String)}
  <Button
    variant={selectedIntent === intent ? "selected" : "neutral"}
    onclick={() => (selectedIntent = intent)}>{intent}</Button
  >
{/snippet}
<div class="container">
  <!--Content-->
  {#if session.step === "COUNTDOWN"}
    <h1>{countdown}</h1>
  {:else if session.step === "SELECT_INTENT"}
    <div class="container section">
      <h1>You are the captain now...</h1>
      <div>What is your intention?</div>
      <List id="intentOptions" items={intentOptions} row={intentRow} />
    </div>

    {#if selectedIntent === "Distraction"}
      <div class="container section">
        <div>
          <label for="prompt">What are you avoiding?</label>
          <input type="text" id="prompt" bind:value={avoiding} />
        </div>
        <div class="row">
          <div>Face the discomfort?</div>
          <Button
            id="pausedSuccessfullyButton"
            variant={pausedSuccessfully ? "positive" : "negative"}
            onclick={() => (pausedSuccessfully = !pausedSuccessfully)}
          >
            {pausedSuccessfully
              ? "Yes, I am back in control :)"
              : "Too drained at the moment :("}
          </Button>
        </div>
      </div>
    {/if}

    <Button
      variant="neutral"
      onclick={() => {
        session.step = "DONE";
        saveAvoidance();
      }}
      disabled={submitDisabled}>Submit</Button
    >
  {:else if session.step === "DONE"}
    <p>Carry on</p>
    <Button
      id="backButton"
      variant="neutral"
      onclick={() => (session.step = "SELECT_INTENT")}
    >
      Back
    </Button>
  {/if}
</div>
