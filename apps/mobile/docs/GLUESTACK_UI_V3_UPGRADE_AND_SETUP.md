# Gluestack UI v3 Upgrade and Setup - Changes Summary

**Date:** December 2025
**Objective:** Upgrade gluestack-ui from v1 to v3, implement copy-paste component architecture following the same pattern as the web version (shadcn/ui), and configure automated component installation in `src/components/ui` directory

## Identified Problems and Solutions

### 1. Problem: Outdated Gluestack UI Version

**Cause:** Project was using gluestack-ui v1 (`@gluestack-ui/themed@^1.1.73`) which didn't follow the modern copy-paste component architecture

**Impact:** Limited access to new components, outdated APIs, and inability to customize components directly in the codebase

### 2. Problem: Inconsistent Component Architecture

**Cause:** Web version uses shadcn/ui with components in `src/components/ui/`, but mobile version didn't have a similar structure for gluestack-ui components

**Impact:** Inconsistent project structure between web and mobile, making it harder to maintain and understand the codebase

### 3. Problem: Manual Component Installation

**Cause:** No automated way to add gluestack-ui components to the correct directory structure

**Impact:** Developers had to manually specify paths when adding components, leading to potential inconsistencies

## Modified Files

### 1. `package.json` (Dependencies Update)

**Changes:**
```json
// BEFORE
"dependencies": {
  "@gluestack-style/react": "^1.0.57",
  "@gluestack-ui/config": "^1.1.20",
  "@gluestack-ui/themed": "^1.1.73"
}

// AFTER
"dependencies": {
  "@gluestack-style/animation-resolver": "^2.0.0",
  "@gluestack-style/legend-motion-animation-driver": "^2.0.0",
  "@gluestack-style/react": "^2.0.0",
  "@gluestack-ui/config": "^2.0.0",
  "@gluestack-ui/themed": "^2.0.0"
}
```

**New Script Added:**
```json
"scripts": {
  "gluestack:add": "node scripts/add-gluestack-component.js"
}
```

### 2. `src/components/ui/skeleton.tsx` (New Component)

**New File - Skeleton Component Implementation:**
```typescript
import { styled } from '@gluestack-style/react'
import React, { useEffect, useRef } from 'react'
import { Animated, View, ViewProps } from 'react-native'

const StyledRoot = styled(
  Animated.View,
  {
    bg: '$background200',
    borderRadius: '$md',
    overflow: 'hidden',
    variants: {
      variant: {
        rounded: { borderRadius: '$md' },
        sharp: { borderRadius: '$none' },
        circular: { borderRadius: '$full' },
      },
    },
    defaultProps: { variant: 'rounded' },
  },
  { componentName: 'Skeleton' }
)

export const Skeleton = React.forwardRef<
  React.ElementRef<typeof StyledRoot>,
  SkeletonProps
>(({ variant = 'rounded', isLoaded = false, speed = 2, ...props }, ref) => {
  // Animation implementation with Animated API
  // ...
})
```

### 3. `src/components/ui/index.ts` (Barrel Export)

**New File:**
```typescript
export * from './skeleton'
```

### 4. `scripts/add-gluestack-component.js` (Installation Helper)

**New File - Automated Component Installation:**
```javascript
#!/usr/bin/env node

const { execSync } = require('child_process')
const path = require('path')

const componentName = process.argv[2]

if (!componentName) {
  console.error('❌ Erro: Nome do componente não fornecido')
  process.exit(1)
}

const componentsPath = 'src/components/ui'
const projectRoot = path.resolve(__dirname, '..')

execSync(
  `npx gluestack-ui@latest add ${componentName} --path ${componentsPath}`,
  { cwd: projectRoot, stdio: 'inherit' }
)
```

### 5. `gluestack-ui.config.json` (Configuration File)

**New File:**
```json
{
  "componentsPath": "src/components/ui",
  "style": "react-native",
  "framework": "expo"
}
```

### 6. `.gluestackrc.json` (Alternative Config)

**New File:**
```json
{
  "componentsPath": "src/components/ui",
  "style": "react-native"
}
```

### 7. `src/components/Charts/PieChart.tsx` (Import Update)

**Changes:**
```typescript
// BEFORE
import { gluestackUIConfig } from '@gluestack-ui/config'

// AFTER
import { gluestackUIConfig } from '../../../config/gluestack-ui.config'
```

### 8. `src/components/Charts/BarChart.tsx` (Import Update)

**Changes:**
```typescript
// BEFORE
import { gluestackUIConfig } from '@gluestack-ui/config'

// AFTER
import { gluestackUIConfig } from '../../../config/gluestack-ui.config'
```

