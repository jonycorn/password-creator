<template>
  <div
    class="
      flex
      justify-between
      appearance-none
      p-4
      sm:p-2
      shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]
      rounded-md
      sm:shadow-none
    "
    @click="emitChange"
  >
    <label
      class="text-gray-400 transition-all duration-500 pointer-events-none"
      :class="{ 'text-black dark:text-white': curState }"
      :for="checkType"
    >
      {{ declareName }}</label
    >
    <input v-model="curState" :id="checkType" type="checkbox" />
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
      this.$emit("drip", {
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
