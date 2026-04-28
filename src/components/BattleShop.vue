<template>
  <div>
    <div class="wrapper">

    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  user-select: none;
  touch-action: none;
  position: relative;
  padding: 20px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: #000a;
  }

  &:after {
    position: absolute;
    top: -32px;
    left: -32px;
    right: -32px;
    bottom: -32px;
    content: '';
    border-image: url(/ui/metal-frame.png) 128 / 128px round;
  }
}
</style>
