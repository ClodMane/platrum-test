<template>
    <component
      :is="tag"
      type="button"
      class="btn primary"
      :disabled="isBtnDisabled"
      @click="$emit('click')"
    >
      <span>{{ btnText }}</span>
    </component>
  </template>
  
  <script>
  export default {
    name: "BaseButton",
    props: {
      tag: {
        type: String,
        default: "button",
      },
      btnText: {
        type: String,
        default: "",
      },
      isBtnDisabled: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>
  <style lang="scss">
  
  .btn {
    text-transform: uppercase;
    border: none;
    border-radius: 3px;
    font-size: 13px;
    font-weight: 500;
    transition: $default-transition;
    cursor: pointer;
    display: flex;
    justify-content: center;
    gap: 3px;
    align-items: center;
    width: 100%;
  }
  
  .primary {
    background: $primary-color;
    color: #fff;
    padding: 12px 20px;
  }
  
  .btn:hover {
    box-shadow: $button-shadow-color;
  }
  
  .btn:disabled {
    background: $disabled-color;
    box-shadow: none;
    cursor: not-allowed;
  }
  </style>
  