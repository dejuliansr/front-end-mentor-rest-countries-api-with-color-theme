<template>
  <div class="min-h-screen">
    <section class="container mx-auto p-6">
      <div class="flex flex-col md:flex-row md:justify-between items-start mb-6">
        <div class="relative w-full md:w-1/2">
          <!-- Input Pencarian -->
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search for a country..."
            class="bg-light-mode-backround dark:bg-dark-mode-element text-light-mode-input dark:text-dark-mode-element-text dark:border-none w-full p-2 pl-10 rounded-md border shadow-sm mb-4 md:mb-0 search-input transition-all duration-300"
          />
          <!-- Icon Search -->
          <span
            class="absolute left-3 top-1/3 transform -translate-y-1/2 dark:hidden">
            <img src="@/assets/icons/search.svg" alt="Search Icon" class="w-5 h-5" />
          </span>
          <span
            class="absolute left-3 top-1/3 transform -translate-y-1/2 hidden dark:inline">
            <img src="@/assets/icons/search-dark.svg" alt="Search Icon" class="w-5 h-5" />
          </span>
        </div>

        <!-- Filter Dropdown -->
        <div class="relative inline-block w-full md:w-1/4 shadow-md">
          <!-- Button to toggle dropdown -->
          <button
            @click="toggleDropdown"
            class="w-full flex items-center justify-between py-3 px-5 text-left bg-light-mode-backround dark:bg-dark-mode-element text-light-mode-input dark:text-dark-mode-element-text rounded-md shadow-sm transition-all duration-300"
            
          >
            {{ selectedRegion || 'Filter by Region' }}
            <div class="transition-transform duration-300" :class="{ 'rotate-180': isDropdownOpen }">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024">
                <path fill="currentColor" d="M831.872 340.864L512 652.672L192.128 340.864a30.59 30.59 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.59 30.59 0 0 0-42.752 0z" />
              </svg>
            </div>

          </button>

          <!-- Dropdown options with fade transition -->
          <Transition name="fade">
            <div
              v-if="isDropdownOpen"
              class="absolute z-10 mt-1 w-full bg-white dark:bg-dark-mode-element rounded-md shadow-lg"
            >
              <div
                v-for="region in regions"
                :key="region"
                @click="selectRegion(region)"
                class="py-3 px-5 cursor-pointer hover:bg-gray-200 dark:hover:bg-[hsl(209,23%,28%)] dark:text-light-mode-backround text-light-mode-text transition-colors duration-200"
              >
                {{ region }}
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Countries Grid -->
      <div v-if="loading" class="text-center dark:text-white transition-all duration-300">Loading...</div>
      <transition-group
        name="country-list"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <div
          v-for="country in filteredCountries"
          :key="country.name"
          class="bg-light-mode-backround dark:bg-dark-mode-element rounded-lg shadow-md overflow-hidden max-w-xs mx-auto cursor-pointer flex flex-col transition-all duration-300"
          @click="$router.push(`/country/${country.name}`)"
        >
          <div class="w-full aspect-w-16 aspect-h-9 overflow-hidden">
            <img
              :src="country.flags.png"
              :alt="`Flag of ${country.name}`"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-6 flex-1 flex flex-col justify-between">
            <h2 class="text-lg font-semibold mb-2 text-light-mode-text dark:text-dark-mode-element-text w-52 sm:w-56 md:w-48 lg:w-[12rem] truncate">
              {{ country.name }}
            </h2>
            <p class="text-light-mode-text dark:text-neutral-300 font-light transition-all duration-300">
              <span class="font-bold">Population:</span> {{ country.population.toLocaleString() }}
            </p>
            <p class="text-light-mode-text dark:text-neutral-300 transition-all duration-300">
              <span class="font-bold">Region:</span> {{ country.region }}
            </p>
            <p class="text-light-mode-text dark:text-neutral-300 transition-all duration-300">
              <span class="font-bold">Capital:</span> {{ country.capital }}
            </p>
          </div>
        </div>
      </transition-group>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCountryStore } from '~/stores/useCountryStore'

const searchQuery = ref<string>('')
const selectedRegion = ref<string>('')

const countryStore = useCountryStore()

const loading = ref(true)

const isDropdownOpen = ref<boolean>(false);
const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const toggleDropdown = () => {
isDropdownOpen.value = !isDropdownOpen.value;
};

const selectRegion = (region: string) => {
  selectedRegion.value = region;
  isDropdownOpen.value = false;
};

onMounted(() => {
  if (countryStore.countries.length === 0) {
    countryStore.fetchCountries().finally(() => loading.value = false)
  } else {
    loading.value = false
  }
})

const filteredCountries = computed(() => {
  return countryStore.countries.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRegion = selectedRegion.value ? country.region === selectedRegion.value : true
    return matchesSearch && matchesRegion
  })
})
</script>

<style scoped>
/* Fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Optional: Custom styles for better appearance */
button:focus {
  outline: none;
}

/* Aspect ratio utility */
.aspect-w-16 {
  aspect-ratio: 16 / 9;
}
.aspect-h-9 {
  aspect-ratio: 16 / 9;
}

/* Animasi masuk */
.country-list-enter-active {
  transition: all 0.3s ease;
}
.country-list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* Animasi keluar */
.country-list-leave-active {
  transition: all 0.3s ease;
}
.country-list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
