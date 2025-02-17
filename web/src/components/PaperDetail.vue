<script setup>
import { ref } from "vue";
import { useDataStore } from "../DataStore";
import { pubmed } from "../utils/pubmed";
import { translator } from "../utils/translator";

const store = useDataStore();

const status = ref({
    is_translating: false,
});

function highlightText(text) {
    let _text = text;

    // replace \n with <br>
    _text = _text.replace(/\\n/g, '<br>');

    if (store.config.features.auto_highlight.enabled) {
        _text = store.highlight(
            _text,
            store.config.keywords,
        )
    }
    return _text;
}

async function onClickDecision(result) {
    store.setWorkingItemDecision(
        result
    );
    store.msg(`Updated [${store.working_item.note_id}] to [${store.working_item.language_detect}]`, 'success');
}

</script>

<template>
<Panel class="flex flex-col w-2/3">

<template #header>
    <div class="w-full flex justify-between">
        <div class="flex items-center gap-2">
            <div class="flex-col items-center">
                <div class="text-lg font-bold">
                    <font-awesome-icon :icon="['far', 'file']" />
                    Note Detail
                </div>
                <div class="panel-subtitle text-sm">
                    <template v-if="store.working_item">
                        <font-awesome-icon :icon="['fas', 'angle-right']" />
                        {{ store.working_item?.note_id }}
                    </template>
                    <template v-else>
                        No item selected
                    </template>
                </div>
            </div>

        </div>
        <div>
        </div>
    </div>
</template>

<template #footer>
<div v-if="store.working_item"
    class="flex flex-wrap items-center justify-between gap-4">
    <div class="flex items-center gap-2">
        
        <div class="flex items-center gap-2">
            <Button severity="success"
                v-tooltip.bottom="'Yes'"
                @click="onClickDecision('yes')">
                <font-awesome-icon :icon="['fas', 'check']" />
                Yes
            </Button>


            <Button severity="danger"
                v-tooltip.bottom="'No'"
                @click="onClickDecision('no')">
                <font-awesome-icon :icon="['fas', 'times']" />
                No
            </Button>
        </div>
    </div>
    <div>
        <Button severity="secondary"
            v-tooltip.bottom="'Clear the decision'"
            @click="onClickDecision('')">
            <font-awesome-icon :icon="['fas', 'trash-alt']" />
            Clear
        </Button>
    </div>
</div>
</template>

<div class="flex w-full"
    style="height: calc(100svh - 22.5rem); overflow-y: auto;">
    
    <div v-if="store.working_item">
        <div class="mb-2">
            <p class="title">
                Note ID:
                {{ store.working_item?.note_id }}
            </p>
        </div>

        <Fieldset class="w-full p-2">
            <template #legend>
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-align-left"></i>
                    Note Text
                </div>
            </template>
            <div v-if="store.has_working_item_note_text"
                class="w-full"
                v-html="highlightText(store.working_item?.note_text)">
            </div>
            <div v-else>
                No text available.
            </div>
        </Fieldset>
    </div>
</div>
</Panel>
</template>

<style scoped>
.oper-bar {
    height: 3rem;
    padding: 0 0 1rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.note_text {
    font-size: 1.5rem;
    line-height: 1.6rem;
    font-weight: bold;
}
.info {
    margin: 0 0 1rem 0;
    font-style: italic;
}
.journal {
    color: green;
}
.year {
    color: blue;
}
.translation-text {
    border-top: 1px solid #ccc;
    padding: 1rem 0 0 0;
    margin: 1rem 0 0 0;
    font-size: 1.2rem;
}
</style>