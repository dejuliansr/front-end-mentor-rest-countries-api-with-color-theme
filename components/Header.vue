<template>
  <header class="bg-light-mode-backround dark:bg-dark-mode-element p-6 shadow-md transition-all duration-300">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl max-md:text-lg font-semibold font-rubik text-light-mode-text dark:text-dark-mode-element-text transition-all duration-300">Where in the world?</h1>
      <!-- Tombol Dark Mode -->
      <button class="text-sm flex items-center text-light-mode-text dark:text-dark-mode-element-text transition-all duration-300" @click="toggleDarkMode">
        <img :src="enabled ? moonIcon : sunIcon" alt="Mode Icon" class="h-6 w-6 mr-2" />
        {{ enabled ? 'Dark Mode' : 'Light Mode' }}
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
  import sunIcon from '@/assets/icons/sun-icon.svg';
  import moonIcon from '@/assets/icons/moon-icon.svg';

  // State untuk kontrol dark mode
  const enabled = ref(false)

  // Fungsi untuk toggle tema (dark/light)
  const toggleDarkMode = () => {
    enabled.value = !enabled.value
    // Simpan preferensi tema ke localStorage
    localStorage.setItem('theme', enabled.value ? 'dark' : 'light')

    // Terapkan tema ke elemen HTML
    if (enabled.value) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }

  // Cek preferensi tema saat halaman dimuat
  onMounted(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark' || (theme === null && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      enabled.value = true
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      enabled.value = false
      document.documentElement.removeAttribute('data-theme')
    }
  })

  // Gunakan useHead untuk menambahkan skrip pemeriksaan tema
  useHead({
    script: [
      {
        children: `if (localStorage.theme === "dark" || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
          document.documentElement.setAttribute("data-theme", "dark")
        } else {
          document.documentElement.removeAttribute("data-theme")
        }`
      }
    ]
  })

</script>
