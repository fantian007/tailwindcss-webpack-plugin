import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import type { Compiler } from 'webpack';
// @ts-ignore 无类型文件
import safeRequire from 'safe-require';

const HtmlWebpackPlugin = safeRequire('html-webpack-plugin');

// 插件名
const PLUGIN_NAME = 'TailwindCss';
// 临时文件名
const tempCssFileName = '.tailwindcss.css';

/**
 * 独立编译 tailwindcss
 */
class TailwindCssWebpackPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      const alterAssetTagGroupsHook =
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups;

      try {
        execSync(`npx tailwindcss -o ${tempCssFileName} --minify`);

        const styleSource = readFileSync(tempCssFileName, 'utf-8');

        alterAssetTagGroupsHook.tap(PLUGIN_NAME, (data: any) => {
          const styleTag = HtmlWebpackPlugin.createHtmlTagObject(
            'style',
            undefined,
            styleSource,
          );

          data.bodyTags.unshift(styleTag);
        });
      } catch (error) {
        console.error('tailwindcss 编译出错，请排查');

        throw error;
      } finally {
        execSync(`rm -f ${tempCssFileName}`);
      }
    });
  }
}

export default TailwindCssWebpackPlugin;
