/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./pages/**/*.{js,ts,jsx,tsx}",
		"./component/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
		extend: {
			colors: {
				clifford: "rgba(106, 109, 122, 0.21)",
			},
		},
	},
  plugins: [],
}