# Select Component

Gelişmiş select bileşeni. Shadcn UI Select'in üzerine inşa edilmiş, ek özellikler ve varyantlar sunar.

## Özellikler

- **Çoklu varyantlar**: default, filled, ghost, outline
- **Esnek boyutlar**: sm, default, lg, xl
- **Durum göstergeleri**: success, warning, error
- **Icon desteği**: Sol veya sağ pozisyonda icon ekleme
- **Gruplandırma**: Seçenekleri gruplara ayırma
- **Açıklama desteği**: Her seçenek için açıklama metni
- **Gelişmiş styling**: Hover ve focus efektleri

## Kullanım

### Temel Kullanım

```tsx
import { Select } from "@/components/core-pilot-ui/ui/select";

const options = [
  { value: "option1", label: "Seçenek 1" },
  { value: "option2", label: "Seçenek 2" },
  { value: "option3", label: "Seçenek 3" },
];

<Select
  options={options}
  placeholder="Bir seçenek seçin..."
  onValueChange={(value) => console.log(value)}
/>
```

### Icon'lu Seçenekler

```tsx
import { User, Settings, Mail } from "lucide-react";

const options = [
  { 
    value: "profile", 
    label: "Profil", 
    icon: <User className="h-4 w-4" />,
    description: "Kullanıcı profil ayarları"
  },
  { 
    value: "settings", 
    label: "Ayarlar", 
    icon: <Settings className="h-4 w-4" />,
    description: "Sistem ayarları"
  },
  { 
    value: "mail", 
    label: "Mail", 
    icon: <Mail className="h-4 w-4" />,
    description: "E-posta ayarları"
  },
];

<Select
  options={options}
  variant="filled"
  size="lg"
  placeholder="Kategori seçin..."
/>
```

### Gruplandırılmış Seçenekler

```tsx
const groupedOptions = [
  { 
    value: "user1", 
    label: "John Doe", 
    group: "Kullanıcılar",
    icon: <User className="h-4 w-4" />
  },
  { 
    value: "user2", 
    label: "Jane Smith", 
    group: "Kullanıcılar",
    icon: <User className="h-4 w-4" />
  },
  { 
    value: "admin1", 
    label: "Admin User", 
    group: "Yöneticiler",
    icon: <Shield className="h-4 w-4" />
  },
];

<Select
  options={groupedOptions}
  variant="outline"
  placeholder="Kullanıcı seçin..."
/>
```

### Durum Göstergeleri

```tsx
// Başarı durumu
<Select
  options={options}
  state="success"
  placeholder="Başarılı seçim"
/>

// Hata durumu
<Select
  options={options}
  state="error" 
  placeholder="Hatalı seçim"
/>

// Uyarı durumu
<Select
  options={options}
  state="warning"
  placeholder="Dikkat gereken seçim"
/>
```

## Varyantlar

### Görünüm Varyantları
- `default` - Standart border ile
- `filled` - Dolu arka plan ile
- `ghost` - Şeffaf arka plan ile
- `outline` - Kalın border ile

### Boyut Varyantları
- `sm` - Küçük (h-8, text-xs)
- `default` - Orta (h-9, text-sm)
- `lg` - Büyük (h-10, text-base)
- `xl` - Çok büyük (h-12, text-lg)

### Durum Varyantları
- `default` - Normal durum
- `success` - Başarı (yeşil border/focus)
- `warning` - Uyarı (sarı border/focus)
- `error` - Hata (kırmızı border/focus)

## Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `options` | `SelectOption[]` | `[]` | Seçenek listesi |
| `value` | `string` | - | Seçili değer |
| `defaultValue` | `string` | - | Varsayılan değer |
| `onValueChange` | `(value: string) => void` | - | Değer değişim callback'i |
| `placeholder` | `string` | `"Select an option..."` | Placeholder metni |
| `disabled` | `boolean` | `false` | Devre dışı durumu |
| `variant` | `"default" \| "filled" \| "ghost" \| "outline"` | `"default"` | Görünüm varyantı |
| `size` | `"sm" \| "default" \| "lg" \| "xl"` | `"default"` | Boyut |
| `state` | `"default" \| "success" \| "warning" \| "error"` | `"default"` | Durum |
| `icon` | `React.ReactNode` | - | Ana icon |
| `iconPosition` | `"left" \| "right"` | `"left"` | Icon pozisyonu |
| `emptyMessage` | `string` | `"No options available"` | Boş liste mesajı |

## SelectOption Interface

```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
  group?: string;
}
```

## Alt Bileşenler

Daha fazla kontrol için alt bileşenleri doğrudan kullanabilirsiniz:

```tsx
import { 
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator
} from "@/components/core-pilot-ui/ui/select";

<Select>
  <SelectTrigger variant="filled" size="lg">
    <SelectValue placeholder="Seçin..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Kategori 1</SelectLabel>
      <SelectItem value="item1">Öğe 1</SelectItem>
      <SelectItem value="item2">Öğe 2</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>Kategori 2</SelectLabel>
      <SelectItem value="item3">Öğe 3</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```
