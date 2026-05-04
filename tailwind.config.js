module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ['var(--font-tajawal)', 'sans-serif'],
        cairo: ['var(--font-cairo)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
