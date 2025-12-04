import React, { useState, useEffect } from 'react';

// --- FÜR DEIN ECHTES PROJEKT: ---
// Bitte diese Zeilen einkommentieren und den Mock-Code unten löschen!
// import { fetchAccountPageData, fetchWatchlist } from '../services/api'; 
// import ProductCard from '../components/ProductCard';

// =====================================================================
// === MOCK CODE (Damit die Vorschau hier funktioniert) ================
// =====================================================================

// 1. Mock ProductCard Komponente
const ProductCard = ({ title, price, category, imageUrl }) => (
  <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
    <div className="h-48 bg-stone-100 flex items-center justify-center text-stone-400 overflow-hidden relative">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <span className="text-4xl">☕</span>
      )}
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-stone-600 shadow-sm">
        {category || 'Neu'}
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-stone-900 truncate text-lg" title={title}>{title}</h3>
      <p className="text-orange-600 font-black mt-1 text-xl">{price} €</p>
    </div>
  </div>
);

// 2. Mock API Funktionen & Daten
const mockAccountData = {
  accountData: {
    firstName: 'Max',
    lastName: 'Kaffeefan',
    email: 'max.mustermann@mail.com',
    birthday: '1985-05-19T22:00:00.000Z',
    addressDto: {
      street: 'Bohnenweg 5',
      postcode: '10115',
      province: 'Berlin'
    }
  },
  products: [
    { offerId: 101, title: 'Espresso Blend "Dark Knight"', price: 2499, condition: 'Neu' }
  ]
};

// Hier simulieren wir die Datenstruktur, wie sie von deiner neuen Watchlist-Tabelle kommen könnte
const mockWatchlistData = [
  { 
    watchlistId: 1, 
    // Fall 1: Verschachteltes Produkt (Java Entity Struktur)
    product: { 
        title: 'Siebträgermaschine Profi', 
        price: 85000, 
        condition: 'Gut',
        imageUrl: 'https://images.unsplash.com/photo-1570554807469-6d60a581413a?auto=format&fit=crop&q=80&w=400'
    } 
  },
  { 
    watchlistId: 2, 
    // Fall 2: Flache Struktur (Fallback)
    title: 'Tamper Set (58mm)', 
    price: 2000, 
    condition: 'Gebraucht'
  }
];

const fetchAccountPageData = async (username) => {
  return new Promise((resolve) => setTimeout(() => resolve(mockAccountData), 600));
};

const fetchWatchlist = async (username) => {
  return new Promise((resolve) => setTimeout(() => resolve(mockWatchlistData), 800));
};
// =====================================================================
// === ENDE MOCK CODE ==================================================
// =====================================================================


