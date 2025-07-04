# CLAUDE.md

Simple guide for Claude Code when working with this React Native app.

## What This Is
- Expo React Native app (SDK 53, React Native 0.79.3)
- Uses TypeScript
- Has light/dark themes
- Works on iOS, Android, and Web

## Commands You Need
```bash
npm install        # Install everything
npm start         # Start development
npm run ios       # iOS simulator
npm run android   # Android emulator
npm run web       # Web browser
npm run codegen    # Generate GraphQL types
npm run codegen:watch # Auto-generate on changes
```

## File Structure
```
/app              # All your screens (Expo Router handles navigation)
/components       # Reusable UI pieces
/constants        # Colors and settings
/hooks            # Custom React hooks
/assets           # Images, fonts, icons
/src              # Source code
  /apollo         # Apollo Client setup
  /generated      # Auto-generated GraphQL types
  /graphql        # GraphQL queries and mutations
/tmp              # Temporary files, including screenshots
```

## Key Files
- `app/_layout.tsx` - Main app wrapper
- `app/(tabs)/` - Tab screens (home, explore)
- `constants/Colors.ts` - Theme colors
- `hooks/useThemeColor.ts` - For dark/light mode

## Rules
1. **Always use TypeScript** - no `any` types
2. **Use the theme system** - don't hardcode colors
3. **Follow file-based routing** - put screens in `/app`
4. **Use Tailwind for CSS** (needs to be set up)
5. **Create reusable components** in `/components`
6. **Use @ notation for all imports**
7. **Save all screenshots into project tmp folder**

## Adding New Stuff
- **New screen**: Add file in `/app` directory
- **New component**: Add to `/components`
- **New colors**: Update `constants/Colors.ts`
- **Platform-specific**: Create `.ios.tsx` or `.android.tsx` files

## Important Notes
- Deep linking scheme: `padelstarapp`
- New React Native architecture enabled
- Strict TypeScript mode
- No testing framework yet (add Jest if needed)

## SVG Generation
- Generate SVG using react-native-svg library
- Install with: `npm install react-native-svg`
- Import components like Svg, Path, etc. from 'react-native-svg'

## GraphQL Setup
- API endpoint: https://api.padelstarclub.ru/graphql
- Run `npm run codegen` to generate types from the schema
- Create queries in `/src/graphql/*.graphql` files
- Use generated hooks from `@/src/generated/graphql`
- Apollo Client is configured in `/src/apollo/client.ts`
- Wrap your app with ApolloProvider from `/src/apollo/ApolloProvider.tsx`