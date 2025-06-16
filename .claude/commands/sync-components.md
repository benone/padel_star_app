# Figma to Code Sync Guide
Use this guide to sync Figma designs with the project codebase.

## Common rules
- Only use Nativewind CSS.
- Do not modify logic. Only update styling and layout.
- Download all assets from figma into assets/figma folder.
- For all nodes copy data-name from Figma. It will help in future code maintenance.
- Use <Image> components with resizeMode="cover" instead of background images for better corner handling. Don't forget parent View styling.
- All designs should be 100% the same as in figma.
- Make all inputs editable.
- Make all buttons clickable
- DO NOT import/add new icon packages, all the assets should be in the Figma payload
- do NOT use or create placeholders if a localhost source is provided

---
## Component(s) Sync
Sync styles from Figma components to existing code.
Components node link: https://www.figma.com/design/9vuvtQ18wNi39MxS8dHQW7/PadelStar?node-id=18-67&t=furr1rxTv2V8L0dg-11


### Steps:
1. For each component:
   - Get its `data-name` (e.g. `UI/Home/Banner`).
   - Match it to the code file path (`components/UI/Home/Banner.tsx`).
2. Update component code. If component is exist modify only styling. Save the logic.
3. If figma component has variables like {{text}} you should extract them as props.

After update component you should search for data-name="UI/*" across the screens and replace nodes with component.

