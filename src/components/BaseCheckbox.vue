<template>
  <div
    class="
      flex
      justify-between
      items-center
      appearance-none
      p-4
      sm:p-2
      shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]
      dark:shadow-[0_0_10px_2px_rgba(255,2555,255,0.05)]
      sm:dark:shadow-none
      rounded-md
      sm:shadow-none
      transition-all
      duration-500
    "
    @click="emitChange"
    :class="{
      'text-black dark:text-white bg-gray-300 sm:bg-transparent font-bold dark:bg-[#374358] sm:dark:bg-transparent':
        curState,
      'text-gray-400  font-semibold': !curState,
    }"
  >
    <label class="pointer-events-none select-none" :for="checkType">
      {{ declareName }}</label
    >
    <input
      v-model="curState"
      :id="checkType"
      type="checkbox"
      class="hidden sm:block"
    />
  </div>
</template>

<script>
export default {
  props: ["checkType", "checkName", "checkState"],

  data() {
    return {
      checkNames: {
        smallChars: "Characters",
        capChars: "Capital Characters",
        numbers: "Numbers",
        symbols: "Symbols",
      },
      curState: this.checkState,
    };
  },
  methods: {
    emitChange(e) {
      this.curState = !this.curState;
      this.$emit("stateChange", {
        state: this.curState,
        el: e,
        elName: this.checkName,
      });
    },
  },
  computed: {
    declareName() {
      const key = Object.keys(this.checkNames).find(
        (v) => v === this.checkType
      );
      return this.checkNames[key];
    },
  },
};
</script>

<style scoped>
/* .check-gradient {
  background: linear-gradient(to right, red 50%, blue 50%);
  background-size: 200%;
  background-position: right;
}
.uncheck-gradient {
  background: linear-gradient(to right, red 50%, blue 50%);
  background-size: 200%;
  background-position: left;
} */
</style>
