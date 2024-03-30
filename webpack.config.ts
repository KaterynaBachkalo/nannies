import Dotenv from "dotenv-webpack";

const webpackConfig = {
  // Інші налаштування Webpack...
  plugins: [new Dotenv()],
};

export default webpackConfig;
