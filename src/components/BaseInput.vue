<template>
    <div class="input-container">
      <input
        v-if="!numeric"
        v-model="inputValue"
        v-mask="mask"
        type="text"
        class="input"
        :class="[`input--size-${size}`, { 'read-only': readOnly }]"
        :placeholder="placeholder"
        :disabled="readOnly"
        @input.prevent="onTextChange"
      />
  
      <input
        v-if="numeric"
        v-model="inputValue"
        v-mask="mask"
        type="number"
        class="input input-numeric"
        :class="[`input--size-${size}`, { 'read-only': readOnly }]"
        :placeholder="placeholder"
        :disabled="readOnly"
        :max="max"
        :min="min"
        :step="step"
        @change="onTextChange"
        @input="onTextChange"
      />
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'BaseInput',

    props: {
      size: {
        type: String,
        default: 'm',
      },
  
      readOnly: {
        type: Boolean,
        default: false,
      },
  
      search: {
        type: Boolean,
        default: false,
      },
      mask: {
        type: String,
        default: '',
      },
  
      placeholder: {
        type: String,
        default: '',
      },
  
      text: {
        type: [String, Number],
        default: '',
      },
  
      numeric: {
        type: Boolean,
        default: false,
      },
  
      max: {
        type: Number,
        default: null,
      },
  
      min: {
        type: Number,
        default: null,
      },
  
      step: {
        type: Number,
        default: 0.1,
      },
    },
  
    data() {
      return {
        inputValue: '',
      }
    },
  
    watch: {
      text: {
        immediate: true,
        handler(newVal) {
          this.inputValue = newVal || ''
        },
      },
    },
  
    methods: {
      onTextChange() {
        if (!this.readOnly && !this.numeric) {
          this.$emit('input-change', this.inputValue)
        }
        if (this.numeric) {
          if (Number(this.inputValue) < this.min && this.min) {
            this.inputValue = this.min
          }
          if (
            this.inputValue >= this.max &&
            this.max
          ) {
            this.inputValue = this.max
            this.$emit('input-change', this.inputValue.toString())
          }
          if (this.step >= 1 && Number(this.inputValue) % this.step !== 0) {
            this.inputValue = Math.floor(Number(this.inputValue))
          } else {
            this.$emit('input-change', this.inputValue.toString())
          }
        }
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .input-container {
    position: relative;
    width: 100%;
  }
  
  .input {
    width: 100%;
    border-radius: 10px;
    border: 1px solid rgba(88, 86, 91, 0.2);
    background: $white-color;
    color: $body-text;
    padding-left: 12px;
    transition: $default-transition;
  
    &--size {
      &-m {
        height: 44px;
      }
  
      &-s {
        height: 32px;
      }
    }
  
    &::placeholder {
      color: $placeholder-text;
    }
  
    &:focus,
    &:hover {
      border: 1px solid $primary-color;
      background: #fff;
      box-shadow: 0px 2px 4px 0px $box-shadow-color;
    }
  
    &:focus-visible {
      border: 1px solid $primary-color;
      background: #fff;
      box-shadow: 0px 2px 4px 0px $box-shadow-color;
    }
  
    &.read-only {
      border: 1px solid rgba(88, 86, 91, 0.2);
      background: rgba(75, 70, 92, 0.08);
      color: $placeholder-text;
      cursor: not-allowed;
  
      &:focus,
      &:hover {
        border: 1px solid rgba(88, 86, 91, 0.2);
        background: rgba(75, 70, 92, 0.08);
        box-shadow: none;
        color: $placeholder-text;
      }
    }
  }
  
  .input-numeric {
    padding-right: 10px;
  }

  </style>
  