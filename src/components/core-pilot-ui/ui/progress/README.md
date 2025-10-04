# Progress Component

Gelişmiş progress bileşeni. Shadcn UI Progress'in üzerine inşa edilmiş, ek özellikler ve varyantlar sunar.

## Özellikler

- **Çoklu varyantlar**: default, success, warning, error, info, gradient
- **Esnek boyutlar**: sm, default, lg, xl, 2xl, 3xl
- **Değer gösterimi**: inside, outside, top, bottom pozisyonları
- **Animasyonlar**: pulse, striped, animated efektler
- **Indeterminate**: Belirsiz süreçler için
- **Circular Progress**: Dairesel progress bar
- **Label/Description**: Başlık ve açıklama desteği

## Kullanım

### Temel Kullanım

```tsx
import { Progress } from "@/components/core-pilot-ui/ui/progress";

<Progress value={75} />
```

### Değer Gösterimi ile

```tsx
<Progress 
  value={60} 
  showValue={true}
  valuePosition="outside"
  label="İndirme İlerlemesi"
  description="Dosya indiriliyor..."
/>
```

### Farklı Varyantlar

```tsx
// Başarı progress'i
<Progress 
  value={100} 
  variant="success" 
  showValue={true}
  label="Tamamlandı"
/>

// Uyarı progress'i
<Progress 
  value={85} 
  variant="warning" 
  showValue={true}
  label="Dikkat Gerekli"
/>

// Hata progress'i
<Progress 
  value={25} 
  variant="error" 
  showValue={true}
  label="Hata Oluştu"
/>

// Gradient progress'i
<Progress 
  value={70} 
  variant="gradient" 
  showValue={true}
  label="Premium İşlem"
/>
```

### Animasyonlu Progress

```tsx
// Pulse efekti
<Progress 
  value={45} 
  pulse={true}
  showValue={true}
/>

// Çizgili efekt
<Progress 
  value={60} 
  striped={true}
  animated={true}
  showValue={true}
/>

// Belirsiz süreç
<Progress 
  indeterminate={true}
  label="İşlem devam ediyor..."
/>
```

### Farklı Boyutlar

```tsx
<Progress value={30} size="sm" showValue={true} />
<Progress value={50} size="default" showValue={true} />
<Progress value={70} size="lg" showValue={true} />
<Progress value={90} size="xl" showValue={true} />
```

### Dairesel Progress

```tsx
import { CircularProgress } from "@/components/core-pilot-ui/ui/progress";

<CircularProgress 
  value={75} 
  size={120}
  strokeWidth={8}
  variant="success"
  showValue={true}
/>

// Özel içerik ile
<CircularProgress 
  value={60} 
  size={100}
  variant="gradient"
>
  <div className="text-center">
    <div className="text-2xl font-bold">60%</div>
    <div className="text-xs text-muted-foreground">Tamamlandı</div>
  </div>
</CircularProgress>
```

### İçeride Değer Gösterimi

```tsx
<Progress 
  value={80} 
  size="xl"
  showValue={true}
  valuePosition="inside"
  variant="gradient"
  label="Büyük Progress"
/>
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
- `sm` - 4px yükseklik
- `default` - 8px yükseklik
- `lg` - 12px yükseklik
- `xl` - 16px yükseklik
- `2xl` - 20px yükseklik
- `3xl` - 24px yükseklik

### Değer Pozisyonları
- `inside` - Progress bar içinde
- `outside` - Progress bar sağında
- `top` - Progress bar üstünde
- `bottom` - Progress bar altında

## Props

### Progress Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `value` | `number` | `0` | Progress değeri (0-max) |
| `max` | `number` | `100` | Maksimum değer |
| `showValue` | `boolean` | `false` | Değeri göster |
| `valuePosition` | `"inside" \| "outside" \| "top" \| "bottom"` | `"outside"` | Değer pozisyonu |
| `label` | `string` | - | Başlık |
| `description` | `string` | - | Açıklama |
| `variant` | `"default" \| "success" \| "warning" \| "error" \| "info" \| "gradient"` | `"default"` | Renk varyantı |
| `size` | `"sm" \| "default" \| "lg" \| "xl" \| "2xl" \| "3xl"` | `"default"` | Boyut |
| `rounded` | `"none" \| "sm" \| "default" \| "lg"` | `"default"` | Köşe yuvarlama |
| `animated` | `boolean` | `false` | Animasyon efekti |
| `striped` | `boolean` | `false` | Çizgili efekt |
| `pulse` | `boolean` | `false` | Pulse efekti |
| `indeterminate` | `boolean` | `false` | Belirsiz süreç |

### CircularProgress Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `value` | `number` | `0` | Progress değeri |
| `max` | `number` | `100` | Maksimum değer |
| `size` | `number` | `120` | Çap (px) |
| `strokeWidth` | `number` | `8` | Çizgi kalınlığı |
| `showValue` | `boolean` | `true` | Değeri göster |
| `variant` | Progress varyantları | `"default"` | Renk varyantı |
| `children` | `React.ReactNode` | - | Özel içerik |

## Örnekler

### Dosya Yükleme Progress'i

```tsx
function FileUploadProgress({ progress, fileName }) {
  return (
    <Progress 
      value={progress} 
      variant={progress === 100 ? "success" : "default"}
      showValue={true}
      valuePosition="outside"
      label={`${fileName} yükleniyor...`}
      description={progress === 100 ? "Yükleme tamamlandı!" : "Lütfen bekleyin..."}
      animated={progress < 100}
    />
  );
}
```

### Sistem Kaynak Kullanımı

```tsx
function SystemResources({ cpu, memory, disk }) {
  const getVariant = (usage) => {
    if (usage > 90) return "error";
    if (usage > 70) return "warning"; 
    return "success";
  };

  return (
    <div className="space-y-4">
      <Progress 
        value={cpu} 
        variant={getVariant(cpu)}
        showValue={true}
        label="CPU Kullanımı"
        size="lg"
      />
      <Progress 
        value={memory} 
        variant={getVariant(memory)}
        showValue={true}
        label="Bellek Kullanımı"
        size="lg"
      />
      <Progress 
        value={disk} 
        variant={getVariant(disk)}
        showValue={true}
        label="Disk Kullanımı"
        size="lg"
      />
    </div>
  );
}
```

### Dairesel Skor Göstergesi

```tsx
function ScoreIndicator({ score, maxScore = 100 }) {
  const percentage = (score / maxScore) * 100;
  const variant = percentage >= 80 ? "success" : percentage >= 60 ? "warning" : "error";
  
  return (
    <CircularProgress 
      value={percentage} 
      size={150}
      strokeWidth={10}
      variant={variant}
    >
      <div className="text-center">
        <div className="text-3xl font-bold">{score}</div>
        <div className="text-sm text-muted-foreground">/ {maxScore}</div>
        <div className="text-xs text-muted-foreground">Puan</div>
      </div>
    </CircularProgress>
  );
}
```
