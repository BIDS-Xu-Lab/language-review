<script setup>
import { ref } from "vue";
import { pubmed } from "../utils/pubmed";
import { useDataStore } from "../DataStore";

const store = useDataStore();

const keyword = ref('');


function isDecided(item) {
    if (item.language_detect == '' || item.language_detect == null || item.language_detect == undefined) {
        return false;
    } else {
        return true;
    }
}

async function onClickItem(item) {
    // set the working item
    store.working_item_idx = store.items.indexOf(item);
    console.log(store.working_item_idx, store.working_item);

    // get data using pubmed
    // let rst = await pubmed.efetch(item.note_id);
    // console.log(rst);
}

const items = ref([
    {
        label: 'By Reviewed Status',
        icon: 'pi pi-sort-alt'
    },
    {
        label: 'By ID (asc)',
        icon: 'pi pi-sort-numeric-down'
    },
    {
        label: 'By ID (desc)',
        icon: 'pi pi-sort-numeric-down-alt'
    }
]);

function isCurrentItem(item) {
    if (store.working_item == null) {
        return false;
    }
    return store.working_item.note_id == item.note_id;
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
                </div>
            </div>

            <IconField v-tooltip="'Filter the list by keyword'">
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="store.filter_keyword"
                    class="w-48"
                    placeholder="Filter by keyword" size="normal" />
            </IconField>
        </div>
        <div>

        </div>
    </div>
</template>

<div class="flex flex-col"
    style="height: calc(100svh - 18.5rem); overflow-y: auto;">
    <div v-for="item, item_idx in store.filterred_items" :key="item.note_id"
        :class="{'current-item': isCurrentItem(item)}"
        @click="onClickItem(item)"
        class="item">
        <div class="left">
            <span v-if="isDecided(item)"
                class="item-icon item-checked">
                <i class="fa-solid fa-circle-check"></i>
            </span>
            <span v-else
                class="item-icon item-unchecked">
                <i class="fa-regular fa-circle-question"></i>
            </span>
            <span class="item-idx">
                <template v-if="store.hasMetadata(item)">
                    <i class="fa-regular fa-file-lines"></i>
                </template>
            </span>
        </div>
        <div class="right">
            <div class="item-brief">
                <div class="item-main">
                    <div class="item-id mr-3">
                        {{ item.note_id }}
                    </div>
                </div>
                <div class="item-info">
                    {{ item.language_detect }}
                </div>
            </div>
            
        </div>
    </div>
</div>

</Panel>
</template>


<style scoped>
.item {
    width: 100%;
    border-bottom: 1px solid #d4d4d4;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.item:hover {
    background-color: #d9d9d9;
}
.item:hover .right {
    display: inline-block;
}
.item .left {
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.item-idx {
    width: 2rem;
    color: #d4d4d4;
    display: inline-block;
    text-align: center;
}
.item-icon {
    width: 20px;
    padding: 0 5px;
    display: inline-block;
}
.item-checked {
    color: green;
}
.item-unchecked {
    
}
.item-brief {
    display: flex;
    flex-direction: column;
}
.item-main {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.item-info {
    font-size: smaller;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    line-height: 0.9rem;
}
.current-item {
    background-color: #7abdf3;
}
.current-item:hover {
    background-color: #acd6f9;
}
.current-item .item-id {
    font-weight: bold;
}
@media (prefers-color-scheme: dark) {
    .item:hover {
        background-color: #494949;
    }
    .current-item {
        background-color: #295070;
    }
    .current-item:hover {
        background-color: #314f67;
    }
}
</style>