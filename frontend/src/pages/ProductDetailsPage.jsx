import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts } from '../services/api'; // Wir nutzen die existierende Funktion!

export default function ProductDetailsPage() {
  const { id } = useParams(); // Die ID aus der URL (z.B. "101")
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findProductInList = async () => {
      try {
        setIsLoading(true);
        
        // 1. Wir holen ALLE Produkte (Backend Request: /offer/getAvailableProducts)
        const allProducts = await fetchProducts();
        
        // 2. Wir suchen lokal in der Liste nach der passenden ID
        // Wir loggen die Daten, um zu sehen, was ankommt (F12 Konsole prüfen!)
        console.log("Suche nach ID:", id);
        console.log("Alle Produkte:", allProducts);

        const foundProduct = allProducts.find(p => {
            // Strikter Check: Wir vergleichen nur, wenn das Produkt auch wirklich eine ID hat
            if (p.offerId && String(p.offerId) === id) return true;
            if (p.id && String(p.id) === id) return true;
            return false;
        });

        if (foundProduct) {
            setProduct(foundProduct);
        } else {
            setError("Produkt nicht gefunden.");
        }

      } catch (err) {
        console.error(err);
        setError("Fehler beim Laden der Daten.");
      } finally {
        setIsLoading(false);
      }
    };

    findProductInList();
  }, [id]);

  // --- Ladezustand & Fehler ---
  if (isLoading) return <div className="p-20 text-center font-bold text-stone-500">Lade Produktdetails...</div>;
  
  if (error || !product) return (
    <div className="p-20 text-center">
        <h2 className="text-xl font-bold text-stone-800 mb-2">{error || "Produkt nicht gefunden"}</h2>
        <Link to="/" className="text-orange-600 hover:underline">Zurück zum Marktplatz</Link>
    </div>
  );

  // --- DATEN AUFBEREITEN ---
  const priceFormatted = (product.price / 100).toFixed(2);
  const fallbackImage = "https://placehold.co/600x600?text=Kein+Bild";
  // Nimm das erste Bild oder den Fallback
  const mainImage = product.images && product.images.length > 0 ? product.images[0].imageUrl : fallbackImage;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link to="/" className="text-stone-500 hover:text-orange-600 mb-6 inline-block font-medium transition-colors">
        ← Zurück zum Marktplatz
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
        
        {/* Bild Bereich */}
        <div className="aspect-square bg-stone-100 rounded-2xl overflow-hidden shadow-inner relative">
          <img 
            src={mainImage} 
            alt={product.title} 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = fallbackImage; }} 
          />
        </div>

        {/* Info Bereich */}
        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {product.condition || 'Zustand unbekannt'}
            </span>
          </div>
          
          <h1 className="text-4xl font-black text-stone-900 mb-6 leading-tight">{product.title}</h1>
          
          <div className="prose prose-stone mb-8 text-stone-600 leading-relaxed">
            <p>{product.description || "Keine detaillierte Beschreibung verfügbar."}</p>
          </div>
          
          <div className="flex items-center justify-between border-t border-stone-100 pt-8 mt-auto">
            <div>
              <p className="text-stone-400 text-xs font-bold uppercase tracking-wide mb-1">Preis</p>
              <p className="text-4xl font-black text-orange-600">{priceFormatted} €</p>
            </div>
            
            <button 
                onClick={() => alert(`Gekauft! (Backend Logik hier einfügen)`)}
                className="bg-stone-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all hover:shadow-lg hover:shadow-orange-600/30 active:scale-95"
            >
              Jetzt Kaufen
            </button>
          </div>

          <div className="mt-8 text-sm text-stone-400 flex items-center gap-2">
            <span>Verkauft von</span>
            <span className="font-bold text-stone-600 bg-stone-100 px-2 py-1 rounded">
                {product.seller || product.username || "Verkäufer"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}