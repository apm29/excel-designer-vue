<template>
  <el-select
    v-bind="$attrs"
    :value="communityId"
    @update:modelValue="(value) => emit('update:communityId', value)"
    :disabled="readonly"
  >
    <el-option
      v-for="option of districtStore.communityDict"
      :label="option.name"
      :value="option.id"
    ></el-option>
  </el-select>
</template>

<script setup>
import { useDistrict } from "@/biz/district.js";
import { useSessionStore } from "@/store"
import { onMounted, defineProps, defineEmits, ref, unref, toRefs,computed } from "vue";

const props = defineProps({
  communityId: [String, Number],
  readonlyOnNoPermission: [Boolean],
});
const emit = defineEmits(["update:communityId"]);
const sessionStore = useSessionStore();
const districtStore = useDistrict();
const { communityId,readonlyOnNoPermission } = toRefs(props);
const readonly = computed(() => {
  return unref(readonlyOnNoPermission) && !sessionStore.isSuperAdmin
})
</script>

<style lang="css" scoped></style>
