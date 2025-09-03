import Image from "next/image";
import Link from "next/link";
import menuData from "../data/menu.json";

export default function Home() {
  const featuredItems = menuData.menuItems.filter(item => item.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-amber-600">Lezzet Durağı</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-900 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Ana Sayfa
                </Link>
                <Link href="/menu" className="text-gray-900 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Menü
                </Link>
                <Link href="/contact" className="text-gray-900 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  İletişim
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Lezzet Durağı'na
              <span className="block text-amber-200">Hoş Geldiniz</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Geleneksel Türk mutfağının en lezzetli yemeklerini modern bir atmosferde sunuyoruz. 
              Her lokmada aile sıcaklığını hissedeceksiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-amber-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-amber-50 transition-colors shadow-lg">
                Rezervasyon Yap
              </button>
              <Link href="/menu" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-amber-600 transition-colors">
                Menüyü İncele
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Hikayemiz
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                1985 yılından beri İstanbul'un kalbinde, geleneksel Türk mutfağının 
                en seçkin lezzetlerini misafirlerimizle buluşturuyoruz. Aile işletmemiz, 
                üç nesirdir sürdürdüğü kalite anlayışıyla sizlere hizmet veriyor.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Taze malzemeler, özenle hazırlanan tarifler ve sıcak atmosferimizle 
                her ziyaretinizde kendinizi evinizde hissedeceksiniz.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-amber-600">38+</div>
                  <div className="text-sm text-gray-600">Yıllık Deneyim</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">50+</div>
                  <div className="text-sm text-gray-600">Lezzet Çeşidi</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">1000+</div>
                  <div className="text-sm text-gray-600">Mutlu Müşteri</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-amber-100 rounded-lg p-8">
                <div className="text-center">
                  <div className="w-32 h-32 bg-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">🍽️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Kaliteli Hizmet</h3>
                  <p className="text-gray-600">Her detayda mükemmellik</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Öne Çıkan Lezzetler
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              En çok tercih edilen ve özel tariflerimizle hazırlanan lezzetlerimizi keşfedin
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                  <span className="text-6xl">🍽️</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-amber-600">{item.price}₺</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {menuData.categories.find(cat => cat.id === item.category)?.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/menu" className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-amber-700 transition-colors shadow-lg">
              Tüm Menüyü Görüntüle
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Lezzet Durağı</h3>
              <p className="text-gray-300">
                Geleneksel Türk mutfağının en lezzetli yemeklerini modern bir atmosferde sunuyoruz.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <div className="space-y-2 text-gray-300">
                <p>📍 Beyoğlu, İstanbul</p>
                <p>📞 (0212) 123 45 67</p>
                <p>✉️ info@lezzetduragi.com</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Çalışma Saatleri</h4>
              <div className="space-y-2 text-gray-300">
                <p>Pazartesi - Cuma: 08:00 - 23:00</p>
                <p>Cumartesi - Pazar: 09:00 - 24:00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Lezzet Durağı. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
