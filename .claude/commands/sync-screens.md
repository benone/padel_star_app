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

## Screen Sync
Recreate screens using components from Figma and existing code.

### Steps:
1. Open the screen node in Figma.
2. Get the screen’s `data-name` (e.g. `Screens/Home`) → maps to `app/Screens/Home.tsx`.
3. Find or create the corresponding file.

### Use Components:
Check every node with data-name and find corresponding component (UI/..).
- Update component if it has another data / images.
- Add props/variables to the component.
- Insert component with the correct values.
Update the screen file to reflect the full Figma layout using components.
