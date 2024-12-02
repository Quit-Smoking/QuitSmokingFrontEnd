import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/store": {
        target: "http://15.164.231.201:8080", // 백엔드 서버 주소
        changeOrigin: true, // Origin 헤더 변경
        rewrite: (path) => path.replace(/^\/store/, "/store"), // 경로 재작성
      },

    },
  },
});
