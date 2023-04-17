import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import type { Compiler, Compilation } from 'webpack';
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
export class TailwindCssWebpackPlugin {
  getCompilationHook<R>(compilation: Compilation, name: string) {
    return (compilation.hooks as Record<string, any>)[name] as R;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      /**
      * 兼容旧版本
      */
      const hooksV1 = this.getCompilationHook(compilation, 'htmlWebpackPluginBeforeHtmlProcessing');
      const hooksV2 = this.getCompilationHook(compilation, 'html-webpack-plugin-before-html-processing');

      const alterAssetTagGroupsHook = hooksV1 ?? hooksV2 ?? HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups;

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
