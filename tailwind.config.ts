import type { Config } from 'tailwindcss'
import { PluginAPI } from 'tailwindcss/types/config'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-100': 'var(--green-100)',
        'green-200': 'var(--green-200)',
        'green-300': 'var(--green-300)',

        'purple-100': 'var(--purple-100)',
        'purple-200': 'var(--purple-200)',

        'gray-100': 'var(--gray-100)',
        'gray-200': 'var(--gray-200)',
        'gray-300': 'var(--gray-300)',
        'gray-400': 'var(--gray-400)',
        'gray-500': 'var(--gray-500)',
        'gray-600': 'var(--gray-600)',
        'gray-700': 'var(--gray-700)',
        'gray-800': 'var(--gray-800)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        /* Estilos gerais da barra de rolagem */
        '.scrollbar-custom': {
          'scrollbar-width': 'thin', // Para navegadores como Firefox
          'scrollbar-color': 'var(--gray-600) var(--gray-700)', // Cor da barra (var(--gray-600) = gray-600, var(--gray-700) = gray-700)
        },
        '.scrollbar-custom::-webkit-scrollbar': {
          width: '6px', // Largura da barra de rolagem no Chrome, Safari e Opera
        },
        '.scrollbar-custom::-webkit-scrollbar-track': {
          background: 'var(--gray-700)', // Fundo da barra de rolagem (gray-700)
        },
        '.scrollbar-custom::-webkit-scrollbar-thumb': {
          background: 'var(--gray-600)', // Cor da barrinha de rolagem (gray-600)
          borderRadius: '9999px', // Deixa a barrinha arredondada
        },
      })
    },
  ],
}
export default config
