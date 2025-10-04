# CustomBadge Component

Custom colored badge component. White text with different background colors.

## Özellikler

- **White text**: Text color is white in all badges
- **Multiple colors**: Special colors for AI providers, statuses and categories
- **Flexible sizes**: sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl sizes
- **Icon support**: Add icon on left or right position
- **Gradient support**: Gradient background for premium and featured badges
- **Hover effects**: Hover animations in all badges

## Usage

```tsx
import { Badge, getProviderBadgeVariant } from "@/components/core-pilot-ui/ui/badge";

// Basic usage
<Badge variant="openai">OpenAI</Badge>

// Provider automatic recognition
<Badge variant={getProviderBadgeVariant("openai/gpt-4")}>
  OpenAI
</Badge>

// Usage with icon
<Badge variant="active" icon={<CheckIcon />}>
  Active
</Badge>

// Different sizes
<CustomBadge variant="premium" size="lg">Premium</CustomBadge>
```

## Variants

### AI Provider Colors
- `openai` - Emerald (green)
- `anthropic` - Orange (turuncu) 
- `google` - Blue (mavi)
- `meta` - Indigo (lacivert)
- `mistral` - Purple (mor)

### Status Colors
- `active` - Green (green)
- `inactive` - Gray (gri)
- `pending` - Yellow (sarı)
- `error` - Red (kırmızı)

### Category Colors
- `premium` - Purple-Pink gradient
- `free` - Teal (teal)
- `beta` - Cyan (cyan)

### Feature Colors
- `featured` - Blue-Indigo gradient
- `new` - Rose (rose)
- `popular` - Amber (amber)

### Neutral Colors
- `default` - Slate (slate)
- `dark` - Gray-800 (gray-800)
- `light` - Gray-500 (gray-500)

## Sizes

- `sm` - Small (px-2 py-0.5 text-xs)
- `md` - Medium (px-2.5 py-1 text-xs) - Default
- `lg` - Large (px-3 py-1.5 text-sm)
- `xl` - Large (px-4 py-2 text-base)
- `2xl` - Very large (px-5 py-2.5 text-lg)
- `3xl` - Very very large (px-6 py-3 text-xl)
- `4xl` - Very very very large (px-7 py-3.5 text-2xl)
- `5xl` - Very very very very large (px-8 py-4 text-3xl)

## Helper Functions

### getProviderBadgeVariant(provider: string)

Provider string from OpenRouter API automatically returns the correct variant.

```tsx
getProviderBadgeVariant("openai/gpt-4") // "openai"
getProviderBadgeVariant("anthropic/claude-3") // "anthropic" 
getProviderBadgeVariant("google/gemini-pro") // "google"
getProviderBadgeVariant("meta/llama-2") // "meta"
getProviderBadgeVariant("mistralai/mixtral") // "mistral"
getProviderBadgeVariant("unknown-provider") // "default"
```

## Examples

### AI Model Provider Badges
	```tsx
{models.map(model => (
  <Badge 
    key={model.id}
    variant={getProviderBadgeVariant(model.provider)}
    size="sm"
  >
    {model.provider}
  </Badge>
))}
```

### Status Badge
```tsx
<Badge variant={user.isActive ? "active" : "inactive"}>
  {user.isActive ? "Active" : "Inactive"}
</Badge>
```

### Value Badge
```tsx
<Badge variant="featured" size="sm">
  {temperature}
</Badge>
```
