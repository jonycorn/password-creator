<template>
  <div
    class="
      flex
      justify-center
      items-center
      w-screen
      h-screen
      font-montserrat font-semibold
    "
  >
    <div
      class="
        bg-gray-50
        flex flex-col
        rounded-md
        gap-2
        overflow-hidden
        shadow-lg
      "
    >
      <h1
        class="
          text-white
          dark:text-gray-700
          text-5xl
          bg-gradient-to-r
          from-violet-500
          to-fuchsia-500
          p-5
        "
      >
        Password Generator
      </h1>
      <div class="p-3 flex flex-col gap-2">
        <div
          class="bg-white p-1 rounded-sm shadow-lg text-gray-500 transition-all"
          :class="{ 'text-red-500 border border-red-500': error }"
        >
          <h3 class="flex justify-between overflow-hidden" ref="genPassword">
            {{ password }}
            <transition name="copy">
              <button
                @click="copyToClipboard(password)"
                v-if="passwordRendered"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </button>
            </transition>
          </h3>
        </div>
        <div class="p-2 flex justify-between appearance-none">
          <label
            class="text-gray-400 transition-all"
            :class="{ 'text-black': numOfChars }"
            for="characters"
            >Number of characters</label
          >
          <select v-model="numOfChars" name="characters" id="characters">
            <option value="">Please choose an option</option>
            <option v-for="option in options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="grid grid-cols-2 grid-rows-2 p-1">
          <base-checkbox
            v-for="(state, name) in states"
            :key="state"
            :checkType="name"
            :checkName="name"
            :checkState="state"
            @drip="setState"
          ></base-checkbox>
        </div>
        <button
          class="
            w-full
            p-2
            rounded-sm
            font-semibold
            text-white text-3xl
            transition
            ease-in-out
            bg-fuchsia-500
            hover:-translate-y-[2px] hover:bg-violet-500
            active:translate-y-[2px]
            duration-300
            mt-6
          "
          @click="createPassword"
        >
          Generate nothing
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCheckbox from "./components/BaseCheckbox.vue";
export default {
  components: {
    BaseCheckbox,
  },
  data() {
    return {
      options: Array.from({ length: 20 }, (_, i) => i + 1),
      numOfChars: 10,

      states: {
        smallChars: true,
        capChars: false,
        numbers: false,
        symbols: false,
      },

      error: false,
      password: "Here will be your password",
      passwordRendered: false,
    };
  },
  computed: {
    // changeState(type, value) {
    //   this.states[type] = value;
    // },

    passwordGenerator() {
      return "DRIPAMASGERYWYUGREW";
    },
  },
  methods: {
    creationPossible() {
      if (
        this.numOfChars &&
        (this.states.smallChars ||
          this.states.capChars ||
          this.states.numbers ||
          this.states.symbols)
      ) {
        this.error = false;
      } else {
        this.error = true;
      }
    },
    selectPass() {
      const url = this.$refs.genPassword;

      if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(url);
        range.select();
      } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(url);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        console.warn("Could not select text in node: Unsupported browser.");
      }

      // url.innerHTML = window.location.href;
      // console.log(url.innerHTML);
      // url.select();
      // document.execCommand("copy");
    },
    copyToClipboard(text) {
      const elem = document.createElement("textarea");
      elem.value = text;
      document.body.appendChild(elem);
      elem.select();
      document.execCommand("copy");
      document.body.removeChild(elem);
    },
    setState(e) {
      this.states[e.id] = e.checked;
    },
    createPassword() {
      this.passwordRendered = false;
      this.creationPossible();
      console.log(this.error);

      if (!this.error) {
        this.error = false;
        this.password = "Generating pasword...";

        this.renderPassword("aglabagla", 3000);

        // setInterval(() => {
        //   this.password = this.passwordGenerator;
        //   this.passwordRendered = true;
        //   console.log("why");
        // }, 2000);
      } else {
        this.error = true;
        this.password =
          "Please choose at least one option and number of characters";
      }
    },
    renderPassword(pass, time) {
      setInterval(() => {
        this.password = pass;
        this.passwordRendered = true;
      }, time);
    },
  },
};
</script>

<style scoped>
.copy-enter-active,
.copy-leave-active {
  transition: all 0.3s ease-in-out;
}

.copy-enter-from,
.copy-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.copy-enter-to,
.copy-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
