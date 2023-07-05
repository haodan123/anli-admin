<template>
  <div>
    <button ref="trigger" @click="togglePopover">Toggle Popover</button>
    <transition name="popover-fade">
      <div v-show="isOpen" ref="popover" class="popover" :class="popoverClass" :style="popoverStyle">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
  import {
    ref,
    watch,
    onMounted,
    onUnmounted,
    getCurrentInstance
  } from 'vue';
  const props = defineProps({
    placement: {
      type: String,
      default: 'bottom',
      validator: (value) => ['top', 'right', 'bottom', 'left'].includes(value),
    },
  })


  const instance = getCurrentInstance();
  const trigger = ref(null);
  const popover = ref(null);
  const isOpen = ref(false);
  let clickListener = null;

  const togglePopover = () => {
    isOpen.value = !isOpen.value;
  };

  const handleClickOutside = (event) => {
    if (
      isOpen.value &&
      event.target !== trigger.value &&
      !trigger.value.contains(event.target) &&
      event.target !== popover.value &&
      !popover.value.contains(event.target)
    ) {
      isOpen.value = false;
    }
  };

  watch(isOpen, (newValue) => {
    if (newValue) {
      clickListener = (event) => handleClickOutside(event);
      document.addEventListener('click', clickListener);
    } else {
      document.removeEventListener('click', clickListener);
      clickListener = null;
    }
  });

  onUnmounted(() => {
    if (clickListener) {
      document.removeEventListener('click', clickListener);
    }
  });

  const popoverClass = ref('');
  const popoverStyle = ref({});

  watch(
    () => [props.placement, isOpen.value],
    ([placement]) => {
      setPopoverClass(placement);
      setPopoverStyle(placement);
    }, {
      // immediate: true
    }
  );

  const setPopoverClass = (placement) => {
    popoverClass.value = `popover popover-${placement}`;
  };

  const setPopoverStyle = (placement) => {
    const triggerElement = trigger.value;
    const popoverElement = popover.value;
    // console.log(popover.value);

    const triggerRect = triggerElement.getBoundingClientRect();
    const popoverRect = popoverElement.getBoundingClientRect();

    const {
      top,
      left,
      width,
      height
    } = triggerRect;

    let popoverTop, popoverLeft;
    // console.log(popoverRect,triggerRect);
    switch (placement) {
      case 'top':
        popoverTop = top - popoverRect.height;
        popoverLeft = left + width / 2 - popoverRect.width / 2;
        break;
      case 'right':
        popoverTop = top + height / 2 - popoverRect.height / 2;
        popoverLeft = left + width;
        break;
      case 'bottom':
        popoverTop = top + height;
        popoverLeft = left + width / 2 - popoverRect.width / 2;
        break;
      case 'left':
        popoverTop = top + height / 2 - popoverRect.height / 2;
        popoverLeft = left - popoverRect.width;
        break;
    }
// console.log(popoverTop,popoverLeft);
    popoverStyle.value = {
      top: `${popoverTop}px`,
      left: `${popoverLeft}px`,
    };
  };

  onMounted(() => {
    // console.log(popover.value.getBoundingClientRect());
    console.log(popover.value);
    // trigger.value = instance.refs.trigger;
    // popover.value = instance.refs.popover;
  });
</script>

<style scoped>
  .popover {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    min-height: 30px;
    min-width: 70px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  /* Customize the popover placement styles */
  .popover-top {
    transform-origin: bottom center;
  }

  .popover-right {
    transform-origin: center left;
  }

  .popover-bottom {
    transform-origin: top center;
  }

  .popover-left {
    transform-origin: center right;
  }

  /* Add a fade animation to the popover */
  .popover-fade-enter-active,
  .popover-fade-leave-active {
    transition: opacity 0.3s;
  }

  .popover-fade-enter,
  .popover-fade-leave-to {
    opacity: 0;
  }
</style>