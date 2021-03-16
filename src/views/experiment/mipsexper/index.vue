<!-- 作业 -->
<template>
  <div id="wrapper">
    <div id="list">
       <mips-list></mips-list>
    </div>
  </div>
</template>

<script>
import MipsList from "./mip-list";
export default {
  data() {
    return {
      show: false
    };
  },

  components: { MipsList },

  methods: {}
};
</script>
<style lang='scss' scoped>
</style>
