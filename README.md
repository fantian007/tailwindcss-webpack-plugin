# Introduction
By compiling the tailwind CSS, generating the style and inserting the body independently, you can solve the problem of style overwriting(other library of UI component, like antd & etc.)

# Usage
```typescript
// esm
import { PrettyConsoleWebpackPlugin } from '@sprit/pretty-console-webpack-plugin';
// cjs
const { PrettyConsoleWebpackPlugin } = require('@sprit/pretty-console-webpack-plugin');

// webpack plugins
{
  plugins: [
    new TailwindCssWebpackPlugin()
  ]
}
```

# Effect
Insert the generated compressed file into the body tag