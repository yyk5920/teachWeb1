<template>
  <div class="mipList">
    <div :style="{width:width1}" class="mipList-list">
      <div class="dragArea">
        <div v-for="element in wtitle" :key="element.id" class="list-complete-item">
          <div class="list-complete-item-handle">{{ element.id }}： {{ element.title }}</div>
          <div style="position:absolute;right:0px;">
            <span style="float: right;margin-top: -20px;margin-right:5px;" @click="detail(element)">
              <i style="color:#ff4949" class="el-icon-edit-outline" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MipList",
  ddd: false,
  props: {
    wtitle: {
      type: Array,
      default() {
        return [];
      }
    },
    width1: {
      type: String,
      default: "30%"
    },
  },
  methods: {
    detail(ele) {
      this.$emit("dohomework", ele.title);
      console.log(ele)
      console.log("点击跳转");
    }
  }
};
</script>

<style lang="scss" scoped>
.mipList {
  background: #fff;
  padding-bottom: 40px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .mipList-list {
    float: left;
    padding-bottom: 30px;
    &:first-of-type {
      margin-right: 2%;
    }
    .dragArea {
      margin-top: 15px;
      min-height: 50px;
      padding-bottom: 30px;
    }
  }
}

.list-complete-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 5px 12px;
  margin-top: 4px;
  border: 1px solid #bfcbd9;
  transition: all 1s;
}
</style>
