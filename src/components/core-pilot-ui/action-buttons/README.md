# ActionButtons Component

The ActionButtons component provides a standardized way to create common action buttons throughout the application with consistent styling and behavior.

## Components

### `ActionButton`
A single action button with predefined styles for different action types.

### `ActionButtonGroup`
A group of action buttons with consistent spacing.

### Helper Functions
- `createDetailViewActions()` - Creates Back, Edit, Delete buttons for detail views
- `createFormActions()` - Creates Cancel, Save buttons for forms
- `createListActions()` - Creates Refresh, Add buttons for list views

## Available Action Types

- `back` - Navigation back button
- `edit` - Edit action button
- `delete` - Delete action button (red styling)
- `save` - Save action button (primary styling)
- `cancel` - Cancel action button
- `add` - Add new item button (green styling)
- `view` - View details button
- `download` - Download action button
- `upload` - Upload action button
- `refresh` - Refresh/reload button
- `copy` - Copy action button
- `settings` - Settings button
- `more` - More options button

## Usage Examples

### Single Action Button

```tsx
import { ActionButton } from "@/components/core-pilot-ui";

// Basic usage
<ActionButton action="back" onClick={handleBack} />

// With custom label
<ActionButton action="save" onClick={handleSave}>
  Save Changes
</ActionButton>

// With loading state
<ActionButton 
  action="delete" 
  onClick={handleDelete}
  loading={isDeleting}
  disabled={!canDelete}
/>
```

### Action Button Group

```tsx
import { ActionButtonGroup } from "@/components/core-pilot-ui";

<ActionButtonGroup
  actions={[
    { action: "back", onClick: handleBack },
    { action: "edit", onClick: handleEdit },
    { action: "delete", onClick: handleDelete, disabled: isDeleting }
  ]}
/>
```

### Using Helper Functions

#### Detail View Actions
```tsx
import { ActionButtonGroup, createDetailViewActions } from "@/components/core-pilot-ui";

<ActionButtonGroup
  actions={createDetailViewActions(
    handleBack,
    handleEdit,
    handleDelete,
    {
      deleteDisabled: mutation.isPending,
      deleteLoading: mutation.isPending,
    }
  )}
/>
```

#### Form Actions
```tsx
import { ActionButtonGroup, createFormActions } from "@/components/core-pilot-ui";

<ActionButtonGroup
  actions={createFormActions(
    handleSave,
    handleCancel,
    {
      saveDisabled: !isValid,
      saveLoading: isSaving,
    }
  )}
/>
```

#### List Actions
```tsx
import { ActionButtonGroup, createListActions } from "@/components/core-pilot-ui";

<ActionButtonGroup
  actions={createListActions(
    handleAdd,
    handleRefresh,
    {
      refreshLoading: isRefreshing,
    }
  )}
/>
```

## Props

### ActionButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `action` | `ActionButtonType` | - | The type of action button |
| `onClick` | `() => void` | - | Click handler function |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Whether the button is in loading state |
| `children` | `React.ReactNode` | - | Custom label (overrides default) |
| `className` | `string` | - | Additional CSS classes |
| `variant` | `"default" \| "outline" \| "ghost" \| "link"` | `"outline"` | Button variant |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Button size |
| `hideIcon` | `boolean` | `false` | Hide the action icon |
| `hideLabel` | `boolean` | `false` | Hide the action label |

### ActionButtonGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `ActionButtonProps[]` | - | Array of action button configurations |
| `className` | `string` | - | Additional CSS classes for the group container |

## Styling

Each action type has predefined colors and hover states:

- **Back/Cancel/View/Refresh/Settings/More**: Gray/neutral styling
- **Edit**: Blue accent
- **Delete**: Red accent with warning colors
- **Save**: Primary blue (solid background)
- **Add**: Green accent (solid background)
- **Download**: Emerald accent
- **Upload**: Indigo accent
- **Copy**: Purple accent

## Examples in Current Codebase

### Customer Detail View
```tsx
<ActionButtonGroup
  actions={createDetailViewActions(
    handleBack,
    handleEdit,
    handleDelete,
    {
      deleteDisabled: deleteCustomerMutation.isPending,
      deleteLoading: deleteCustomerMutation.isPending,
    }
  )}
/>
```

### Customer Create/Edit Views
```tsx
<ActionButton action="back" onClick={handleBack}>
  Back to Customers
</ActionButton>
```

## Best Practices

1. **Use helper functions** when possible for common button combinations
2. **Provide loading states** for async operations
3. **Handle disabled states** appropriately
4. **Use consistent labeling** - let the default labels work unless you need specific text
5. **Group related actions** using `ActionButtonGroup` for consistent spacing
