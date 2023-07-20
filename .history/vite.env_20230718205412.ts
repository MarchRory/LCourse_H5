import { defineConfig, loadEnv } from 'vite';

export default ({ command, mode }) => {
    // 获取环境变量
    const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());
    return defineConfig({
        define: {
            'process.env': env,
        },
    });
};