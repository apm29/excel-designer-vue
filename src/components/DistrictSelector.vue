<template>
  <el-select
    v-bind="$attrs"
    :value="districtId"
    @update:modelValue="(value) => emit('update:districtId', value)"
    :disabled="readonly"
  >
    <el-option
      v-for="option of districtStore.districtDict.filter((it) =>
        communityId ? it.communityId === communityId : true
      )"
      :label="option.districtName"
      :value="option.districtId"
    ></el-option>
  </el-select>
</template>

<script setup>
import { useDistrict } from "@/biz/district.js";
import { useSessionStore } from "@/store";
import { onMounted, defineProps, defineEmits, ref, unref, toRefs, computed, watch } from "vue";

const props = defineProps({
  communityId: [String, Number],
  districtId: [String, Number],
  readonlyOnNoPermission: [Boolean],
});
const emit = defineEmits(["update:districtId"]);
const sessionStore = useSessionStore();
const districtStore = useDistrict();
const { communityId, districtId, readonlyOnNoPermission } = toRefs(props);
const readonly = computed(() => {
  return unref(readonlyOnNoPermission) && !sessionStore.isSuperAdmin && !sessionStore.isCommunityAdmin;
});
watch(communityId,()=>{
  emit("update:districtId",null)
})

</script>

<style lang="css" scoped></style>
