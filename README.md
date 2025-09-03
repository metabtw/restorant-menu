# 🍽️ Lezzet Durağı - Restoran Menü Yönetim Sistemi

Modern ve kullanıcı dostu bir restoran menü yönetim sistemi. Next.js 15, React 19, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Teknolojiler](#teknolojiler)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [API Endpoints](#api-endpoints)
- [Proje Yapısı](#proje-yapısı)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Lisans](#lisans)

## ✨ Özellikler

### 🏠 Ana Sayfa
- **Modern Hero Section**: Gradient arka plan ve çekici tasarım
- **Hikaye Bölümü**: Restoran hakkında bilgiler ve istatistikler
- **Öne Çıkan Lezzetler**: En popüler menü öğelerinin sergilenmesi
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Sticky Navigation**: Sabit üst menü

### 📖 Menü Sayfası
- **Kategori Filtreleme**: Kahvaltı, Öğle Yemekleri, Tatlılar, İçecekler
- **Dinamik Veri Yükleme**: API üzerinden gerçek zamanlı veri
- **Arama ve Filtreleme**: Kullanıcı dostu menü gezinme
- **Görsel Destekli**: Her menü öğesi için resim desteği
- **Fiyat Gösterimi**: Net ve anlaşılır fiyat bilgileri

### 🔧 Admin Paneli
- **CRUD İşlemleri**: Menü öğelerini ekleme, düzenleme, silme
- **Kategori Yönetimi**: Farklı kategorilerde menü öğeleri
- **Öne Çıkarma**: Menü öğelerini öne çıkarma özelliği
- **Görsel URL Yönetimi**: Resim URL'lerini kolayca ekleme
- **Gerçek Zamanlı Güncelleme**: Anında değişiklik görme
- **Responsive Admin Interface**: Mobil uyumlu yönetim paneli

### 📞 İletişim Sayfası
- **İletişim Bilgileri**: Adres, telefon, e-posta
- **Çalışma Saatleri**: Detaylı açılış-kapanış saatleri
- **Modern Tasarım**: Kullanıcı dostu arayüz

## 🛠️ Teknolojiler

### Frontend
- **Next.js 15.5.2**: React framework with App Router
- **React 19.1.0**: Modern React with latest features
- **TypeScript 5**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **ESLint**: Code quality and consistency

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **File System Database**: JSON-based data storage
- **RESTful API**: Standard HTTP methods (GET, POST, PUT, DELETE)

### Development Tools
- **Turbopack**: Fast bundler for development
- **Hot Reload**: Instant development feedback
- **TypeScript Support**: Full type checking
- **ESLint Configuration**: Code quality enforcement

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adım Adım Kurulum

1. **Projeyi klonlayın**
   ```bash
   git clone <repository-url>
   cd menu
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   # veya
   yarn install
   ```

3. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   # veya
   yarn dev
   ```

4. **Tarayıcıda açın**
   ```
   http://localhost:3000
   ```

## 📱 Kullanım

### Müşteri Arayüzü
1. **Ana Sayfa**: `http://localhost:3000`
   - Restoran hakkında bilgi
   - Öne çıkan menü öğeleri
   - Navigasyon menüsü

2. **Menü Sayfası**: `http://localhost:3000/menu`
   - Tüm menü öğelerini görüntüleme
   - Kategorilere göre filtreleme
   - Detaylı ürün bilgileri

3. **İletişim Sayfası**: `http://localhost:3000/contact`
   - İletişim bilgileri
   - Çalışma saatleri
   - Konum bilgisi

### Admin Paneli
1. **Admin Girişi**: `http://localhost:3000/admin`
   - Menü öğesi ekleme
   - Mevcut öğeleri düzenleme
   - Öğeleri silme
   - Öne çıkarma ayarları

## 🔌 API Endpoints

### Menü API (`/api/menu`)

#### GET `/api/menu`
- **Açıklama**: Tüm menü öğelerini getirir
- **Query Parameters**:
  - `category`: Kategoriye göre filtreleme
  - `featured`: Öne çıkan öğeleri filtreleme
- **Response**: 
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "Serpme Kahvaltı",
        "description": "Peynir çeşitleri, zeytin, reçel...",
        "price": 85,
        "category": "kahvalti",
        "image": "/images/serpme-kahvalti.jpg",
        "featured": true
      }
    ]
  }
  ```

#### POST `/api/menu`
- **Açıklama**: Yeni menü öğesi ekler
- **Body**: MenuItem object
- **Response**: Success/error message

#### PUT `/api/menu/[id]`
- **Açıklama**: Mevcut menü öğesini günceller
- **Parameters**: `id` - Menü öğesi ID'si
- **Body**: Updated MenuItem object
- **Response**: Success/error message

#### DELETE `/api/menu/[id]`
- **Açıklama**: Menü öğesini siler
- **Parameters**: `id` - Menü öğesi ID'si
- **Response**: Success/error message

## 📁 Proje Yapısı

```
menu/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.tsx          # Admin paneli
│   │   ├── api/
│   │   │   └── menu/
│   │   │       ├── route.ts      # Menü API endpoints
│   │   │       └── [id]/
│   │   │           └── route.ts  # Tek menü öğesi API
│   │   ├── contact/
│   │   │   └── page.tsx          # İletişim sayfası
│   │   ├── menu/
│   │   │   └── page.tsx          # Menü sayfası
│   │   ├── globals.css           # Global CSS
│   │   ├── layout.tsx            # Ana layout
│   │   └── page.tsx              # Ana sayfa
│   └── data/
│       └── menu.json             # Menü veritabanı
├── public/                       # Statik dosyalar
├── package.json                  # Proje bağımlılıkları
├── next.config.ts               # Next.js konfigürasyonu
├── tailwind.config.js           # Tailwind CSS konfigürasyonu
├── tsconfig.json                # TypeScript konfigürasyonu
└── README.md                    # Bu dosya
```

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Ana Renk**: Amber/Orange gradient (#F59E0B - #EA580C)
- **Arka Plan**: Gradient (Amber-50 to White)
- **Metin**: Gray scale (900, 700, 600)
- **Vurgular**: White, Amber-200

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

### Typography
- **Başlıklar**: Font-bold, büyük boyutlar
- **Gövde Metni**: Font-medium, okunabilir boyutlar
- **Butonlar**: Font-semibold, rounded-full

## 🔧 Geliştirme Komutları

```bash
# Geliştirme sunucusu (Turbopack ile)
npm run dev

# Production build
npm run build

# Production sunucusu
npm run start

# Kod kalitesi kontrolü
npm run lint
```

## 📊 Veri Yapısı

### MenuItem Interface
```typescript
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured: boolean;
}
```

### Category Interface
```typescript
interface Category {
  id: string;
  name: string;
  description: string;
}

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

- **Proje Sahibi**: Muhammed Emin Tahtalı
- **E-posta**: [tahtalime@gmail.com]

## 🙏 Teşekkürler

- Next.js ekibine harika framework için
- Tailwind CSS ekibine modern CSS framework için
- React ekibine güçlü UI library için

---

**Not**: Bu proje eğitim ve demo amaçlı geliştirilmiştir. Production kullanımı için ek güvenlik önlemleri alınması önerilir.
