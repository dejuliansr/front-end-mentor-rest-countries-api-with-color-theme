<template>
  <div class="bg-light-mode-backround dark:bg-dark-mode-Background min-h-screen transition-all duration-300">
    <section class="container mx-auto px-4 py-8 min-h-screen">
      <!-- Tombol Back -->
      <button
        @click="$router.back()"
        class="flex items-center space-x-2 bg-white dark:bg-dark-mode-element border hover:bg-gray-200 dark:hover:bg-[hsl(209,23%,28%)] border-gray-300 dark:border-none rounded-md px-4 py-2 shadow-md mb-8 transition-all duration-300"
      >
        <img
          src="@/assets/icons/arrow-left-dark.svg"
          alt="Arrow Left Icon"
          class="w-5 h-5 dark:hidden"
        />
        <img
          src="@/assets/icons/arrow-left-light.svg"
          alt="Arrow Left Icon Dark"
          class="w-5 h-5 hidden dark:inline"
        />
        <span class="dark:text-neutral-300">Back</span>
      </button>

      <!-- Layout Gambar dan Detail Negara -->
      <div class="flex flex-col md:flex-row md:space-x-16 justify-center items-center">
        <!-- Gambar Bendera -->
        <img
          :src="country?.flags.png"
          :alt="`Flag of ${country?.name}`"
          class="w-full md:w-96 h-48 md:h-64 object-cover rounded-lg shadow-lg mb-6 md:mb-0"
        />

        <!-- Detail Negara -->
        <div class="md:w-1/2">
          <h1 class="text-3xl font-bold mb-6 dark:text-white">{{ country?.name }}</h1>

          <div class="flex flex-col md:flex-row gap-10 mb-8 dark:text-neutral-300">
            <!-- Kolom Kiri -->
            <div>
              <p><strong>Native Name:</strong> {{ country?.nativeName }}</p>
              <p><strong>Population:</strong> {{ country?.population.toLocaleString() }}</p>
              <p><strong>Region:</strong> {{ country?.region }}</p>
              <p><strong>Sub Region:</strong> {{ country?.subregion }}</p>
              <p><strong>Capital:</strong> {{ country?.capital }}</p>
            </div>
            <!-- Kolom Kanan -->
            <div>
              <p><strong>Top Level Domain:</strong> {{ country?.topLevelDomain[0] }}</p>
              <p><strong>Currencies:</strong> {{ country?.currencies.map(currency => currency.name).join(', ') }}</p>
              <p><strong>Languages:</strong> {{ country?.languages.map(language => language.name).join(', ') }}</p>
            </div>
          </div>

          <!-- Border Countries -->
          <div class="flex flex-wrap items-center gap-2 dark:text-white">
            <strong>Border Countries:</strong>
            <router-link
              v-for="border in country?.borders"
              :key="border"
              :to="`/country/${getCountryNameByCode(border).name}`"
              class="px-3 py-1 bg-gray-200 dark:bg-dark-mode-element rounded-md text-sm"
            >
              {{ getCountryNameByCode(border).name }}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useCountryStore } from '~/stores/useCountryStore'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const countryStore = useCountryStore()
const route = useRoute()

const country = ref<Country | null>(null)

onMounted(() => {
  if (!countryStore.countries.length) {
    countryStore.fetchCountries()
  }
  country.value = countryStore.countries.find(c => c.name === route.params.name) || null
})

// Function to get country name from code (for borders)
function getCountryNameByCode(code) {
  const borderCountry = countryStore.countries.find(c => c.alpha3Code === code)
  return borderCountry ? borderCountry : { name: code }
}
</script>
