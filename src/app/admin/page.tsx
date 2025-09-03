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

interface FormData {
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  featured: boolean;
}

export default function AdminPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    category: 'kahvalti',
    image: '/images/placeholder.jpg',
    featured: false
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const categories = [
    { id: 'kahvalti', name: 'Kahvaltı' },
    { id: 'ogle-yemekleri', name: 'Öğle Yemekleri' },
    { id: 'tatlilar', name: 'Tatlılar' },
    { id: 'icecekler', name: 'İçecekler' }
  ];

  // Menü verilerini yükle
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/menu');
      const result = await response.json();
      if (result.success) {
        setMenuItems(result.data || []);
      } else {
        setMenuItems([]);
      }
    } catch (error) {
      console.error('Menü yükleme hatası:', error);
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Form gönderimi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId ? `/api/menu/${editingId}` : '/api/menu';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setFormData({
          name: '',
          description: '',
          price: '',
          category: 'kahvalti',
          image: '/images/placeholder.jpg',
          featured: false
        });
        setEditingId(null);
        fetchMenuItems();
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Bir hata oluştu' });
    }
  };

  // Düzenleme
  const handleEdit = (item: MenuItem) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
      featured: item.featured
    });
    setEditingId(item.id);
  };

  // Silme
  const handleDelete = async (id: number) => {
    if (!confirm('Bu menü itemini silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        fetchMenuItems();
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Silme işlemi başarısız' });
    }
  };

  // Form iptal
  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'kahvalti',
      image: '/images/placeholder.jpg',
      featured: false
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-amber-600 hover:text-amber-700 transition-colors">
                Lezzet Durağı - Admin
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-900 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/menu" className="text-gray-900 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Menü
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Menü Yönetimi</h1>
          <p className="text-gray-600">Menü itemlerini ekleyin, düzenleyin veya silin.</p>
        </div>

        {/* Mesaj */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {editingId ? 'Menü Item Düzenle' : 'Yeni Menü Item Ekle'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">
                  İsim
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                  required
                />
              </div>
              
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                  required
                />
              </div>
              
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">
                  Fiyat (₺)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                  required
                />
              </div>
              
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-2">
                  Görsel URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-5 w-5 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-3 block text-base font-semibold text-gray-800">
                  Öne Çıkan
                </label>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors font-medium"
                >
                  {editingId ? 'Güncelle' : 'Ekle'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors font-medium"
                  >
                    İptal
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Menü Listesi */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Mevcut Menü Items ({menuItems?.length || 0})</h2>
            </div>
            
            <div className="h-[calc(100vh-300px)] min-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">Yükleniyor...</p>
                </div>
              ) : !Array.isArray(menuItems) || menuItems.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  Henüz menü item yok
                </div>
              ) : (
                <div className="divide-y">
                  {menuItems.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {item.name}
                            {item.featured && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                                Öne Çıkan
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <span className="font-medium text-amber-600">{item.price}₺</span>
                            <span className="mx-2">•</span>
                            <span>{categories.find(cat => cat.id === item.category)?.name}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Sil
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}