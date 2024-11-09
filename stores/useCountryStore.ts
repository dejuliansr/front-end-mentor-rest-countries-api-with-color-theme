import { defineStore } from 'pinia'

// Definisikan tipe untuk data negara
interface Country {
  name: string
  nativeName: string
  population: number
  region: string
  subregion: string
  capital: string
  topLevelDomain: string[]
  currencies: { name: string }[]
  languages: { name: string }[]
  borders: string[]
  flags: {
    png: string
  }
  alpha3Code: string
}

export const useCountryStore = defineStore('country', () => {
  // State
  const countries = ref<Country[]>([])

  // Actions
  const fetchCountries = async () => {
    // Periksa apakah data sudah ada di localStorage
    const storedCountries = localStorage.getItem('countries')
    
    if (storedCountries) {
      countries.value = JSON.parse(storedCountries)
    } else {
      try {
        const response = await fetch('/data.json') // Pastikan data.json ada di folder static atau public
        countries.value = await response.json()

        // Simpan data negara ke localStorage
        localStorage.setItem('countries', JSON.stringify(countries.value))
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }
  }

  return { countries, fetchCountries }
})
