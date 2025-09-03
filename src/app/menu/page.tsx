'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API'den menü verilerini çek
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/menu');
        const result = await response.json();
        
        if (result.success) {
          setMenuItems(result.data);
          
          // Kategorileri dinamik olarak oluştur
          const uniqueCategories = Array.from(
            new Set(result.data.map((item: MenuItem) => item.category))
          ).map(categoryId => {
            const categoryNames: { [key: string]: string } = {
              'kahvalti': 'Kahvaltı',
              'ogle-yemekleri': 'Öğle Yemekleri',
              'tatlilar': 'Tatlılar',
              'icecekler': 'İçecekler'
            };
            
            return {
              id: categoryId as string,
              name: categoryNames[categoryId as string] || categoryId,
              description: `${categoryNames[categoryId as string] || categoryId} kategorisindeki lezzetlerimiz`
            };
          });
          
          setCategories(uniqueCategories as Category[]);
        } else {
          setError('Menü verileri yüklenemedi');
        }
      } catch (err) {
        setError('Bir hata oluştu');
        console.error('Menü yükleme hatası:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Menü yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hata Oluştu</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-amber-600 hover:text-amber-700 transition-colors">
                Lezzet Durağı
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-900 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Ana Sayfa
                </Link>
                <Link href="/menu" className="text-amber-600 bg-amber-50 px-3 py-2 rounded-md text-sm font-medium">
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

      {/* Header */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Menümüz
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Geleneksel lezzetlerimizi keşfedin ve damak tadınıza uygun seçenekleri bulun
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700'
              }`}
            >
              Tümü ({menuItems.length})
            </button>
            {categories.map((category) => {
              const itemCount = menuItems.filter(item => item.category === category.id).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700'
                  }`}
                >
                  {category.name} ({itemCount})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedCategory !== 'all' && (
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {categories.find(cat => cat.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600">
                {categories.find(cat => cat.id === selectedCategory)?.description}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                    <span className="text-6xl">🍽️</span>
                  </div>
                  {item.featured && (
                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Öne Çıkan
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                    <span className="text-2xl font-bold text-amber-600">{item.price}₺</span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {categories.find(cat => cat.id === item.category)?.name}
                    </span>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium">
                      Sipariş Ver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Bu kategoride henüz ürün bulunmuyor
              </h3>
              <p className="text-gray-600">
                Diğer kategorileri inceleyebilir veya tüm menüyü görüntüleyebilirsiniz.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Rezervasyon Yapmak İster misiniz?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Lezzetli yemeklerimizi yerinde tadabilmek için rezervasyon yapabilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-amber-700 transition-colors shadow-lg">
              Rezervasyon Yap
            </button>
            <Link href="/contact" className="bg-white text-amber-600 border-2 border-amber-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-amber-600 hover:text-white transition-colors">
              İletişime Geç
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