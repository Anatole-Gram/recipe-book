module.exports = {
  presets: [
    '@babel/preset-env', // для поддержки современных фич JS
    ['@babel/preset-react', { runtime: 'automatic' }], // поддержка JSX (без импорта React)
    '@babel/preset-typescript', // поддержка TS
  ],
};