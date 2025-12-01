export default function ProductCard({ title, price, category, imageUrl }) {
  // Eine Platzhalter-URL, falls gar kein Bild da ist oder der Link kaputt ist
  const fallbackImage = "https://placehold.co/600x600?text=Kein+Bild";

  return (
    <div className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="aspect-square bg-stone-100 relative overflow-hidden">
         <img 
            src={imageUrl || fallbackImage} // Wenn imageUrl leer ist, nimm direkt den Platzhalter
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            // Das hier ist neu: Wenn das Bild nicht geladen werden kann (404), tausche es aus
            onError={(e) => {
              e.target.onerror = null; // Verhindert Endlosschleife
              e.target.src = fallbackImage;
            }}
         />
         <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-stone-800">
           {category}
         </span>
      </div>
      <div className="p-4">
          <h3 className="font-bold text-stone-900 line-clamp-1">{title}</h3>
          <p className="text-orange-600 font-black text-lg mt-1">{price} €</p>
      </div>
    </div>
  );
}