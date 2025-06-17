# Figma → Code Sync Quick‑Reference

## 1. Global Principles

* **Style only:** update layout & styling; do **not** touch business logic.
* **NativeWind only:** replace every `className="…"` with NativeWind utilities (no `StyleSheet.create()`).
* **Pixel‑perfect:** delivered screens must match Figma 1 : 1.
* **Interactive:** every input editable, every button pressable.
* **No new icons:** use only assets provided in the Figma file (store in `assets/figma/` with original names).
* **Respect Figma layout:** never add absolute positioning unless the design does.

---

## 2. Assets

1. Export all images/SVGs from Figma → `assets/figma/`.
2. Display images with:

   ```tsx
   <Image resizeMode="cover" … />
   ```

   Wrap in a properly‑styled parent `View` for rounded corners.
3. Assets file names should be the same as in Figma (assets/...)
4. Do not override assets if already present.

---

## 3. Screen Sync Workflow

1. **Locate screen node** in Figma.
2. Copy its `data-name` (e.g. `Screens/Home`) → file path `app/Screens/Home.tsx`.
3. Create or open that file; register it in `system-preview.tsx` if missing.
4. For each nested node:

   * Match `data-name` to an existing component (`UI/…`).
   * If the component exists, pass new props/images as needed.
   * Otherwise build/extend a component, keeping `data-name` for maintainability.

---

## 4. NativeWind Conversion Cheatsheet

| Figma‑exported Web    | React‑Native            | Common NativeWind classes         |
| --------------------- | ----------------------- | --------------------------------- |
| `div`, `section`      | `View` / `SafeAreaView` | `flex`, `bg-*`, `rounded-*`       |
| `p`, `span`, headings | `Text`                  | `text-*`, `font-*`, `text-center` |
| `img`                 | `Image` / `Svg`         | `w-* h-* object-contain`          |
| Clickable container   | `Pressable`             | `items-center justify-center`     |
| `input`, `textarea`   | `TextInput`             | `flex-1 text-base`                |

### Spacing & Layout

* Flex intent ⇒ `flex flex-row items-center justify-between`.
* Convert Figma gaps:

  * Vertical stack → `space-y-[22px]`
  * Horizontal row → `gap-x-[13px]` (Expo ≥ 50).
* Prefer scale tokens (`px-4`) over bracket sizes unless exact (`px-[17px]`) is required.

### Typography

* `text-[24px]` OK for headlines; otherwise `text-lg`, `text-base`, etc.
* Font weight: e.g. `font-bold`.

### Shadows & Elevation

```tsx
shadow shadow-black/5 android:elevation-1
```

### Positioning & Transforms

```tsx
absolute left-1/2 -translate-x-1/2
```

Use bracket notation for off‑scale transforms: `-translate-y-[1.18px]`.

---

## 5. Common UI Patterns

### Inputs

```tsx
<View className="flex-row items-center bg-gray-50 rounded-xl px-[17px] py-[19px]">
  <PhoneSvg className="w-6 h-6 mr-3" />
  <TextInput className="flex-1 text-base" placeholder="+7 (999) 123-45-67" />
</View>
<Text className="text-sm text-gray-500 text-center mt-2">Helper text</Text>
```

### Buttons

```tsx
<Pressable className="h-[55px] w-[312px] bg-slate-800 rounded-xl flex-row items-center justify-center gap-x-[13px] active:bg-slate-700">
  <Text className="text-base font-bold text-white">Label</Text>
  {/* optional icon here */}
</Pressable>
```

---

## 6. Design‑Token Tips

* Define a shared spacing scale in `tailwind.config.js`.
* Expose frequent paddings/margins as utility aliases for consistency and easy global tweaks.

---

**Follow these condensed rules to keep React‑Native screens perfectly aligned with Figma while remaining clean, maintainable, and fully interactive.**
