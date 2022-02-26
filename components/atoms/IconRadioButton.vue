<template>
  <button
    type="button"
    data-bs-toggle="button"
    :class="[isChecked ? 'checked' : 'unchecked'] + ' btn btn-block'"
  >
    <!-- アイコン -->
    <slot />
    <span class="text" :class="[isChecked ? 'mb-0 checked-text' : 'mb-0 un-checked-text']">
      {{ text }}
    </span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    /**
     * テキスト
     */
    text: {
      type: String,
      default: '',
    },
    /**
     * 選択されているか
     */
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" scoped>
button {
  border: 2px solid var(--primary);
  border-bottom: 5px solid var(--primary);
  background-color: #fefefe;
  margin: 0 10px;
}

button.checked {
  margin-top: 3px;
  border-bottom: 2px solid var(--primary);
  color: var(--primary);
}

button.unchecked {
  border: 2px solid gray;
  border-bottom: 5px solid gray;
  color: gray;
}

button:hover {
  margin-top: 3px;
  border: 2px solid var(--primary);
}

.text {
  display: block;
}

.checked-text {
  color: var(--primary);
  font-weight: bold;
}

.un-checked-text {
  color: #b0bec5;
}
</style>
