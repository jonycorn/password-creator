<template>
  <div class="flex justify-between appearance-none p-1">
    <label
      class="text-gray-400 transition-all"
      :class="{ 'text-black': checkState }"
      :for="checkType"
    >
      {{ declareName }}</label
    >
    <input
      @change="this.$emit('drip', $event.target)"
      v-model="checkState"
      :id="checkType"
      type="checkbox"
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
    };
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
