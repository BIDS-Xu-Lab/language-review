<script setup>
import { ref } from "vue";
import { pubmed } from "../utils/pubmed";
import { useDataStore } from "../DataStore";
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const store = useDataStore();


function isDecided(item) {
    if (item.language_detect == '' || item.language_detect == null || item.language_detect == undefined) {
        return false;
    } else {
        return true;
    }
}

async function onClickItem(item) {
    console.log('* click item:', item);
}

function summarizeNote(note_text) {
    let _note_text = note_text;
    if (_note_text.length > 50) {
        _note_text = _note_text.substring(0, 50) + '...';
    }
    return _note_text;
}
</script>


<template>
<Panel class="w-1/3 h-full mr-2">
<template #header>
    <div class="w-full flex justify-between">
        <div class="flex items-center gap-2">
            <div class="flex-col">
                <div class="text-lg font-bold">
                    <font-awesome-icon :icon="['far', 'file']" />
                    Items
                </div>
                <div class="panel-subtitle text-sm">
                    <i class="fa fa-list"></i>
                    {{ store.items.length }} items

                    <template v-if="store.items.length > 0">
                        (
                        Yes
                        <b>
                            {{ store.countItemsLanguageDetect('yes') }} 
                        </b>
                        | 
                        No
                        <b>
                            {{ store.countItemsLanguageDetect('no') }}
                        </b>
                        |
                        NA
                        <b>
                            {{ store.countItemsLanguageDetect(null) }}
                        </b>
                        )
                    </template>
                </div>
            </div>

            
        </div>
        <div>
            <IconField v-tooltip="'Filter the list by keyword'">
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" 
                    class="w-64"
                    placeholder="Filter by keyword" size="normal" />
            </IconField>
        </div>
    </div>
</template>

<div class="flex flex-col"
    style="height: calc(100svh - 18.5rem); overflow-y: auto;">

    <DataTable tableStyle="width: 100%;"
        size="small"
        v-model:selection="store.working_item"
        v-model:filters="filters"
        :value="store.items" 
        :rows="10"
        selectionMode="single" 
        scrollable
        :scrollHeight="'calc(100svh - 22.6rem)'"
        :globalFilterFields="['note_id', 'language_detect']"
        dataKey="note_id"
        @row-select="onClickItem"
        paginator>
        <Column header="ID" sortable field="note_id">
            <template #body="slotProps">
                <div class="flex flex-col">
                    <div>
                        {{ slotProps.data.note_id }}
                    </div>
                    <div>
                        {{ summarizeNote(slotProps.data.note_text) }}
                    </div>
                </div>
            </template>
        </Column>
        <Column header="Language" sortable field="language_detect">
            <template #body="slotProps">
                <span v-if="slotProps.data.language_detect == 'yes'">
                    <Tag severity="success">
                        <font-awesome-icon :icon="['fas', 'check']" />
                        {{ slotProps.data.language_detect }}
                    </Tag>
                </span>
                <span v-else-if="slotProps.data.language_detect == 'no'">
                    <Tag severity="danger">
                        <font-awesome-icon :icon="['fas', 'times']" />
                        {{ slotProps.data.language_detect }}
                    </Tag>
                </span>
                <span v-else>
                    <font-awesome-icon :icon="['far', 'question']" />
                    {{ slotProps.data.language_detect }}
                </span>
            </template>
        </Column>
    </DataTable>

</div>

</Panel>
</template>


<style scoped>
</style>