# Slider Component

Gelişmiş slider bileşeni. Shadcn UI Slider'ın üzerine inşa edilmiş, ek özellikler ve varyantlar sunar.

## Özellikler

- **Çoklu varyantlar**: default, success, warning, error, info, gradient
- **Esnek boyutlar**: sm, default, lg, xl
- **Thumb varyantları**: default, filled, ring
- **Değer gösterimi**: top, right, bottom, inline pozisyonları
- **Preset değerler**: Hızlı seçim için önceden tanımlı değerler
- **Marks**: Slider üzerinde işaretler
- **Özelleştirilmiş formatters**: Değer gösterimi için
- **Specialized sliders**: TemperatureSlider, TokenSlider

## Kullanım

### Temel Kullanım

```tsx
import { Slider } from "@/components/core-pilot-ui/ui/slider";

<Slider
  label="Volume"
  value={[50]}
  onValueChange={(value) => console.log(value)}
  showValue={true}
  valuePosition="right"
/>
```

### Değer Gösterimi ile

```tsx
<Slider
  label="Progress"
  value={[75]}
  min={0}
  max={100}
  showValue={true}
  valuePosition="right"
  valueFormatter={(val) => `${val}%`}
  unit="%"
  description="Current progress level"
/>
```

### Farklı Varyantlar

```tsx
// Başarı slider'ı
<Slider 
  value={[100]} 
  variant="success" 
  label="Completion"
/>

// Uyarı slider'ı
<Slider 
  value={[85]} 
  variant="warning" 
  label="Warning Level"
/>

// Hata slider'ı
<Slider 
  value={[25]} 
  variant="error" 
  label="Error Rate"
/>

// Gradient slider'ı
<Slider 
  value={[70]} 
  variant="gradient" 
  label="Premium Feature"
/>
```

### Preset Değerler ile

```tsx
const volumePresets = [
  { label: "Mute", value: 0, description: "No sound" },
  { label: "Low", value: 25, description: "Quiet volume" },
  { label: "Medium", value: 50, description: "Normal volume" },
  { label: "High", value: 75, description: "Loud volume" },
  { label: "Max", value: 100, description: "Maximum volume" },
];

<Slider
  label="Volume Control"
  value={[volume]}
  onValueChange={setVolume}
  presets={volumePresets}
  onPresetSelect={(preset) => setVolume([preset.value])}
  showValue={true}
  valuePosition="right"
/>
```

### Marks ile

```tsx
const marks = [
  { value: 0, label: "Min" },
  { value: 25, label: "Low" },
  { value: 50, label: "Med" },
  { value: 75, label: "High" },
  { value: 100, label: "Max" },
];

<Slider
  label="Performance Level"
  value={[60]}
  marks={marks}
  showValue={true}
  valuePosition="top"
/>
```

### Specialized Sliders

#### Temperature Slider (AI Modelleri için)

```tsx
import { TemperatureSlider } from "@/components/core-pilot-ui/ui/slider";

<TemperatureSlider
  label="AI Temperature"
  description="Controls creativity vs precision"
  value={[0.7]}
  onValueChange={(value) => setTemperature(value[0])}
  showValue={true}
  valuePosition="right"
/>
```

#### Token Slider (AI Modelleri için)

```tsx
import { TokenSlider } from "@/components/core-pilot-ui/ui/slider";

<TokenSlider
  label="Max Tokens"
  description="Maximum response length"
  value={[1500]}
  onValueChange={(value) => setMaxTokens(value[0])}
  max={4000}
  showValue={true}
  valuePosition="right"
/>
```

### Farklı Boyutlar ve Thumb Stilleri

```tsx
<Slider value={[30]} size="sm" thumbVariant="filled" />
<Slider value={[50]} size="default" thumbVariant="ring" />
<Slider value={[70]} size="lg" thumbVariant="default" />
<Slider value={[90]} size="xl" thumbVariant="filled" />
```

## Varyantlar

### Renk Varyantları
- `default` - Mavi (primary)
- `success` - Yeşil
- `warning` - Sarı
- `error` - Kırmızı
- `info` - Mavi
- `gradient` - Mavi-mor gradient

### Boyut Varyantları
- `sm` - Küçük (track: 4px, thumb: 12px)
- `default` - Orta (track: 6px, thumb: 16px)
- `lg` - Büyük (track: 8px, thumb: 20px)
- `xl` - Çok büyük (track: 12px, thumb: 24px)

