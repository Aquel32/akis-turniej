<script>
    import {X} from '@lucide/svelte'

    let { enabled,title,description,submit,cancel } = $props();

</script>

{#if enabled}
<div class="flex justify-center items-center absolute w-full h-full top-0 left-0  backdrop-blur-xs">
    <div class="flex flex-col gap-2 items-center bg-red-100">
        <div class="bg-red-200 w-full text-center p-3 flex justify-between">
            <h1 class="">{title}</h1>
            <p>{description}</p>
        </div>
            <button onclick={submit} class="bg-gray-300 px-10 py-2 mb-5">Submit</button>
            <button onclick={cancel} class="bg-gray-300 px-10 py-2 mb-5">Cancel</button>
    </div>
</div>
{/if}