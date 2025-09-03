'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    reservationDate: '',
    reservationTime: '',
    guests: '2'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Mesajınız alındı! En kısa sürede size dönüş yapacağız.');
  };

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
                <Link href="/menu" className="text-gray-900 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Menü
                </Link>
                <Link href="/contact" className="text-amber-600 bg-amber-50 px-3 py-2 rounded-md text-sm font-medium">
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
            İletişim
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Bizimle iletişime geçin, rezervasyon yapın veya sorularınızı sorun
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Bize Ulaşın</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Adres</h3>
                  <p className="text-gray-600">
                    Galata Kulesi Sokak No: 15<br />
                    Beyoğlu, İstanbul 34421
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Telefon</h3>
                  <p className="text-gray-600">
                    Rezervasyon: (0212) 123 45 67<br />
                    Genel Bilgi: (0212) 123 45 68
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✉️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">E-posta</h3>
                  <p className="text-gray-600">
                    info@lezzetduragi.com<br />
                    rezervasyon@lezzetduragi.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🕒</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Çalışma Saatleri</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Pazartesi - Cuma: 08:00 - 23:00</p>
                    <p>Cumartesi - Pazar: 09:00 - 24:00</p>
                    <p className="text-sm text-amber-600 font-medium mt-2">
                      Rezervasyon önerilir
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Konum</h3>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <span className="text-4xl block mb-2">🗺️</span>
                  <p>Harita Görünümü</p>
                  <p className="text-sm">Galata Kulesi yakınında</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">İletişim Formu & Rezervasyon</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  placeholder="(0212) 123 45 67"
                />
              </div>

              {/* Reservation Details */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rezervasyon Bilgileri (Opsiyonel)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="reservationDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Tarih
                    </label>
                    <input
                      type="date"
                      id="reservationDate"
                      name="reservationDate"
                      value={formData.reservationDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="reservationTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Saat
                    </label>
                    <select
                      id="reservationTime"
                      name="reservationTime"
                      value={formData.reservationTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    >
                      <option value="">Saat seçin</option>
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="13:00">13:00</option>
                      <option value="13:30">13:30</option>
                      <option value="14:00">14:00</option>
                      <option value="19:00">19:00</option>
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                      <option value="21:00">21:00</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                      Kişi Sayısı
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} kişi</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mesaj *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors resize-none"
                  placeholder="Mesajınızı, özel isteklerinizi veya sorularınızı buraya yazabilirsiniz..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors shadow-lg"
              >
                Mesaj Gönder
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Quick Contact */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hızlı İletişim
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Acil durumlar için doğrudan arayabilir veya WhatsApp üzerinden mesaj gönderebilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+902121234567" 
              className="bg-amber-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-amber-700 transition-colors shadow-lg inline-flex items-center justify-center"
            >
              📞 Hemen Ara
            </a>
            <a 
              href="https://wa.me/902121234567" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg inline-flex items-center justify-center"
            >
              💬 WhatsApp
            </a>
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