export default function AccountPage() {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    birthday: '',
    street: '',
    postcode: '',
    city: ''
  });

  const [myOffers, setMyOffers] = useState([]);
  
  // Watchlist State
  const [myWatchlist, setMyWatchlist] = useState([]); 
  const [watchlistError, setWatchlistError] = useState(null); // Neuer State für Watchlist-Fehler

  const [activeTab, setActiveTab] = useState('profile'); // State für Tabs

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [debugData, setDebugData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Mock Username für Vorschau
        const storedUsername = localStorage.getItem("username") || "previewUser";

        if (!storedUsername) {
          throw new Error("Nicht eingeloggt (Kein Username gefunden).");
        }

        // 1. Account Daten laden
        const dto = await fetchAccountPageData(storedUsername);
        
        console.log("🔥 PROFIL-DATEN:", dto);
        setDebugData(dto); 

        const acc = dto.accountData || {}; 
        const addr = acc.addressDto || {}; 

        setUserData({
          firstname: acc.firstName || '',
          lastname: acc.lastName || '',
          email: acc.email || '',
          birthday: acc.birthday ? acc.birthday.toString().split('T')[0] : '',
          street: addr.street || '',
          postcode: addr.postcode || '',
          city: addr.province || '' 
        });

        if (dto.products && Array.isArray(dto.products)) {
            setMyOffers(dto.products);
        }

        // 2. Watchlist separat laden
        try {
            setWatchlistError(null); // Reset Fehler vor neuem Laden
            const watchlistData = await fetchWatchlist(storedUsername);
            console.log("🔥 WATCHLIST RAW DATEN:", watchlistData);
            
            if (Array.isArray(watchlistData)) {
                setMyWatchlist(watchlistData);
            } else {
                console.warn("Watchlist ist kein Array:", watchlistData);
            }
        } catch (wlError) {
            console.error("Fehler beim Laden der Watchlist:", wlError);
            setWatchlistError(wlError.message || "Konnte Watchlist nicht laden");
        }

      } catch (err) {
        console.error("Haupt-Fehler:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Speichern an Backend gesendet!");
    setIsEditing(false);
  };

  if (isLoading) return <div className="p-10 text-center font-bold text-stone-500 animate-pulse">Lade Profil...</div>;
  
  if (error) return (
    <div className="p-10 text-center">
      <h2 className="text-red-600 font-bold mb-2">Fehler beim Laden</h2>
      <p className="text-stone-600">{error}</p>
      <a href="/" className="underline mt-4 block text-stone-900 hover:text-orange-600">Zurück zur Startseite</a>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 font-sans text-stone-800">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-stone-900">Mein Konto</h1>
          <p className="text-stone-500 mt-2">Verwalte deine persönlichen Daten und Adressen.</p>
        </div>
      </div>

      {/* --- TABS NAVIGATION --- */}
      <div className="flex space-x-8 border-b border-stone-200 mb-10 overflow-x-auto">
        <button 
            onClick={() => setActiveTab('profile')}
            className={`pb-4 font-bold text-lg transition-colors border-b-2 whitespace-nowrap ${activeTab === 'profile' ? 'border-orange-600 text-orange-600' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
        >
            Profil & Daten
        </button>
        <button 
            onClick={() => setActiveTab('offers')}
            className={`pb-4 font-bold text-lg transition-colors border-b-2 whitespace-nowrap ${activeTab === 'offers' ? 'border-orange-600 text-orange-600' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
        >
            Meine Angebote <span className="ml-2 bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full">{myOffers.length}</span>
        </button>
        <button 
            onClick={() => setActiveTab('watchlist')}
            className={`pb-4 font-bold text-lg transition-colors border-b-2 whitespace-nowrap ${activeTab === 'watchlist' ? 'border-orange-600 text-orange-600' : 'border-transparent text-stone-500 hover:text-stone-800'}`}
        >
            Merkliste 
            {myWatchlist.length > 0 && (
                <span className="ml-2 bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full">{myWatchlist.length}</span>
            )}
            {watchlistError && <span className="ml-2 text-red-500 text-xs">⚠️</span>}
        </button>
      </div>


      {/* --- CONTENT: PROFIL --- */}
      {activeTab === 'profile' && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-in fade-in zoom-in-95 duration-300">
        
        <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center shadow-sm space-y-6">
                <div className="w-24 h-24 bg-stone-900 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                    {userData.firstname && userData.firstname.charAt(0)}
                    {userData.lastname && userData.lastname.charAt(0)}
                </div>
                <h2 className="font-bold text-xl">
                  {userData.firstname ? `${userData.firstname} ${userData.lastname}` : 'Unbekannter Nutzer'}
                </h2>
                <p className="text-stone-500 text-sm mb-4">{userData.email || 'Keine E-Mail'}</p>
                <div className="pt-4 border-t border-stone-100">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                        Verifizierter Verkäufer
                    </span>
                </div>
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="w-full mt-4 bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <span>✎</span> Bearbeiten
                    </button>
                )}
            </div>
        </div>

        <div className="md:col-span-2">
            <form onSubmit={handleSave} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                
                <h3 className="font-bold text-lg border-b border-stone-100 pb-2 mb-4 text-stone-800">Persönliche Daten</h3>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Vorname</label>
                        <input 
                            type="text" 
                            name="firstname"
                            value={userData.firstname}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full border rounded-lg px-4 py-2 transition-all outline-none ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Nachname</label>
                        <input 
                            type="text" 
                            name="lastname"
                            value={userData.lastname}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full border rounded-lg px-4 py-2 transition-all outline-none ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">E-Mail</label>
                    <input 
                        type="email" 
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        disabled={true}
                        className="w-full bg-stone-50 border border-stone-200 text-stone-500 rounded-lg px-4 py-2 cursor-not-allowed outline-none"
                    />
                </div>

                <h3 className="font-bold text-lg border-b border-stone-100 pb-2 mb-4 pt-4 text-stone-800">Anschrift</h3>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">Straße & Hausnummer</label>
                    <input 
                        type="text" 
                        name="street"
                        value={userData.street}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder={isEditing ? "Musterstraße 1" : ""}
                        className={`w-full border rounded-lg px-4 py-2 transition-all outline-none ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-stone-700 mb-1">PLZ</label>
                        <input 
                            type="text" 
                            name="postcode"
                            value={userData.postcode}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full border rounded-lg px-4 py-2 transition-all outline-none ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-stone-700 mb-1">Stadt</label>
                        <input 
                            type="text" 
                            name="city"
                            value={userData.city}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full border rounded-lg px-4 py-2 transition-all outline-none ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
                        />
                    </div>
                </div>

                {isEditing && (
                    <div className="flex gap-4 pt-6 animate-in fade-in slide-in-from-top-2">
                        <button 
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex-1 bg-stone-100 text-stone-700 font-bold py-3 rounded-xl hover:bg-stone-200 transition-colors"
                        >
                            Abbrechen
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 bg-orange-600 text-white hover:bg-orange-50 hover:text-orange-700 font-bold py-3 rounded-xl transition-colors shadow-lg"
                        >
                            Speichern
                        </button>
                    </div>
                )}
            </form>
        </div>
      </div>
      )}


      {/* --- CONTENT: ANGEBOTE --- */}
      {activeTab === 'offers' && (
      <div className="mt-4 animate-in fade-in zoom-in-95 duration-300">
        <h2 className="text-2xl font-black text-stone-900 mb-6">
          Meine aktiven Angebote ({myOffers.length})
        </h2>

        {myOffers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myOffers.map((product) => (
              <ProductCard 
                key={product.offerId || product.id || Math.random()} 
                title={product.title}
                price={(product.price / 100).toFixed(2)}
                category={product.condition}
                imageUrl={product.images && product.images.length > 0 ? product.images[0].imageUrl : null}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200 border-dashed">
            <p className="text-stone-500 font-medium mb-4">Du hast noch keine Artikel eingestellt.</p>
            <button className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg">
              Jetzt Artikel verkaufen
            </button>
          </div>
        )}
      </div>
      )}

      {/* --- CONTENT: WATCHLIST --- */}
      {activeTab === 'watchlist' && (
      <div className="mt-4 animate-in fade-in zoom-in-95 duration-300">
        <h2 className="text-2xl font-black text-stone-900 mb-6">
          Meine Merkliste ({myWatchlist.length})
        </h2>

        {/* FEHLERMELDUNG ANZEIGEN, falls vorhanden */}
        {watchlistError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <strong>Fehler beim Laden der Merkliste:</strong> {watchlistError}
                <p className="text-sm mt-1">Prüfe die Browser-Konsole für Details oder ob das Backend läuft.</p>
            </div>
        )}

        {myWatchlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myWatchlist.map((item) => {
                // Zugriff auf das Produkt innerhalb des Watchlist-Items
                // Wir prüfen, ob es 'product' (Java-Entity neu) oder direkt im Item liegt (flat)
                const product = item.product || item; 
                
                // Fallback für fehlende Werte, um Crash zu verhindern
                const title = product.title || product.productName || "Unbekanntes Produkt";
                const price = product.price ? (product.price / 100).toFixed(2) : "0.00";
                const imageUrl = product.imageUrl || (product.images && product.images.length > 0 ? product.images[0].imageUrl : null);

                return (
                  <ProductCard 
                    key={item.watchlistId || Math.random()} 
                    title={title}
                    price={price}
                    category={product.condition}
                    imageUrl={imageUrl}
                  />
                );
            })}
          </div>
        ) : (
          !watchlistError && (
            <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200 border-dashed">
                <span className="text-4xl block mb-2">👀</span>
                <p className="text-stone-500 font-medium mb-4">Du hast dir noch keine Produkte gemerkt.</p>
                <a href="/shop" className="text-orange-600 font-bold hover:underline">
                Stöbere jetzt im Shop
                </a>
            </div>
          )
        )}
      </div>
      )}

    </div>
  );
}