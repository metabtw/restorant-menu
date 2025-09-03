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

// GET - Belirli bir menü itemini getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const menuItems = readMenuData();
    const item = menuItems.find(item => item.id === id);

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Menü item bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Menü item alınamadı' },
      { status: 500 }
    );
  }
}

// PUT - Menü item güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
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
    const itemIndex = menuItems.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Menü item bulunamadı' },
        { status: 404 }
      );
    }

    // Item güncelle
    menuItems[itemIndex] = {
      id,
      name,
      description,
      price: parseFloat(price),
      category,
      image: image || menuItems[itemIndex].image,
      featured: featured !== undefined ? featured : menuItems[itemIndex].featured
    };

    if (writeMenuData(menuItems)) {
      return NextResponse.json({
        success: true,
        data: menuItems[itemIndex],
        message: 'Menü item başarıyla güncellendi'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Menü item güncellenemedi' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('PUT /api/menu/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Menü item güncellenemedi', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// DELETE - Menü item sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const menuItems = readMenuData();
    const itemIndex = menuItems.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Menü item bulunamadı' },
        { status: 404 }
      );
    }

    const deletedItem = menuItems[itemIndex];
    menuItems.splice(itemIndex, 1);

    if (writeMenuData(menuItems)) {
      return NextResponse.json({
        success: true,
        data: deletedItem,
        message: 'Menü item başarıyla silindi'
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Menü item silinemedi' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('DELETE /api/menu/[id] error:', error);
    return NextResponse.json(
      { success: false, error: 'Menü item silinemedi', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}