<template>
  <div id="app">
    <header>
      <TopHeader></TopHeader>
    </header>

    <main>
      <div class="container mt-3">
        <router-view />
      </div>
    </main>

    <footer class="mt-3 bg-secondary py-3">
      <div class="container">
        <span class="text-white">&copy; Artistas e Álbuns - SPA</span>
      </div>
    </footer>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader";
export default {
  components: {
    TopHeader
  }
};
</script>

<style></style>
