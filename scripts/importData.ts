import { createClient } from '@sanity/client';
import { products } from '../src/data/mockMenu'; 
import path from 'path';

// --- CONFIGURATION ---
// Bun automatically loads the .env file
const projectId = process.env.VITE_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;

// Safety Check: Stop if keys are missing
if (!projectId || !token) {
  console.error("❌ ERREUR: Variables d'environnement manquantes.");
  console.error("Assurez-vous d'avoir 'VITE_SANITY_PROJECT_ID' et 'SANITY_API_WRITE_TOKEN' dans votre fichier .env");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: 'production', // You can also use process.env.VITE_SANITY_DATASET here if you want
  token,
  useCdn: false, // False for writing to get real-time results
  apiVersion: '2023-05-03',
});

async function uploadImage(imagePath: string) {
  try {
    if (!imagePath || imagePath.includes('placeholder')) return null;

    const fullPath = path.join(process.cwd(), 'public', imagePath);
    const file = Bun.file(fullPath);
    
    if (!(await file.exists())) {
      console.warn(`⚠️ Image introuvable: ${imagePath}`);
      return null;
    }

    const buffer = await file.arrayBuffer();
    
    console.log(`⬆️ Upload de l'image: ${imagePath}`);
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: path.basename(imagePath)
    });
    
    return asset._id;
  } catch (error) {
    console.error(`❌ Erreur upload image (${imagePath}):`, error);
    return null;
  }
}

async function importData() {
  console.log(`🚀 Démarrage de l'importation de ${products.length} produits...`);

  for (const product of products) {
    console.log(`\nTraitement de : ${product.title}`);

    const imageAssetId = await uploadImage(product.image);

    const sanityDoc = {
      _type: 'product',
      title: product.title,
      price: product.pricePerUnit,
      unitType: product.unitType,
      category: product.category,
      inStock: product.inStock,
      featured: product.featured || false,
      description: product.description,
      image: imageAssetId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId
        }
      } : undefined
    };

    try {
      const res = await client.create(sanityDoc);
      console.log(`✅ Créé: ${res._id}`);
    } catch (err: any) {
      console.error(`❌ Échec création ${product.title}:`, err.message);
    }
  }

  console.log('\n🏁 Importation terminée !');
}

importData();