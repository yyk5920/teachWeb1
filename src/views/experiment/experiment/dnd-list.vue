<template>
  <div class="components-container" style="text-align: left">
    <aside>实验情况统计</aside>
    <div class="editor-container">
      <dnd-list :wtitle="wtitle" @dohomework="dohomework" />
    </div>
    <div v-if="show">
      <do-exercise
        :missionlist="missionlist"
        @dohomework="dohomework"
        :mission-title="missionTitle"
      ></do-exercise>
    </div>
  </div>
</template>

<script>
import DndList from "@/components/DndList";
import { fetchwtitle } from "@/api/exercise_s";
import { fetchExperiment } from "@/api/exercise_s";
import DoExercise from "./doexercise";
import { mapState } from "vuex";

export default {
  name: "DndListDemo",
  components: { DndList, DoExercise },
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
      fetchwtitle({
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
      fetchExperiment({
        id: 0, //实验id
        username: this.id,
      }).then((response) => {
        var lists = response.data;
        this.missionlist = lists;
      });
      this.show = true;
    },
  },
};
</script>

