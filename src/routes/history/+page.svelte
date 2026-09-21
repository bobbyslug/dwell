<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import List from "$lib/components/List.svelte";
  import { invalidateAll } from "$app/navigation";
  import { Toaster, toast } from "svelte-sonner";
  let { data } = $props();

  async function resetDb() {
    if (!confirm("Delete all history? This action can't be undone.")) return;

    try {
      const res = await fetch("/api/history/clear", { method: "POST" });
      if (!res.ok) {
        toast("Could't clear history.");
        return;
      }

      const { rowsDeleted } = await res.json();
      toast.success(
        `${rowsDeleted} ${rowsDeleted === 1 ? "entry" : "entries"} removed.`,
      );
      await invalidateAll();
    } catch {
      toast.error("Couldn't reach the server.");
    }
  }
</script>

<Toaster richColors />

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
  <div class="row">
    <Button bg="gray" onclick={() => history.back()}>Back</Button>
    <Button bg="gray" onclick={() => resetDb()}>Clear History</Button>
  </div>
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
