<template>
  <div class="h-24rem relative">
    <div id="map-page-container" class="absolute top-0 left-0 w-full h-full"></div>
    <div class="absolute top-2 left-2" v-if="searchMode">
      <el-input
        v-model="searchKeyword"
        placeholder="输入位置查询"
        @input="handleSearch"
        @blur="handleBlur"
      ></el-input>
      <div class="max-h-20rem overflow-auto">
        <div
          v-for="tip of tips"
          class="bg-white shadow border-gray-300 border-b px-2 py-3 cursor-pointer"
          @click="handleSelectTip(tip)"
        >
          <el-icon class="mr-3"><Location /></el-icon>
          <span class="mr-3">{{ tip.name }}</span>
          <span class="text-sm text-gray-400">{{ tip.district }}</span>
        </div>
      </div>
    </div>
    <div v-else class="absolute top-2 left-2">
      <el-button type="primary" class="w-full" @click="handleClearSearch">
        清空搜索结果
        <el-icon class="el-icon--right"><Close /></el-icon>
      </el-button>
      <div class="max-h-20rem max-w-18rem overflow-auto">
        <div
          v-for="(point, index) of points"
          class="bg-white shadow border-gray-300 border-b px-2 py-3 cursor-pointer"
          @click="handleSelectPoint(point)"
        >
          <span class="mr-3">{{ index + 1 }}.</span>
          <span class="mr-3">{{ point.name }}</span>
          <span class="text-sm text-gray-400">{{ point.address }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-if="selectedAddress" class="mr-2 flex items-center">
    <span class="mr-3"> {{ selectedAddress }} {{ selectedPoint }}</span>
    <el-button type="primary" @click="handleConfirm">
      确认选择
      <el-icon class="el-icon--right"><Location /></el-icon>
    </el-button>
  </div>
</template>

<script setup>
import { ref, unref, onMounted, defineProps } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { Location, Close } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useDebounceFn } from "@vueuse/core";

const props = defineProps({
  address: String,
  point: Array,
});

const emit = defineEmits(["update:address", "update:point","complete"]);

let map = null;
let autoComplete = null;
let placeSearch = null;
onMounted(async () => {
  await AMapLoader.load({
    key: "e0815482c2489f03f0cad31c5e50f012", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.AutoComplete", "AMap.PlaceSearch"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  });
  map = new AMap.Map("map-page-container", {
    zoom: 12, //级别
    center: [120.246863, 29.708692], //中心点坐标
  });

  //搜索
  // 实例化AutoComplete
  autoComplete = new AMap.AutoComplete({
    //city 限定城市，默认全国
    city: "诸暨",
    citylimit: true,
  });
  placeSearch = new AMap.PlaceSearch({
    //设置PlaceSearch属性
    city: "诸暨", //城市
    type: "", //数据类别
    pageSize: 10, //每页结果数,默认10
    pageIndex: 1, //请求页码，默认1
    extensions: "base", //返回信息详略，默认为base（基本信息）
  });
});

const searchKeyword = ref(null);
const searchMode = ref(true);
const tips = ref([]);
const handleSearch = useDebounceFn(() => {
  if (!unref(searchKeyword)) {
    tips.value = [];
  }
  // 根据关键字进行搜索
  autoComplete.search(unref(searchKeyword), function (status, result) {
    // 搜索成功时，result即是对应的匹配数据
    console.log(status, result);
    tips.value = result?.tips ?? [];
  });
});
const handleBlur = function () {
  if (!unref(searchKeyword)) {
    tips.value = [];
  }
};

const points = ref([]);
const handleSelectTip = useDebounceFn((tip) => {
  placeSearch.search(tip.name, function (status, result) {
    console.log(status, result);
    points.value = result?.poiList?.pois ?? [];
    if (unref(points).length) {
      searchMode.value = false;
      searchKeyword.value = null;
      tips.value = [];

      unref(points).forEach((point) => {
        // 创建一个 Marker 实例：
        const marker = new AMap.Marker({
          position: new AMap.LngLat(point.location.lng, point.location.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        });
        point.marker = marker;
        // 将创建的点标记添加到已有的地图实例：
        map.add(marker);
        marker.on("click", function (ev) {
          const icon = new AMap.Icon({
            size: new AMap.Size(25, 34),
            image: "https://ditu.amap.com/assets/img/poi-marker.png",
            imageSize: new AMap.Size(437, 267),
            imageOffset: new AMap.Pixel(-359, -3),
          });
          const redMarker = new AMap.Marker({
            position: new AMap.LngLat(point.location.lng, point.location.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            icon: icon,
            // anchor:"bottom-center",
            offset: new AMap.Pixel(-13, -30),
          });
          // 将创建的点标记添加到已有的地图实例：
          map.add(redMarker);
          if (unref(selectedMarker)) {
            map.remove(unref(selectedMarker));
          }
          selectedMarker.value = redMarker;
          selectedAddress.value = point.name;
          selectedPoint.value = [point.location.lng, point.location.lat];
        });
      });
    } else {
      ElMessage({
        type: "error",
        message: "搜索结果为空",
      });
    }
  });
});

const handleClearSearch = function () {
  searchMode.value = true;
  searchKeyword.value = null;
  tips.value = [];
  points.value = [];
};

const selectedAddress = ref(props.address);
const selectedMarker = ref(null);
const selectedPoint = ref(props.point ?? []);

const handleConfirm = function () {
  emit("update:address", unref(selectedAddress));
  emit("update:point", unref(selectedPoint) || []);
  emit("complete")
};
const handleSelectPoint = function (point) {
  const icon = new AMap.Icon({
    size: new AMap.Size(25, 34),
    image: "https://ditu.amap.com/assets/img/poi-marker.png",
    imageSize: new AMap.Size(437, 267),
    imageOffset: new AMap.Pixel(-359, -3),
  });
  const redMarker = new AMap.Marker({
    position: new AMap.LngLat(point.location.lng, point.location.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    icon: icon,
    // anchor:"bottom-center",
    offset: new AMap.Pixel(-13, -30),
  });
  // 将创建的点标记添加到已有的地图实例：
  map.add(redMarker);
  if (unref(selectedMarker)) {
    map.remove(unref(selectedMarker));
  }
  selectedMarker.value = redMarker;
  selectedAddress.value = point.name;
  selectedPoint.value = [point.location.lng, point.location.lat];
};
</script>

<style lang="scss" scoped></style>
