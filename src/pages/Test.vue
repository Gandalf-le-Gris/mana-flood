<template>
  <div class="d-flex">
    <plane-portal :plane="buildPlane('zendikar')" class="ma-12" />
  </div>
</template>

<script setup lang="ts">
import PlanePortal from '@/components/PlanePortal.vue';
import { buildPlane } from '@/types/planes/planes';
</script>