## Changes Implemented

### 1. Dependency Upgrade to v3
- **Core packages:** Updated all `@gluestack-style/*` and `@gluestack-ui/*` packages to v2.0.0
- **Animation packages:** Added `@gluestack-style/animation-resolver` and `@gluestack-style/legend-motion-animation-driver`
- **Backward compatibility:** Maintained existing component imports from `@gluestack-ui/themed` for basic components

### 2. Copy-Paste Component Architecture
- **UI folder structure:** Created `src/components/ui/` following web version pattern
- **Component ownership:** Components are now part of the codebase, allowing full customization
- **Consistent structure:** Aligned with web version using `src/components/ui/` for third-party UI components

### 3. Automated Component Installation
- **Helper script:** Created `scripts/add-gluestack-component.js` for automated installation
- **NPM script:** Added `gluestack:add` command to package.json
- **Path automation:** Script automatically uses `src/components/ui` as installation path
- **Error handling:** Script validates component name and provides helpful error messages

### 4. Configuration Files
- **gluestack-ui.config.json:** Project-specific configuration for component paths
- **.gluestackrc.json:** Alternative configuration file for CLI tools
- **Documentation:** Created comprehensive setup documentation

### 5. Import Path Standardization
- **Local config:** Updated imports to use local `gluestack-ui.config.ts` instead of package exports
- **Consistent paths:** All components use same import pattern for configuration access

## Benefits and Results

### 1. Modern Component Architecture
- **Copy-paste approach:** Components are now part of the codebase, allowing full customization
- **Version control:** Component changes are tracked in git
- **No vendor lock-in:** Easy to modify or replace components without waiting for library updates

### 2. Consistent Project Structure
- **Web alignment:** Mobile now follows same structure as web version (`src/components/ui/`)
- **Clear separation:** Third-party UI components separated from custom components
- **Better organization:** Easier to find and maintain UI components

### 3. Improved Developer Experience
- **Automated installation:** Single command to add components: `yarn gluestack:add skeleton`
- **Clear documentation:** Comprehensive setup and usage documentation
- **Type safety:** Full TypeScript support maintained
- **Consistent imports:** Standardized import paths using aliases

### 4. Enhanced Customization Capabilities
- **Direct modification:** Components can be modified directly in the codebase
- **Theme integration:** Components use project's gluestack-ui theme configuration
- **Flexible styling:** Easy to customize component styles and behavior

## Usage Examples

### Adding a New Component

```bash
# Using the helper script (recommended)
yarn gluestack:add skeleton

# Direct CLI command
npx gluestack-ui add skeleton --path src/components/ui
```

### Importing Components

```typescript
// From ui folder (copy-paste components)
import { Skeleton, SkeletonText } from '@components/ui/skeleton'

// From @gluestack-ui/themed (basic components)
import { Box, VStack, HStack } from '@gluestack-ui/themed'

// Usage example
export function LoadingScreen() {
  return (
    <VStack gap="$4" p="$4">
      <Skeleton variant="rounded" h="$32" w="$full" />
      <SkeletonText lines={3} h="$4" w="$full" />
    </VStack>
  )
}
```

### Component Structure

```
src/components/
├── ui/                    # Gluestack UI v3 components (copy-paste)
│   ├── skeleton.tsx
│   ├── index.ts
│   └── ...
├── Button.tsx             # Custom components
├── Charts/
└── ...
```

## Testing Considerations

- Verify all existing components still work after v3 upgrade
- Test new Skeleton component renders correctly
- Validate import paths work with TypeScript
- Test automated component installation script
- Ensure theme configuration is properly applied
- Test on both iOS and Android platforms
- Verify animation performance with new animation packages

## Future Improvements

- Migrate more components from `@gluestack-ui/themed` to `src/components/ui/` for better customization
- Create component templates for common patterns
- Add component documentation generator
- Implement component testing utilities
- Consider creating a component library index
- Add component versioning strategy
- Implement component update mechanism

## Project Structure Alignment

### Web Version (shadcn/ui)
```
web/vite-web/src/components/ui/
├── skeleton.tsx
├── button.tsx
└── ...
```

### Mobile Version (gluestack-ui v3)
```
mobile/src/components/ui/
├── skeleton.tsx
├── index.ts
└── ...
```

Both versions now follow the same organizational pattern, making the codebase more consistent and maintainable.

---

**Conclusion:** The upgrade to gluestack-ui v3 and implementation of copy-paste component architecture provides a modern, flexible, and maintainable component system that aligns with the web version's structure. The automated installation script and comprehensive documentation ensure a smooth developer experience when adding new components.


