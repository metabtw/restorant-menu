import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured: boolean;
}

const MENU_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'menu.json');

// Menü verilerini oku
function readMenuData(): MenuItem[] {
  try {
    const fileContent = fs.readFileSync(MENU_FILE_PATH, 'utf8');
    const data = JSON.parse(fileContent);
    return data.menuItems || [];
  } catch (error) {
    console.error('Menü verileri okunamadı:', error);
    return [];
  }
}

// Menü verilerini yaz
function writeMenuData(menuItems: MenuItem[]): boolean {
  try {
    // Mevcut dosyayı oku ve sadece menuItems kısmını güncelle
    const fileContent = fs.readFileSync(MENU_FILE_PATH, 'utf8');
    const data = JSON.parse(fileContent);
    data.menuItems = menuItems;
    fs.writeFileSync(MENU_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Menü verileri yazılamadı:', error);
    return false;
  }
}

// GET - Tüm menü itemlerini getir
export async function GET(request: NextRequest) {
  try {
    const menuItems = readMenuData();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    let filteredItems = menuItems;

    // Kategoriye göre filtrele
    if (category && category !== 'all') {
      filteredItems = filteredItems.filter(item => item.category === category);
    }

    // Öne çıkan itemleri filtrele
    if (featured === 'true') {
      filteredItems = filteredItems.filter(item => item.featured);
    }

    return NextResponse.json({
      success: true,
      data: filteredItems,
      total: filteredItems.length
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Menü verileri alınamadı' },
      { status: 500 }
    );
  }
}

// POST - Yeni menü item ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, category, image, featured } = body;

    // Validasyon
    if (!name || !description || !price || !category) {
      return NextResponse.json(
        { success: false, error: 'Gerekli alanlar eksik' },
        { status: 400 }
      );
    }

    const menuItems = readMenuData();
    
    // Yeni ID oluştur
    const newId = Math.max(...menuItems.map(item => item.id), 0) + 1;

    const newItem: MenuItem = {
      id: newId,
      name,
      description,
      price: parseFloat(price),
      category,
      image: image || '/images/placeholder.jpg',
      featured: featured || false
    };

    menuItems.push(newItem);

    if (writeMenuData(menuItems)) {
      return NextResponse.json({
        success: true,
        data: newItem,
        message: 'Menü item başarıyla eklendi'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Menü item kaydedilemedi' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('POST /api/menu error:', error);
    return NextResponse.json(
      { success: false, error: 'Menü item eklenemedi', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}