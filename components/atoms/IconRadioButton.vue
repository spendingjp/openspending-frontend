<template>
  <button
    type="button"
    data-bs-toggle="button"
    :class="[isChecked ? 'checked' : 'unchecked'] + ' btn btn-block'"
  >
    <!-- アイコン -->
    <slot />
    <p :class="[isChecked ? 'mb-0 checked-text' : 'mb-0 un-checked-text']">
      {{ text }}
    </p>
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
  border: 2px solid $primary;
  border-bottom: 5px solid $primary;
  background-color: #fefefe;
  margin: 0 10px;
}

button.checked {
  margin-top: 3px;
  border-bottom: 2px solid $primary;
  color: $primary;
}

button.unchecked {
  border: 2px solid gray;
  border-bottom: 5px solid gray;
  color: gray;
}

button:hover {
  margin-top: 3px;
  border: 2px solid $primary;
  border-bottom: 2px solid $primary;
}

.checked-text {
  color: $primary;
  font-weight: bold;
}

.un-checked-text {
  color: #b0bec5;
}
</style>