### Thumb Varyantları
- `default` - Boş arka plan, border
- `filled` - Dolu arka plan
- `ring` - Kalın border, gölge

### Değer Pozisyonları
- `top` - Slider üstünde
- `right` - Slider sağında (varsayılan)
- `bottom` - Slider altında
- `inline` - Slider içinde

## Props

### Slider Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `label` | `string` | - | Slider etiketi |
| `description` | `string` | - | Açıklama metni |
| `showValue` | `boolean` | `false` | Değeri göster |
| `valuePosition` | `"top" \| "right" \| "bottom" \| "inline"` | `"right"` | Değer pozisyonu |
| `valueFormatter` | `(value: number) => string` | - | Değer formatlayıcı |
| `presets` | `SliderPreset[]` | `[]` | Preset değerler |
| `onPresetSelect` | `(preset: SliderPreset) => void` | - | Preset seçim callback'i |
| `variant` | `"default" \| "success" \| "warning" \| "error" \| "info" \| "gradient"` | `"default"` | Renk varyantı |
| `size` | `"sm" \| "default" \| "lg" \| "xl"` | `"default"` | Boyut |
| `thumbVariant` | `"default" \| "filled" \| "ring"` | `"default"` | Thumb stili |
| `unit` | `string` | `""` | Değer birimi |
| `marks` | `{value: number, label?: string}[]` | `[]` | Slider işaretleri |

### SliderPreset Interface

```tsx
interface SliderPreset {
  label: string;
  value: number;
  disabled?: boolean;
  description?: string;
}
```

## Örnekler

### Ses Kontrolü

```tsx
function VolumeControl({ volume, onVolumeChange }) {
  const volumePresets = [
    { label: "Sessiz", value: 0 },
    { label: "Düşük", value: 25 },
    { label: "Orta", value: 50 },
    { label: "Yüksek", value: 75 },
    { label: "Maksimum", value: 100 },
  ];

  return (
    <Slider
      label="Ses Seviyesi"
      value={[volume]}
      onValueChange={([value]) => onVolumeChange(value)}
      presets={volumePresets}
      onPresetSelect={(preset) => onVolumeChange(preset.value)}
      showValue={true}
      valuePosition="right"
      valueFormatter={(val) => `${val}%`}
      variant="info"
    />
  );
}
```

### AI Model Parametreleri

```tsx
function AIModelControls({ temperature, maxTokens, onUpdate }) {
  return (
    <div className="space-y-6">
      <TemperatureSlider
        label="Temperature"
        description="Yaratıcılık vs kesinlik dengesi"
        value={[temperature]}
        onValueChange={([value]) => onUpdate({ temperature: value })}
        showValue={true}
      />
      
      <TokenSlider
        label="Max Tokens"
        description="Maksimum yanıt uzunluğu"
        value={[maxTokens]}
        onValueChange={([value]) => onUpdate({ maxTokens: value })}
        max={4000}
        showValue={true}
      />
    </div>
  );
}
```

### Performans Ayarları

```tsx
function PerformanceSettings({ settings, onChange }) {
  const qualityMarks = [
    { value: 0, label: "Düşük" },
    { value: 50, label: "Orta" },
    { value: 100, label: "Yüksek" },
  ];

  return (
    <div className="space-y-4">
      <Slider
        label="Grafik Kalitesi"
        value={[settings.quality]}
        onValueChange={([value]) => onChange({ quality: value })}
        marks={qualityMarks}
        variant="gradient"
        showValue={true}
        valuePosition="top"
      />
      
      <Slider
        label="FPS Limiti"
        value={[settings.fps]}
        onValueChange={([value]) => onChange({ fps: value })}
        min={30}
        max={144}
        step={1}
        showValue={true}
        valueFormatter={(val) => `${val} FPS`}
        variant="success"
      />
    </div>
  );
}
```

## Best Practices

1. **Preset'leri kullan** - Sık kullanılan değerler için preset butonları ekle
2. **Açıklama ekle** - Slider'ın ne yaptığını açıkla
3. **Uygun variant seç** - Renk kodlaması ile kullanıcı deneyimini iyileştir
4. **Değer göster** - Mevcut değeri kullanıcıya göster
5. **Marks kullan** - Önemli değerleri işaretle
6. **Formatter kullan** - Değerleri anlamlı formatta göster
