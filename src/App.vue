<template>
  <div
    class="
      flex
      justify-center
      items-center
      w-screen
      h-full
      sm:h-screen
      font-montserrat font-semibold
      dark:bg-[#293241]
      transition-all
      duration-500
    "
  >
    <div
      class="
        bg-white
        sm:bg-gray-50
        dark:bg-[#293241]
        flex flex-col
        justify-between
        sm:rounded-md
        gap-2
        overflow-hidden
        sm:shadow-2xl sm:dark:shadow-[0_0_10px_0.5px_rgba(255,255,255,0.3)]
        transition-all
        duration-500
        w-full
        h-full
        sm:w-fit sm:h-fit
      "
    >
      <h1
        class="
          text-white text-5xl
          bg-burnt-sienna
          sm:p-4
          font-bold
          transition-all
          duration-500
          text-center
          py-12
        "
      >
        Password Generator
      </h1>
      <div class="flex flex-col gap-10 py-5 px-5 sm:p-3 sm:gap-2">
        <div
          class="
            bg-white
            dark:bg-[#374358]
            p-5
            sm:p-1
            rounded-sm
            shadow-lg
            text-gray-600
            transition-all
            duration-500
            text-lg
            xs:text-2xl
            sm:text-base
            flex
            justify-between
            align-center
            overflow-hidden
            break-words
          "
          :class="{
            'text-red-500 border border-red-500': error,
            'text-black dark:text-white': passwordRendered,
            'dark:text-gray-300': !passwordRendered,
          }"
        >
          <h2 class="" ref="genPassword">
            {{ password }}
          </h2>
          <transition v-if="!error" name="copy">
            <button @click="copyToClipboard(password)" v-if="passwordRendered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="
                  h-7
                  w-7
                  active:h-6 active:w-6
                  xs:h-8 xs:w-8 xs:active:h-7 xs:active:w-7
                  sm:h-6 sm:w-6 sm:active:h-5 sm:active:w-5
                  transition-all
                "
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
        </div>
        <div
          class="
            p-2
            flex flex-col
            items-center
            gap-2
            xs:gap-0 xs:flex-row xs:justify-between
            appearance-none
          "
        >
          <label
            class="transition-[color] duration-500 font-semibold"
            :class="{
              'text-black dark:text-white font-bold': numOfChars,
              'text-gray-400': !numOfChars,
            }"
            for="characters"
            >Number of characters</label
          >
          <select
            class="
              font-bold
              dark:bg-[#374358] dark:text-white
              transition-all
              duration-500
              px-10
              py-4
              xs:p-2
              sm:p-1
              text-sm text-center
            "
            v-model="numOfChars"
            name="characters"
            id="characters"
          >
            <option value="">Please choose an option</option>
            <option v-for="option in options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-0 p-1">
          <base-checkbox
            v-for="(state, name) in states"
            :key="state"
            :checkType="name"
            :checkName="name"
            :checkState="state"
            @stateChange="setState"
          ></base-checkbox>
        </div>
        <button
          class="
            w-full
            p-4
            sm:p-2
            rounded-md
            font-semibold
            text-white text-5xl
            sm:text-3xl
            transition
            ease-in-out
            bg-burnt-sienna
            hover:-translate-y-[2px] hover:bg-[#D1644C]
            active:translate-y-[2px]
            duration-300
            mt-6
          "
          @click="createPassword"
        >
          Generate Password
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
      numOfChars: "",

      states: {
        smallChars: false,
        capChars: false,
        numbers: false,
        symbols: false,
      },

      error: false,
      password: "Here will be your password",
      passwordRendered: false,
    };
  },
  computed: {},
  methods: {
    passwordString() {
      const smallChars = Array(26)
        .fill(97)
        .map((x, y) => String.fromCharCode(x + y));
      const capChars = smallChars.map((x) => x.toUpperCase());
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const symbols = ["-", "_", ".", "%", "$", "#", "@", "!", "*"];

      const arr = [];
      if (this.states.smallChars) {
        smallChars.map((x) => arr.push(x));
      }
      if (this.states.capChars) {
        capChars.map((x) => arr.push(x));
      }
      if (this.states.numbers) {
        for (let i = 0; i < 3; i++) {
          numbers.map((x) => arr.push(x));
        }
      }
      if (this.states.symbols) {
        for (let i = 0; i < 3; i++) {
          symbols.map((x) => arr.push(x));
        }
      }

      const finalPassword = [];
      for (let i = 0; i < this.numOfChars; i++) {
        finalPassword.push(arr[Math.floor(Math.random() * arr.length)]);
      }

      return finalPassword.toString().replaceAll(",", "");
    },
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
        console.error("Could not select text in node: Unsupported browser.");
      }
    },
    copyToClipboard(text) {
      const elem = document.createElement("textarea");
      elem.value = text;
      document.body.appendChild(elem);
      elem.select();
      document.execCommand("copy");
      document.body.removeChild(elem);
    },
    setState(payload) {
      this.states[payload.elName] = payload.state;
    },
    createPassword() {
      this.passwordRendered = false;
      this.creationPossible();
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      if (!this.error) {
        this.password = "Generating pasword...";

        this.renderPassword(this.passwordString(), 1000);
      } else {
        this.password =
          "Please choose at least one option and number of characters";
      }
    },
    renderPassword(pass, time) {
      setTimeout(() => {
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
