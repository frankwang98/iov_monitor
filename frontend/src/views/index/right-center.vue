<script setup lang="ts">
import { ref } from "vue";
import CapsuleChart from "~/components/datav/capsule-chart";
import { currentGET, testGET } from "~/api";

const config = ref({
  showValue: true,
  unit: "",
});
const data = ref([]);
const getData = () => {
  currentGET("rightCenter").then((res) => {
    // console.log("道路环境信息", res);
    if (res.success) {
      data.value = res.data;
    } else {
      window.$message({
        text: res.msg,
        type: "warning",
      });
    }
  });
  // 调用实际数据，用这个方法就好啦
  // testGET("IoTScreen/rightCenter").then((res) => {
  //   if (res.data.success) {
  //     data.value = res.data.data;
  //   } else {
  //     window.$message({ text: res.data.msg, type: 'warning', });
  //   }
  // }).catch((error) => {
  //   window.$message({ text: `Error: ${error.message}`, type: 'error', }); });
};
getData();
</script>

<template>
  <div class="right_bottom">
    <CapsuleChart :config="config" style="width: 100%; height: 260px" :data="data" />
  </div>
</template>

<style scoped lang="scss">
.right_bottom {
  box-sizing: border-box;
  padding: 0 16px;
}
</style>
