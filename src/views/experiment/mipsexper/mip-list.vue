<template>
  <div class="components-container" style="text-align: left">
    <aside>实验情况统计</aside>
    <div class="editor-container">
      <mip-list :wtitle="wtitle" @dohomework="dohomework" />
    </div>
    <div>
      <do-mips
        :missionlist="missionlist"
        @dohomework="dohomework"
        :mission-title="missionTitle"
      ></do-mips>
    </div>
  </div>
</template>

<script>
import MipList from "@/components/MipList";
import { mipsview } from "@/api/mips";
import { mipstitle } from "@/api/mips";

// import { getmipstitle } from "@/api/mips";
// import { fetchwtitle } from "@/api/exercise_s";
// import { getmiplist } from "@/api/mips"
// import { fetchExperiment } from "@/api/exercise_s";
import DoMips from "./domips";
import { mapState } from "vuex";

export default {
  name: "MipListDemo",
  components: { MipList, DoMips },
  data() {
    return {
      show: false,
      missionTitle: "",
      wtitle: [],
      missionlist: [],
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState("user", ["id"]),
  },
  methods: {
     getData() {
      this.listLoading = true;
      mipstitle(  {
        type: 0,
        id: 1,
      }).then((response) => {
      console.log(response.data.items)
        this.wtitle = response.data.items;
        console.log(this.wtitle)
      });
    },
    dohomework(title) {
      console.log("dohomework", title);
      this.missionTitle = title;
      mipsview({}).then((response) => {
        console.log(response)
      var lists = response.data;
        this.missionlist = lists;
      });
      this.show = true;
    },
  },
};
</script>

