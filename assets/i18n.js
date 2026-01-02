/* Badiani Il Barattolo - lightweight i18n + language switcher
   Supports: en, it, es, fr
   - Persists selection in localStorage
   - Updates <html lang>
   - Translates key UI strings for both desktop and mobile pages
*/

(function () {
  'use strict';

  const SUPPORTED = ['en', 'it', 'es', 'fr'];
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'badianiLang';

  /** @type {Record<string, Record<string, string>>} */
  const STRINGS = {
    en: {
      'lang.name.en': 'English',
      'lang.name.it': 'Italiano',
      'lang.name.es': 'Español',
      'lang.name.fr': 'Français',

      'nav.home': 'Home',
      'nav.story': 'Story',
      'nav.products': 'Products',
      'nav.heritage': 'Heritage',
      'nav.barattolo': 'Il Barattolo',
      'nav.contact': 'Contact',

      'header.beInspired': 'BE INSPIRED',

      'music.on': 'Music: On',
      'music.off': 'Music: Off',

      'customizer.title': 'Create Your Gelato',
      'customizer.subtitle': 'Choose your favorite flavors for your custom cursor!',
      'customizer.leftScoop': 'Left Scoop',
      'customizer.rightScoop': 'Right Scoop',
      'customizer.previewTitle': 'Your Custom Cursor',
      'customizer.close': 'Close',

      'flavor.hazelnut': 'Hazelnut',
      'flavor.strawberry': 'Strawberry',
      'flavor.pistachio': 'Pistachio',
      'flavor.buontalenti': 'Buontalenti',
      'flavor.mango': 'Mango',
      'flavor.blueberry': 'Blueberry',

      'hero.subtitle': 'A Creative Flavour Journey from Florence',
      'hero.lead': 'Authentic Florentine artisan gelato for premium retail distribution. Over 90 years of gelato-making excellence from the birthplace of gelato.',
      'hero.ctaExplore': 'Explore Flavours',
      'hero.ctaAria': 'Jump to products',

      'banner.hero': 'iconic italian gelato · since 1932 · from florence with love',
      'banner.story': 'the renaissance of gelato · born in florence 1932 · tradition meets innovation',
      'banner.heritage': 'from florence to the world · 93 years of excellence · a global legacy',
      'banner.barattolo': 'il barattolo · premium retail format · authentic florentine gelato at home',
      'banner.products': 'award-winning flavours · classico · pistacchio · dolcevita',
      'banner.mission': 'artisan craftsmanship · premium ingredients · unforgettable taste',
      'banner.gallery': 'artisan texture · handcrafted swirls · visual delight in every spoonful',
      'banner.locations': 'london · barcelona · paris · tokyo · florence · everywhere in style',
      'banner.why': 'heritage · quality · global reach · retail excellence · choose badiani',
      'banner.contact': "partner with us · bring florence to your customers · let's grow together",

      'story.title': 'Buontalenti: The Cream That Made History',
      'story.lead': 'In the 1960s, in Florence, Badiani dedicated a special flavour to Bernardo Buontalenti, the Renaissance architect to whom tradition attributes the birth of gelato in the 16th century.',
      'story.leadHtml': 'In the 1960s, in Florence, Badiani dedicated a special flavour to <span class="highlight-pink">Bernardo Buontalenti</span>, the Renaissance architect to whom tradition attributes the birth of <span class="highlight-pink">gelato</span> in the 16th century.',
      'story.tl.origin': 'The Origin',
      'story.tl.originDesc': 'Bernardo Buontalenti invents gelato in Renaissance Florence, creating a frozen delicacy for the Medici court.',
      'story.tl.originDescHtml': 'Bernardo Buontalenti invents gelato in <span class="highlight-pink">Renaissance Florence</span>, creating a frozen delicacy for the Medici court.',
      'story.tl.tribute': 'The Tribute',
      'story.tl.tributeDesc': 'Badiani creates the “Buontalenti” cream with 4 simple ingredients (cream, milk, sugar, eggs) honouring the inventor.',
      'story.tl.tributeDescHtml': 'Badiani creates the “Buontalenti” cream with <span class="highlight-pink">4 simple ingredients</span> (cream, milk, sugar, eggs) honouring the inventor.',
      'story.tl.legacy': 'The Legacy',
      'story.tl.legacyDesc': 'Il Barattolo Gelato brings this iconic Florentine flavour to premium retail worldwide.',
      'story.tl.legacyDescHtml': 'Il Barattolo Gelato brings this iconic Florentine flavour to <span class="highlight-pink">premium retail</span> worldwide.',

      'heritage.title': 'A Legacy of Excellence',
      'heritage.intro': "Born in Florence in 1932, Badiani is one of the world's most prestigious gelato producers. From the birthplace of gelato, we have built an international presence spanning five countries across three continents.",
      'heritage.introHtml': "Born in <span class=\"highlight-pink\">Florence in 1932</span>, Badiani is one of the world's most prestigious gelato producers. From the birthplace of gelato, we have built an international presence spanning five countries across three continents.",
      'heritage.stat.founded': 'Founded in Florence',
      'heritage.stat.stores': 'Stores Worldwide',
      'heritage.stat.quality': 'Artisan Quality',
      'heritage.stat.countries': 'Countries',

      'barattolo.p1': 'Thanks to the success of our Buontalenti, Buontalenti Pistacchio, and La Dolcevita flavours, we have developed Il Barattolo GELATO — a premium line designed for large-scale distribution.',
      'barattolo.p1Html': 'Thanks to the success of our Buontalenti, Buontalenti Pistacchio, and La Dolcevita flavours, we have developed <span class="highlight-pink">Il Barattolo GELATO</span> — a premium line designed for <span class="highlight-pink">large-scale distribution</span>.',
      'barattolo.p2': 'This innovative format brings the authentic artisanal quality of our gelato to a wider audience, making it more accessible without compromising on ingredient excellence and traditional craftsmanship.',
      'barattolo.p3': 'With Il Barattolo Gelato, everyone can enjoy the rich, creamy flavours that have made Badiani famous, now in a convenient 500ml format.',
      'barattolo.p3Html': 'With Il Barattolo Gelato, everyone can enjoy the rich, creamy flavours that have made Badiani famous, now in a convenient <span class="highlight-pink">500ml format</span>.',

      'products.titlePrefix': 'Premium',
      'products.titleEm': 'Collection',
      'products.subtitle': 'Three iconic flavours, authentic Florentine craftsmanship',

      'btn.viewSpecs': 'View Specs',

      'award.bestFlavour2015': 'Best Flavour 2015',
      'award.worldBestSeller': 'World Best-Seller',

      'card.classico.desc': 'Our world-famous flagship flavour made with only four ingredients: cream, milk, sugar, and free-range eggs.',
      'card.classico.f1': '4 ingredients only',
      'card.classico.f2': 'Free-range eggs',
      'card.classico.f3': 'Gluten-free',
      'card.classico.f4': '24-month shelf life',

      'card.dolcevita.desc': 'Custard gelato with gianduia hazelnut-cocoa spread (20%). Made with Italian hazelnut paste and Madagascar Bourbon vanilla.',
      'card.dolcevita.f1': 'Italian hazelnut 2.6%',
      'card.dolcevita.f2': 'Madagascar vanilla',
      'card.dolcevita.f3': 'Gluten-free',
      'card.dolcevita.f4': 'Award-winning',

      'card.pistacchio.desc': 'Our most popular flavour worldwide. Custard gelato swirled with pistachio spreadable cream (20%) and 5% pure pistachio paste.',
      'card.pistacchio.f1': '5% pistachio paste',
      'card.pistacchio.f2': 'Free-range eggs',
      'card.pistacchio.f3': 'Gluten-free',
      'card.pistacchio.f4': 'Global favourite',

      'mission.tab.mission': 'Mission',
      'mission.tab.vision': 'Vision',
      'mission.title': 'Our Mission',
      'mission.strong': 'Bring Flavour to Your Life',
      'mission.body': 'To bring joy to consumers of all ages through our iconic artisan gelato, always adhering to principles of high quality and sustainability.',
      'vision.title': 'Our Vision',
      'vision.strong': 'Inspiring the World with Gelato',
      'vision.body': 'To become the finest gelato brand in the world and inspire people with the taste of freshly-made artisan products.',

      'gallery.title': 'Artisan Texture',
      'gallery.subtitle': 'Beautiful variegated swirls showcase our authentic artisanal craftsmanship',

      'locations.aria': 'Badiani around the world means gelato',
      'locations.top': 'Badiani Around The World',
      'locations.mid': 'Means',
      'locations.bottom': 'Gelato',
      'mobile.scrollHint': '← Scroll to see it all →',

      'why.title': 'Why Choose Badiani',
      'why.b1.title': 'Heritage',
      'why.b1.desc': '93 years of gelato-making excellence from Florence, the birthplace of gelato',
      'why.b1.descHtml': '<span class="highlight-pink">93 years</span> of gelato-making excellence from Florence, the birthplace of gelato',
      'why.b2.title': 'Global Presence',
      'why.b2.desc': '30+ stores worldwide including the Louvre Museum in Paris',
      'why.b2.descHtml': '30+ stores worldwide including the <span class="highlight-pink">Louvre Museum</span> in Paris',
      'why.b3.title': 'Artisan Quality',
      'why.b3.desc': 'Premium Italian ingredients, award-winning recipes, traditional craftsmanship',
      'why.b4.title': 'Retail Ready',
      'why.b4.desc': '500ml format, 24-month shelf life at -18°C, EUR/EPAL pallet compatible',
      'why.b4.descHtml': '500ml format, <span class="highlight-pink">24-month shelf life</span> at -18°C, EUR/EPAL pallet compatible',

      'contact.title': 'Partner With Badiani',
      'contact.highlight': 'Bring the authentic taste of Florence to your customers',
      'contact.cta': 'Request Distribution Info',
      'contact.ctaAria': 'Request distribution information via email',

      'footer.html': '&copy; {year} <span>Badiani Gelato Firenze 1932</span> &middot; Manufactured by G7 s.r.l., Via Romagnoli 19, Bentivoglio (BO) Italy',

      'spec.productCode': 'Product Code',
      'spec.description': 'Description',
      'spec.netWeight': 'Net Weight',
      'spec.eanProduct': 'EAN Product',
      'spec.eanCarton': 'EAN Carton',
      'spec.shelfLife': 'Shelf Life',
      'spec.energy': 'Energy',
      'spec.allergens': 'Allergens',
      'spec.mayContain': 'May Contain',
      'spec.gluten': 'Gluten',

      'specValue.custardGelato': 'Custard Gelato',
      'specValue.dolcevitaDesc': 'Custard gelato with gianduia spread 20%',
      'specValue.pistacchioDesc': 'Custard gelato with pistachio spread 20%',
      'specValue.shelfLife24': '24 months at -18°C (-0.4°F)',
      'specValue.glutenFree': 'GLUTEN FREE',
      'specValue.mayContain.classico': 'SOY, NUTS, PEANUTS',
      'specValue.mayContain.dolcevita': 'SOY, other NUTS, PEANUTS',
      'specValue.mayContain.pistacchio': 'SOY, other NUTS, PEANUTS'
    },

    it: {
      'lang.name.en': 'Inglese',
      'lang.name.it': 'Italiano',
      'lang.name.es': 'Spagnolo',
      'lang.name.fr': 'Francese',

      'nav.home': 'Home',
      'nav.story': 'Storia',
      'nav.products': 'Prodotti',
      'nav.heritage': 'Heritage',
      'nav.barattolo': 'Il Barattolo',
      'nav.contact': 'Contatti',

      'header.beInspired': 'LASCIATI ISPIRARE',

      'music.on': 'Musica: On',
      'music.off': 'Musica: Off',

      'customizer.title': 'Crea il tuo Gelato',
      'customizer.subtitle': 'Scegli i tuoi gusti preferiti per il cursore personalizzato!',
      'customizer.leftScoop': 'Pallina sinistra',
      'customizer.rightScoop': 'Pallina destra',
      'customizer.previewTitle': 'Il tuo cursore',
      'customizer.close': 'Chiudi',

      'flavor.hazelnut': 'Nocciola',
      'flavor.strawberry': 'Fragola',
      'flavor.pistachio': 'Pistacchio',
      'flavor.buontalenti': 'Buontalenti',
      'flavor.mango': 'Mango',
      'flavor.blueberry': 'Mirtillo',

      'hero.subtitle': 'Un viaggio creativo nei sapori da Firenze',
      'hero.lead': "Gelato artigianale fiorentino autentico per la distribuzione retail premium. Oltre 90 anni di eccellenza nella gelateria, dalla città in cui è nato il gelato.",
      'hero.ctaExplore': 'Scopri i gusti',
      'hero.ctaAria': 'Vai ai prodotti',

      'banner.hero': 'gelato italiano iconico · dal 1932 · da firenze con amore',
      'banner.story': 'il rinascimento del gelato · nato a firenze nel 1932 · tradizione e innovazione',
      'banner.heritage': 'da firenze al mondo · 93 anni di eccellenza · un’eredità globale',
      'banner.barattolo': 'il barattolo · formato retail premium · gelato fiorentino a casa',
      'banner.products': 'gusti premiati · classico · pistacchio · dolcevita',
      'banner.mission': 'artigianalità · ingredienti premium · gusto indimenticabile',
      'banner.gallery': 'texture artigianale · variegature fatte a mano · bellezza in ogni cucchiaio',
      'banner.locations': 'londra · barcellona · parigi · tokyo · firenze · ovunque con stile',
      'banner.why': 'heritage · qualità · presenza globale · eccellenza retail · scegli badiani',
      'banner.contact': 'collabora con noi · porta firenze ai tuoi clienti · cresciamo insieme',

      'story.title': 'Buontalenti: la crema che ha fatto storia',
      'story.lead': 'Negli anni ’60, a Firenze, Badiani dedicò un gusto speciale a Bernardo Buontalenti, l’architetto rinascimentale a cui la tradizione attribuisce la nascita del gelato nel XVI secolo.',
      'story.leadHtml': 'Negli anni ’60, a Firenze, Badiani dedicò un gusto speciale a <span class="highlight-pink">Bernardo Buontalenti</span>, l’architetto rinascimentale a cui la tradizione attribuisce la nascita del <span class="highlight-pink">gelato</span> nel XVI secolo.',
      'story.tl.origin': 'L’origine',
      'story.tl.originDesc': 'Bernardo Buontalenti inventa il gelato nella Firenze rinascimentale, creando una delizia ghiacciata per la corte dei Medici.',
      'story.tl.originDescHtml': 'Bernardo Buontalenti inventa il gelato nella <span class="highlight-pink">Firenze rinascimentale</span>, creando una delizia ghiacciata per la corte dei Medici.',
      'story.tl.tribute': 'L’omaggio',
      'story.tl.tributeDesc': 'Badiani crea la crema “Buontalenti” con 4 ingredienti semplici (panna, latte, zucchero, uova) in onore dell’inventore.',
      'story.tl.tributeDescHtml': 'Badiani crea la crema “Buontalenti” con <span class="highlight-pink">4 ingredienti semplici</span> (panna, latte, zucchero, uova) in onore dell’inventore.',
      'story.tl.legacy': 'L’eredità',
      'story.tl.legacyDesc': 'Il Barattolo Gelato porta questo iconico gusto fiorentino nel retail premium in tutto il mondo.',
      'story.tl.legacyDescHtml': 'Il Barattolo Gelato porta questo iconico gusto fiorentino nel <span class="highlight-pink">retail premium</span> in tutto il mondo.',

      'heritage.title': 'Un’eredità di eccellenza',
      'heritage.intro': 'Nata a Firenze nel 1932, Badiani è tra i produttori di gelato più prestigiosi al mondo. Dalla città in cui è nato il gelato, abbiamo costruito una presenza internazionale in cinque paesi su tre continenti.',
      'heritage.introHtml': 'Nata a <span class="highlight-pink">Firenze nel 1932</span>, Badiani è tra i produttori di gelato più prestigiosi al mondo. Dalla città in cui è nato il gelato, abbiamo costruito una presenza internazionale in cinque paesi su tre continenti.',
      'heritage.stat.founded': 'Fondata a Firenze',
      'heritage.stat.stores': 'Negozi nel mondo',
      'heritage.stat.quality': 'Qualità artigianale',
      'heritage.stat.countries': 'Paesi',

      'barattolo.p1': 'Grazie al successo dei gusti Buontalenti, Buontalenti Pistacchio e La Dolcevita, abbiamo sviluppato Il Barattolo GELATO — una linea premium pensata per la distribuzione su larga scala.',
      'barattolo.p1Html': 'Grazie al successo dei gusti Buontalenti, Buontalenti Pistacchio e La Dolcevita, abbiamo sviluppato <span class="highlight-pink">Il Barattolo GELATO</span> — una linea premium pensata per la <span class="highlight-pink">distribuzione su larga scala</span>.',
      'barattolo.p2': 'Questo formato innovativo porta la qualità autenticamente artigianale del nostro gelato a un pubblico più ampio, rendendolo più accessibile senza compromessi sugli ingredienti e sulla lavorazione tradizionale.',
      'barattolo.p3': 'Con Il Barattolo Gelato, tutti possono gustare i sapori ricchi e cremosi che hanno reso Badiani famosa, ora nel comodo formato da 500ml.',
      'barattolo.p3Html': 'Con Il Barattolo Gelato, tutti possono gustare i sapori ricchi e cremosi che hanno reso Badiani famosa, ora nel comodo <span class="highlight-pink">formato da 500ml</span>.',

      'products.titlePrefix': 'Collezione',
      'products.titleEm': 'Premium',
      'products.subtitle': 'Tre gusti iconici, autentica maestria fiorentina',

      'btn.viewSpecs': 'Scheda tecnica',

      'award.bestFlavour2015': 'Miglior gusto 2015',
      'award.worldBestSeller': 'Best-seller mondiale',

      'card.classico.desc': 'Il nostro gusto di punta, famoso in tutto il mondo, realizzato con soli quattro ingredienti: panna, latte, zucchero e uova da allevamento all’aperto.',
      'card.classico.f1': 'Solo 4 ingredienti',
      'card.classico.f2': 'Uova da allevamento all’aperto',
      'card.classico.f3': 'Senza glutine',
      'card.classico.f4': 'Shelf life 24 mesi',

      'card.dolcevita.desc': 'Gelato alla crema con variegatura alla gianduia (20%). Con pasta di nocciola italiana e vaniglia Bourbon del Madagascar.',
      'card.dolcevita.f1': 'Nocciola italiana 2,6%',
      'card.dolcevita.f2': 'Vaniglia del Madagascar',
      'card.dolcevita.f3': 'Senza glutine',
      'card.dolcevita.f4': 'Premiato',

      'card.pistacchio.desc': 'Il nostro gusto più amato nel mondo. Gelato alla crema con variegatura al pistacchio (20%) e pasta di pistacchio puro al 5%.',
      'card.pistacchio.f1': '5% pasta di pistacchio',
      'card.pistacchio.f2': 'Uova da allevamento all’aperto',
      'card.pistacchio.f3': 'Senza glutine',
      'card.pistacchio.f4': 'Preferito globale',

      'mission.tab.mission': 'Mission',
      'mission.tab.vision': 'Vision',
      'mission.title': 'La nostra missione',
      'mission.strong': 'Portare gusto nella tua vita',
      'mission.body': 'Portare gioia ai consumatori di tutte le età con il nostro gelato artigianale iconico, seguendo sempre principi di alta qualità e sostenibilità.',
      'vision.title': 'La nostra visione',
      'vision.strong': 'Ispirare il mondo con il gelato',
      'vision.body': 'Diventare il miglior brand di gelato al mondo e ispirare le persone con il gusto di prodotti artigianali appena fatti.',

      'gallery.title': 'Texture artigianale',
      'gallery.subtitle': 'Variegature bellissime che raccontano la nostra lavorazione autenticamente artigianale',

      'locations.aria': 'Badiani nel mondo significa gelato',
      'locations.top': 'Badiani nel mondo',
      'locations.mid': 'significa',
      'locations.bottom': 'gelato',
      'mobile.scrollHint': '← Scorri per vedere tutto →',

      'why.title': 'Perché scegliere Badiani',
      'why.b1.title': 'Heritage',
      'why.b1.desc': '93 anni di eccellenza nella gelateria da Firenze, la culla del gelato',
      'why.b1.descHtml': '<span class="highlight-pink">93 anni</span> di eccellenza nella gelateria da Firenze, la culla del gelato',
      'why.b2.title': 'Presenza globale',
      'why.b2.desc': 'Oltre 30 negozi nel mondo, incluso il Museo del Louvre a Parigi',
      'why.b2.descHtml': 'Oltre 30 negozi nel mondo, incluso il <span class="highlight-pink">Museo del Louvre</span> a Parigi',
      'why.b3.title': 'Qualità artigianale',
      'why.b3.desc': 'Ingredienti italiani premium, ricette premiate, lavorazione tradizionale',
      'why.b4.title': 'Pronto per il retail',
      'why.b4.desc': 'Formato 500ml, shelf life 24 mesi a -18°C, compatibile con pallet EUR/EPAL',
      'why.b4.descHtml': 'Formato 500ml, <span class="highlight-pink">shelf life 24 mesi</span> a -18°C, compatibile con pallet EUR/EPAL',

      'contact.title': 'Collabora con Badiani',
      'contact.highlight': 'Porta il gusto autentico di Firenze ai tuoi clienti',
      'contact.cta': 'Richiedi info distribuzione',
      'contact.ctaAria': 'Richiedi informazioni sulla distribuzione via email',

      'footer.html': '&copy; {year} <span>Badiani Gelato Firenze 1932</span> &middot; Prodotto da G7 s.r.l., Via Romagnoli 19, Bentivoglio (BO) Italia',

      'spec.productCode': 'Codice prodotto',
      'spec.description': 'Descrizione',
      'spec.netWeight': 'Peso netto',
      'spec.eanProduct': 'EAN prodotto',
      'spec.eanCarton': 'EAN cartone',
      'spec.shelfLife': 'Shelf life',
      'spec.energy': 'Energia',
      'spec.allergens': 'Allergeni',
      'spec.mayContain': 'Può contenere',
      'spec.gluten': 'Glutine',

      'specValue.custardGelato': 'Gelato alla crema',
      'specValue.dolcevitaDesc': 'Gelato alla crema con variegatura alla gianduia 20%',
      'specValue.pistacchioDesc': 'Gelato alla crema con variegatura al pistacchio 20%',
      'specValue.shelfLife24': '24 mesi a -18°C (-0,4°F)',
      'specValue.glutenFree': 'SENZA GLUTINE',
      'specValue.mayContain.classico': 'SOIA, FRUTTA A GUSCIO, ARACHIDI',
      'specValue.mayContain.dolcevita': 'SOIA, altra FRUTTA A GUSCIO, ARACHIDI',
      'specValue.mayContain.pistacchio': 'SOIA, altra FRUTTA A GUSCIO, ARACHIDI'
    },

    es: {
      'lang.name.en': 'Inglés',
      'lang.name.it': 'Italiano',
      'lang.name.es': 'Español',
      'lang.name.fr': 'Francés',

      'nav.home': 'Inicio',
      'nav.story': 'Historia',
      'nav.products': 'Productos',
      'nav.heritage': 'Herencia',
      'nav.barattolo': 'Il Barattolo',
      'nav.contact': 'Contacto',

      'header.beInspired': 'INSPÍRATE',

      'music.on': 'Música: On',
      'music.off': 'Música: Off',

      'customizer.title': 'Crea tu helado',
      'customizer.subtitle': 'Elige tus sabores favoritos para tu cursor personalizado.',
      'customizer.leftScoop': 'Bola izquierda',
      'customizer.rightScoop': 'Bola derecha',
      'customizer.previewTitle': 'Tu cursor',
      'customizer.close': 'Cerrar',

      'flavor.hazelnut': 'Avellana',
      'flavor.strawberry': 'Fresa',
      'flavor.pistachio': 'Pistacho',
      'flavor.buontalenti': 'Buontalenti',
      'flavor.mango': 'Mango',
      'flavor.blueberry': 'Arándano',

      'hero.subtitle': 'Un viaje creativo de sabores desde Florencia',
      'hero.lead': 'Helado artesanal florentino auténtico para distribución retail premium. Más de 90 años de excelencia heladera desde la cuna del helado.',
      'hero.ctaExplore': 'Explorar sabores',
      'hero.ctaAria': 'Ir a productos',

      'banner.hero': 'helado italiano icónico · desde 1932 · desde florencia con amor',
      'banner.story': 'el renacimiento del helado · nacido en florencia 1932 · tradición e innovación',
      'banner.heritage': 'de florencia al mundo · 93 años de excelencia · un legado global',
      'banner.barattolo': 'il barattolo · formato retail premium · helado florentino en casa',
      'banner.products': 'sabores premiados · classico · pistacchio · dolcevita',
      'banner.mission': 'artesanía · ingredientes premium · sabor inolvidable',
      'banner.gallery': 'textura artesanal · remolinos hechos a mano · belleza en cada cucharada',
      'banner.locations': 'londres · barcelona · parís · tokio · florencia · en todas partes con estilo',
      'banner.why': 'herencia · calidad · alcance global · excelencia retail · elige badiani',
      'banner.contact': 'colabora con nosotros · lleva florencia a tus clientes · crezcamos juntos',

      'story.title': 'Buontalenti: la crema que hizo historia',
      'story.lead': 'En los años 60, en Florencia, Badiani dedicó un sabor especial a Bernardo Buontalenti, el arquitecto renacentista a quien la tradición atribuye el nacimiento del helado en el siglo XVI.',
      'story.leadHtml': 'En los años 60, en Florencia, Badiani dedicó un sabor especial a <span class="highlight-pink">Bernardo Buontalenti</span>, el arquitecto renacentista a quien la tradición atribuye el nacimiento del <span class="highlight-pink">helado</span> en el siglo XVI.',
      'story.tl.origin': 'El origen',
      'story.tl.originDesc': 'Bernardo Buontalenti inventa el helado en la Florencia renacentista, creando un postre helado para la corte de los Medici.',
      'story.tl.originDescHtml': 'Bernardo Buontalenti inventa el helado en la <span class="highlight-pink">Florencia renacentista</span>, creando un postre helado para la corte de los Medici.',
      'story.tl.tribute': 'El homenaje',
      'story.tl.tributeDesc': 'Badiani crea la crema “Buontalenti” con 4 ingredientes simples (nata, leche, azúcar, huevos) en honor al inventor.',
      'story.tl.tributeDescHtml': 'Badiani crea la crema “Buontalenti” con <span class="highlight-pink">4 ingredientes simples</span> (nata, leche, azúcar, huevos) en honor al inventor.',
      'story.tl.legacy': 'El legado',
      'story.tl.legacyDesc': 'Il Barattolo Gelato lleva este icónico sabor florentino al retail premium en todo el mundo.',
      'story.tl.legacyDescHtml': 'Il Barattolo Gelato lleva este icónico sabor florentino al <span class="highlight-pink">retail premium</span> en todo el mundo.',

      'heritage.title': 'Un legado de excelencia',
      'heritage.intro': 'Nacida en Florencia en 1932, Badiani es uno de los productores de helado más prestigiosos del mundo. Desde la cuna del helado, hemos construido una presencia internacional en cinco países de tres continentes.',
      'heritage.introHtml': 'Nacida en <span class="highlight-pink">Florencia en 1932</span>, Badiani es uno de los productores de helado más prestigiosos del mundo. Desde la cuna del helado, hemos construido una presencia internacional en cinco países de tres continentes.',
      'heritage.stat.founded': 'Fundada en Florencia',
      'heritage.stat.stores': 'Tiendas en el mundo',
      'heritage.stat.quality': 'Calidad artesanal',
      'heritage.stat.countries': 'Países',

      'barattolo.p1': 'Gracias al éxito de nuestros sabores Buontalenti, Buontalenti Pistacchio y La Dolcevita, hemos desarrollado Il Barattolo GELATO: una línea premium diseñada para la distribución a gran escala.',
      'barattolo.p1Html': 'Gracias al éxito de nuestros sabores Buontalenti, Buontalenti Pistacchio y La Dolcevita, hemos desarrollado <span class="highlight-pink">Il Barattolo GELATO</span>: una línea premium diseñada para la <span class="highlight-pink">distribución a gran escala</span>.',
      'barattolo.p2': 'Este formato innovador lleva la auténtica calidad artesanal de nuestro helado a un público más amplio, haciéndolo más accesible sin comprometer los ingredientes ni la tradición.',
      'barattolo.p3': 'Con Il Barattolo Gelato, todos pueden disfrutar de los sabores ricos y cremosos que han hecho famosa a Badiani, ahora en un práctico formato de 500ml.',
      'barattolo.p3Html': 'Con Il Barattolo Gelato, todos pueden disfrutar de los sabores ricos y cremosos que han hecho famosa a Badiani, ahora en un práctico <span class="highlight-pink">formato de 500ml</span>.',

      'products.titlePrefix': 'Colección',
      'products.titleEm': 'Premium',
      'products.subtitle': 'Tres sabores icónicos, auténtica maestría florentina',

      'btn.viewSpecs': 'Ver ficha',

      'award.bestFlavour2015': 'Mejor sabor 2015',
      'award.worldBestSeller': 'Súper ventas mundial',

      'card.classico.desc': 'Nuestro sabor insignia, famoso en todo el mundo, elaborado solo con cuatro ingredientes: nata, leche, azúcar y huevos de gallinas camperas.',
      'card.classico.f1': 'Solo 4 ingredientes',
      'card.classico.f2': 'Huevos camperos',
      'card.classico.f3': 'Sin gluten',
      'card.classico.f4': 'Caducidad 24 meses',

      'card.dolcevita.desc': 'Helado de crema con gianduia de avellana y cacao (20%). Con pasta de avellana italiana y vainilla Bourbon de Madagascar.',
      'card.dolcevita.f1': 'Avellana italiana 2,6%',
      'card.dolcevita.f2': 'Vainilla de Madagascar',
      'card.dolcevita.f3': 'Sin gluten',
      'card.dolcevita.f4': 'Premiado',

      'card.pistacchio.desc': 'Nuestro sabor más popular en el mundo. Helado de crema con crema untuosa de pistacho (20%) y 5% de pasta de pistacho puro.',
      'card.pistacchio.f1': '5% pasta de pistacho',
      'card.pistacchio.f2': 'Huevos camperos',
      'card.pistacchio.f3': 'Sin gluten',
      'card.pistacchio.f4': 'Favorito global',

      'mission.tab.mission': 'Misión',
      'mission.tab.vision': 'Visión',
      'mission.title': 'Nuestra misión',
      'mission.strong': 'Llevar sabor a tu vida',
      'mission.body': 'Llevar alegría a consumidores de todas las edades a través de nuestro helado artesanal icónico, siempre siguiendo principios de alta calidad y sostenibilidad.',
      'vision.title': 'Nuestra visión',
      'vision.strong': 'Inspirar al mundo con helado',
      'vision.body': 'Convertirnos en la mejor marca de helado del mundo e inspirar a las personas con el sabor de productos artesanales recién hechos.',

      'gallery.title': 'Textura artesanal',
      'gallery.subtitle': 'Hermosos remolinos variegados muestran nuestra auténtica artesanía',

      'locations.aria': 'Badiani alrededor del mundo significa helado',
      'locations.top': 'Badiani alrededor del mundo',
      'locations.mid': 'Significa',
      'locations.bottom': 'Helado',
      'mobile.scrollHint': '← Desliza para verlo todo →',

      'why.title': 'Por qué elegir Badiani',
      'why.b1.title': 'Herencia',
      'why.b1.desc': '93 años de excelencia heladera desde Florencia, la cuna del helado',
      'why.b1.descHtml': '<span class="highlight-pink">93 años</span> de excelencia heladera desde Florencia, la cuna del helado',
      'why.b2.title': 'Presencia global',
      'why.b2.desc': 'Más de 30 tiendas en el mundo, incluido el Museo del Louvre en París',
      'why.b2.descHtml': 'Más de 30 tiendas en el mundo, incluido el <span class="highlight-pink">Museo del Louvre</span> en París',
      'why.b3.title': 'Calidad artesanal',
      'why.b3.desc': 'Ingredientes italianos premium, recetas premiadas, artesanía tradicional',
      'why.b4.title': 'Listo para retail',
      'why.b4.desc': 'Formato 500ml, caducidad 24 meses a -18°C, compatible con palets EUR/EPAL',
      'why.b4.descHtml': 'Formato 500ml, <span class="highlight-pink">caducidad 24 meses</span> a -18°C, compatible con palets EUR/EPAL',

      'contact.title': 'Colabora con Badiani',
      'contact.highlight': 'Lleva el auténtico sabor de Florencia a tus clientes',
      'contact.cta': 'Solicitar info de distribución',
      'contact.ctaAria': 'Solicitar información de distribución por email',

      'footer.html': '&copy; {year} <span>Badiani Gelato Firenze 1932</span> &middot; Fabricado por G7 s.r.l., Via Romagnoli 19, Bentivoglio (BO) Italia',

      'spec.productCode': 'Código de producto',
      'spec.description': 'Descripción',
      'spec.netWeight': 'Peso neto',
      'spec.eanProduct': 'EAN producto',
      'spec.eanCarton': 'EAN caja',
      'spec.shelfLife': 'Caducidad',
      'spec.energy': 'Energía',
      'spec.allergens': 'Alérgenos',
      'spec.mayContain': 'Puede contener',
      'spec.gluten': 'Gluten',

      'specValue.custardGelato': 'Helado de crema',
      'specValue.dolcevitaDesc': 'Helado de crema con gianduia 20%',
      'specValue.pistacchioDesc': 'Helado de crema con pistacho 20%',
      'specValue.shelfLife24': '24 meses a -18°C (-0,4°F)',
      'specValue.glutenFree': 'SIN GLUTEN',
      'specValue.mayContain.classico': 'SOJA, FRUTOS SECOS, CACAHUETES',
      'specValue.mayContain.dolcevita': 'SOJA, otros FRUTOS SECOS, CACAHUETES',
      'specValue.mayContain.pistacchio': 'SOJA, otros FRUTOS SECOS, CACAHUETES'
    },

    fr: {
      'lang.name.en': 'Anglais',
      'lang.name.it': 'Italien',
      'lang.name.es': 'Espagnol',
      'lang.name.fr': 'Français',

      'nav.home': 'Accueil',
      'nav.story': 'Histoire',
      'nav.products': 'Produits',
      'nav.heritage': 'Héritage',
      'nav.barattolo': 'Il Barattolo',
      'nav.contact': 'Contact',

      'header.beInspired': 'SOIS INSPIRÉ',

      'music.on': 'Musique : On',
      'music.off': 'Musique : Off',

      'customizer.title': 'Créez votre gelato',
      'customizer.subtitle': 'Choisissez vos parfums préférés pour votre curseur personnalisé !',
      'customizer.leftScoop': 'Boule gauche',
      'customizer.rightScoop': 'Boule droite',
      'customizer.previewTitle': 'Votre curseur',
      'customizer.close': 'Fermer',

      'flavor.hazelnut': 'Noisette',
      'flavor.strawberry': 'Fraise',
      'flavor.pistachio': 'Pistache',
      'flavor.buontalenti': 'Buontalenti',
      'flavor.mango': 'Mangue',
      'flavor.blueberry': 'Myrtille',

      'hero.subtitle': 'Un voyage créatif de saveurs depuis Florence',
      'hero.lead': 'Gelato artisanal florentin authentique pour la distribution retail premium. Plus de 90 ans d’excellence depuis le berceau du gelato.',
      'hero.ctaExplore': 'Découvrir les saveurs',
      'hero.ctaAria': 'Aller aux produits',

      'banner.hero': 'gelato italien iconique · depuis 1932 · de florence avec amour',
      'banner.story': 'la renaissance du gelato · né à florence en 1932 · tradition et innovation',
      'banner.heritage': 'de florence au monde · 93 ans d’excellence · un héritage mondial',
      'banner.barattolo': 'il barattolo · format retail premium · gelato florentin à la maison',
      'banner.products': 'saveurs primées · classico · pistacchio · dolcevita',
      'banner.mission': 'artisanat · ingrédients premium · goût inoubliable',
      'banner.gallery': 'texture artisanale · marbrages faits main · beauté à chaque cuillère',
      'banner.locations': 'londres · barcelone · paris · tokyo · florence · partout avec style',
      'banner.why': 'héritage · qualité · présence mondiale · excellence retail · choisissez badiani',
      'banner.contact': 'devenez partenaire · apportez florence à vos clients · grandissons ensemble',

      'story.title': 'Buontalenti : la crème qui a marqué l’histoire',
      'story.lead': 'Dans les années 1960, à Florence, Badiani a dédié un parfum spécial à Bernardo Buontalenti, l’architecte de la Renaissance auquel la tradition attribue la naissance du gelato au XVIe siècle.',
      'story.leadHtml': 'Dans les années 1960, à Florence, Badiani a dédié un parfum spécial à <span class="highlight-pink">Bernardo Buontalenti</span>, l’architecte de la Renaissance auquel la tradition attribue la naissance du <span class="highlight-pink">gelato</span> au XVIe siècle.',
      'story.tl.origin': 'L’origine',
      'story.tl.originDesc': 'Bernardo Buontalenti invente le gelato dans la Florence de la Renaissance, créant une gourmandise glacée pour la cour des Médicis.',
      'story.tl.originDescHtml': 'Bernardo Buontalenti invente le gelato dans la <span class="highlight-pink">Florence de la Renaissance</span>, créant une gourmandise glacée pour la cour des Médicis.',
      'story.tl.tribute': 'L’hommage',
      'story.tl.tributeDesc': 'Badiani crée la crème « Buontalenti » avec 4 ingrédients simples (crème, lait, sucre, œufs) pour honorer l’inventeur.',
      'story.tl.tributeDescHtml': 'Badiani crée la crème « Buontalenti » avec <span class="highlight-pink">4 ingrédients simples</span> (crème, lait, sucre, œufs) pour honorer l’inventeur.',
      'story.tl.legacy': 'L’héritage',
      'story.tl.legacyDesc': 'Il Barattolo Gelato apporte ce parfum florentin iconique au retail premium dans le monde entier.',
      'story.tl.legacyDescHtml': 'Il Barattolo Gelato apporte ce parfum florentin iconique au <span class="highlight-pink">retail premium</span> dans le monde entier.',

      'heritage.title': 'Un héritage d’excellence',
      'heritage.intro': 'Née à Florence en 1932, Badiani est l’un des producteurs de gelato les plus prestigieux au monde. Depuis le berceau du gelato, nous avons bâti une présence internationale dans cinq pays sur trois continents.',
      'heritage.introHtml': 'Née à <span class="highlight-pink">Florence en 1932</span>, Badiani est l’un des producteurs de gelato les plus prestigieux au monde. Depuis le berceau du gelato, nous avons bâti une présence internationale dans cinq pays sur trois continents.',
      'heritage.stat.founded': 'Fondée à Florence',
      'heritage.stat.stores': 'Boutiques dans le monde',
      'heritage.stat.quality': 'Qualité artisanale',
      'heritage.stat.countries': 'Pays',

      'barattolo.p1': 'Grâce au succès de nos parfums Buontalenti, Buontalenti Pistacchio et La Dolcevita, nous avons développé Il Barattolo GELATO — une gamme premium conçue pour la distribution à grande échelle.',
      'barattolo.p1Html': 'Grâce au succès de nos parfums Buontalenti, Buontalenti Pistacchio et La Dolcevita, nous avons développé <span class="highlight-pink">Il Barattolo GELATO</span> — une gamme premium conçue pour la <span class="highlight-pink">distribution à grande échelle</span>.',
      'barattolo.p2': 'Ce format innovant apporte la qualité artisanal authentique de notre gelato à un public plus large, sans compromis sur les ingrédients ni le savoir-faire traditionnel.',
      'barattolo.p3': 'Avec Il Barattolo Gelato, chacun peut savourer les parfums riches et onctueux qui ont fait la renommée de Badiani, désormais dans un format pratique de 500ml.',
      'barattolo.p3Html': 'Avec Il Barattolo Gelato, chacun peut savourer les parfums riches et onctueux qui ont fait la renommée de Badiani, désormais dans un <span class="highlight-pink">format pratique de 500ml</span>.',

      'products.titlePrefix': 'Collection',
      'products.titleEm': 'Premium',
      'products.subtitle': 'Trois parfums iconiques, un savoir-faire florentin authentique',

      'btn.viewSpecs': 'Voir la fiche',

      'award.bestFlavour2015': 'Meilleure saveur 2015',
      'award.worldBestSeller': 'Best-seller mondial',

      'card.classico.desc': 'Notre parfum signature, célèbre dans le monde entier, élaboré avec seulement quatre ingrédients : crème, lait, sucre et œufs plein air.',
      'card.classico.f1': 'Seulement 4 ingrédients',
      'card.classico.f2': 'Œufs plein air',
      'card.classico.f3': 'Sans gluten',
      'card.classico.f4': 'DLU 24 mois',

      'card.dolcevita.desc': 'Gelato à la crème avec gianduia noisette-cacao (20%). Avec pâte de noisette italienne et vanille Bourbon de Madagascar.',
      'card.dolcevita.f1': 'Noisette italienne 2,6%',
      'card.dolcevita.f2': 'Vanille de Madagascar',
      'card.dolcevita.f3': 'Sans gluten',
      'card.dolcevita.f4': 'Primé',

      'card.pistacchio.desc': 'Notre parfum le plus populaire dans le monde. Gelato à la crème marbré de crème de pistache (20%) et de 5% de pâte de pistache pure.',
      'card.pistacchio.f1': '5% pâte de pistache',
      'card.pistacchio.f2': 'Œufs plein air',
      'card.pistacchio.f3': 'Sans gluten',
      'card.pistacchio.f4': 'Favori mondial',

      'mission.tab.mission': 'Mission',
      'mission.tab.vision': 'Vision',
      'mission.title': 'Notre mission',
      'mission.strong': 'Apporter de la saveur à votre vie',
      'mission.body': 'Apporter de la joie aux consommateurs de tous âges grâce à notre gelato artisanal iconique, en respectant toujours des principes de haute qualité et de durabilité.',
      'vision.title': 'Notre vision',
      'vision.strong': 'Inspirer le monde avec le gelato',
      'vision.body': 'Devenir la meilleure marque de gelato au monde et inspirer les gens avec le goût de produits artisanaux fraîchement préparés.',

      'gallery.title': 'Texture artisanale',
      'gallery.subtitle': 'De magnifiques marbrures mettent en valeur notre savoir-faire artisanal authentique',

      'locations.aria': 'Badiani dans le monde signifie gelato',
      'locations.top': 'Badiani dans le monde',
      'locations.mid': 'signifie',
      'locations.bottom': 'gelato',
      'mobile.scrollHint': '← Faites défiler pour tout voir →',

      'why.title': 'Pourquoi choisir Badiani',
      'why.b1.title': 'Héritage',
      'why.b1.desc': '93 ans d’excellence depuis Florence, berceau du gelato',
      'why.b1.descHtml': '<span class="highlight-pink">93 ans</span> d’excellence depuis Florence, berceau du gelato',
      'why.b2.title': 'Présence mondiale',
      'why.b2.desc': '30+ boutiques dans le monde, dont le musée du Louvre à Paris',
      'why.b2.descHtml': '30+ boutiques dans le monde, dont le <span class="highlight-pink">musée du Louvre</span> à Paris',
      'why.b3.title': 'Qualité artisanale',
      'why.b3.desc': 'Ingrédients italiens premium, recettes primées, savoir-faire traditionnel',
      'why.b4.title': 'Prêt pour le retail',
      'why.b4.desc': 'Format 500ml, DLU 24 mois à -18°C, compatible palettes EUR/EPAL',
      'why.b4.descHtml': 'Format 500ml, <span class="highlight-pink">DLU 24 mois</span> à -18°C, compatible palettes EUR/EPAL',

      'contact.title': 'Devenez partenaire Badiani',
      'contact.highlight': 'Apportez le goût authentique de Florence à vos clients',
      'contact.cta': 'Demander les infos distribution',
      'contact.ctaAria': 'Demander les informations de distribution par email',

      'footer.html': '&copy; {year} <span>Badiani Gelato Firenze 1932</span> &middot; Fabriqué par G7 s.r.l., Via Romagnoli 19, Bentivoglio (BO) Italie',

      'spec.productCode': 'Code produit',
      'spec.description': 'Description',
      'spec.netWeight': 'Poids net',
      'spec.eanProduct': 'EAN produit',
      'spec.eanCarton': 'EAN carton',
      'spec.shelfLife': 'DLU',
      'spec.energy': 'Énergie',
      'spec.allergens': 'Allergènes',
      'spec.mayContain': 'Peut contenir',
      'spec.gluten': 'Gluten',

      'specValue.custardGelato': 'Gelato à la crème',
      'specValue.dolcevitaDesc': 'Gelato à la crème avec gianduia 20%',
      'specValue.pistacchioDesc': 'Gelato à la crème avec pistache 20%',
      'specValue.shelfLife24': '24 mois à -18°C (-0,4°F)',
      'specValue.glutenFree': 'SANS GLUTEN',
      'specValue.mayContain.classico': 'SOJA, FRUITS À COQUE, ARACHIDES',
      'specValue.mayContain.dolcevita': 'SOJA, autres FRUITS À COQUE, ARACHIDES',
      'specValue.mayContain.pistacchio': 'SOJA, autres FRUITS À COQUE, ARACHIDES'
    }
  };

  const SPEC_LABEL_KEYS_BY_EN = {
    'Product Code': 'spec.productCode',
    'Description': 'spec.description',
    'Net Weight': 'spec.netWeight',
    'EAN Product': 'spec.eanProduct',
    'EAN Carton': 'spec.eanCarton',
    'Shelf Life': 'spec.shelfLife',
    'Energy': 'spec.energy',
    'Allergens': 'spec.allergens',
    'May Contain': 'spec.mayContain',
    'Gluten': 'spec.gluten'
  };

  /** @type {Array<() => void>} */
  const listeners = [];

  function normalizeLang(lang) {
    if (!lang) return DEFAULT_LANG;
    const lower = String(lang).toLowerCase();
    const base = lower.split('-')[0];
    return SUPPORTED.includes(base) ? base : DEFAULT_LANG;
  }

  function getInitialLang() {
    try {
      const params = new URLSearchParams(window.location.search || '');
      const q = params.get('lang');
      if (q) return normalizeLang(q);
    } catch {
      // ignore
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return normalizeLang(saved);
    } catch {
      // ignore
    }

    return normalizeLang(navigator.language || DEFAULT_LANG);
  }

  let currentLang = getInitialLang();

  function template(str, vars) {
    if (!vars) return str;
    return String(str).replace(/\{(\w+)\}/g, (m, k) => {
      if (Object.prototype.hasOwnProperty.call(vars, k)) return String(vars[k]);
      return m;
    });
  }

  function t(key, vars) {
    const dict = STRINGS[currentLang] || STRINGS[DEFAULT_LANG];
    const fallback = STRINGS[DEFAULT_LANG] || {};
    const raw = (dict && dict[key]) != null ? dict[key] : fallback[key];
    if (raw == null) return key;
    return template(raw, vars);
  }

  function setLang(nextLang) {
    const lang = normalizeLang(nextLang);
    if (lang === currentLang) return;
    currentLang = lang;

    try {
      localStorage.setItem(STORAGE_KEY, currentLang);
    } catch {
      // ignore
    }

    document.documentElement.setAttribute('lang', currentLang);

    applyTranslations();
    listeners.forEach((fn) => {
      try { fn(); } catch { /* ignore */ }
    });
  }

  function getLang() {
    return currentLang;
  }

  function onChange(fn) {
    if (typeof fn !== 'function') return;
    listeners.push(fn);
  }

  function translateSpecLabelLabelToKey(label) {
    return SPEC_LABEL_KEYS_BY_EN[label] || null;
  }

  function translateSpecValue(productId, label, value) {
    // Keep codes/weights etc untouched; translate only known textual values.
    if (label === 'Description') {
      if (productId === 'classico' && value === 'Custard Gelato') return t('specValue.custardGelato');
      if (productId === 'dolcevita' && value === 'Custard gelato with gianduia spread 20%') return t('specValue.dolcevitaDesc');
      if (productId === 'pistacchio' && value === 'Custard gelato with pistachio spread 20%') return t('specValue.pistacchioDesc');
    }

    if (label === 'Shelf Life' && value === '24 months at -18°C (-0.4°F)') return t('specValue.shelfLife24');
    if (label === 'Gluten' && value === 'GLUTEN FREE') return t('specValue.glutenFree');

    if (label === 'May Contain') {
      if (productId === 'classico' && value === 'SOY, NUTS, PEANUTS') return t('specValue.mayContain.classico');
      if (productId === 'dolcevita' && value === 'SOY, other NUTS, PEANUTS') return t('specValue.mayContain.dolcevita');
      if (productId === 'pistacchio' && value === 'SOY, other NUTS, PEANUTS') return t('specValue.mayContain.pistacchio');
    }

    return value;
  }

  function injectLanguageSwitcherStyles() {
    if (document.getElementById('badiani-lang-switcher-styles')) return;

    const style = document.createElement('style');
    style.id = 'badiani-lang-switcher-styles';
    style.textContent = `
      .lang-switcher{ position:relative; display:inline-flex; align-items:center; }
      .lang-switcher__btn{
        appearance:none; -webkit-appearance:none;
        border:none;
        background:rgba(255,255,255,0.05);
        color:#fff;
        font-size:clamp(13px, 1.15vw, 16px);
        letter-spacing:clamp(1px, 0.18vw, 2px);
        text-transform:uppercase;
        padding:clamp(9px, 1.0vw, 12px) clamp(12px, 1.6vw, 18px);
        border-radius:25px;
        font-weight:600;
        font-family:inherit;
        line-height:1.1;
        display:inline-flex;
        align-items:center;
        gap:8px;
        cursor:pointer;
      }
      .lang-switcher__btn:hover{ background:rgba(240,103,166,0.92); transform:translateY(-2px); }
      .lang-switcher__btn:focus, .lang-switcher__btn:focus-visible{ outline:none; }
      .lang-switcher__btn .globe{ font-size:0.95em; opacity:0.95; }

      .lang-switcher__menu{
        position:absolute;
        top: calc(100% + 10px);
        right: 0;
        background: rgba(30,57,141,0.98);
        border: 1px solid rgba(255,255,255,0.18);
        border-radius: 14px;
        padding: 8px;
        min-width: 165px;
        box-shadow: 0 18px 50px rgba(0,0,0,0.35);
        display:none;
        z-index: 99999;
      }
      .lang-switcher__menu.is-open{ display:block; }

      .lang-switcher__item{
        width:100%;
        border:none;
        background:transparent;
        color:#fff;
        padding:10px 10px;
        border-radius: 10px;
        text-align:left;
        font-family: inherit;
        cursor:pointer;
        letter-spacing:0.6px;
      }
      .lang-switcher__item:hover{ background: rgba(240,103,166,0.9); }
      .lang-switcher__item[aria-checked="true"]{ background: rgba(255,255,255,0.10); }

      /* Mobile slide-in menu: keep dropdown inside viewport */
      @media (max-width: 900px){
        .lang-switcher__menu{ right: auto; left: 0; }
      }
    `;

    document.head.appendChild(style);
  }

  function ensureLanguageSwitcher() {
    const nav = document.getElementById('navMenu');
    if (!nav) return;

    if (document.getElementById('langSwitcher')) return;

    injectLanguageSwitcherStyles();

    const wrap = document.createElement('div');
    wrap.className = 'lang-switcher';
    wrap.id = 'langSwitcher';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lang-switcher__btn';
    btn.id = 'langSwitcherBtn';
    btn.setAttribute('aria-haspopup', 'menu');
    btn.setAttribute('aria-expanded', 'false');

    const globe = document.createElement('span');
    globe.className = 'globe';
    globe.textContent = '🌐';

    const code = document.createElement('span');
    code.id = 'langSwitcherCode';
    code.textContent = currentLang.toUpperCase();

    btn.appendChild(globe);
    btn.appendChild(code);

    const menu = document.createElement('div');
    menu.className = 'lang-switcher__menu';
    menu.id = 'langSwitcherMenu';
    menu.setAttribute('role', 'menu');

    /** @type {Array<{lang:string,labelKey:string}>} */
    const items = [
      { lang: 'en', labelKey: 'lang.name.en' },
      { lang: 'it', labelKey: 'lang.name.it' },
      { lang: 'es', labelKey: 'lang.name.es' },
      { lang: 'fr', labelKey: 'lang.name.fr' }
    ];

    items.forEach(({ lang, labelKey }) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'lang-switcher__item';
      item.dataset.lang = lang;
      item.setAttribute('role', 'menuitemradio');
      item.setAttribute('aria-checked', String(lang === currentLang));
      item.textContent = t(labelKey);
      item.addEventListener('click', () => {
        setLang(lang);
        closeMenu();
      });
      menu.appendChild(item);
    });

    function openMenu() {
      menu.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
      if (menu.classList.contains('is-open')) closeMenu();
      else openMenu();
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    document.addEventListener('click', (e) => {
      if (!menu.classList.contains('is-open')) return;
      const tEl = e && e.target;
      if (tEl && wrap.contains(tEl)) return;
      closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (menu.classList.contains('is-open')) closeMenu();
    });

    wrap.appendChild(btn);
    wrap.appendChild(menu);
    nav.appendChild(wrap);

    // Update labels when language changes.
    onChange(() => {
      code.textContent = currentLang.toUpperCase();
      Array.from(menu.querySelectorAll('.lang-switcher__item')).forEach((el) => {
        const lang = el.dataset.lang;
        el.setAttribute('aria-checked', String(lang === currentLang));
        const labelKey = `lang.name.${lang}`;
        el.textContent = t(labelKey);
      });
    });
  }

  /**
   * Bindings are resolved after DOM is ready.
   * We keep bindings in a list so we can re-apply them on language change.
   */
  /** @type {Array<() => void>} */
  const bindings = [];

  function bindText(selector, key) {
    bindings.push(() => {
      const el = document.querySelector(selector);
      if (!el) return;
      el.textContent = t(key);
    });
  }

  function bindTextAll(selector, key) {
    bindings.push(() => {
      const els = document.querySelectorAll(selector);
      if (!els || !els.length) return;
      els.forEach((el) => {
        el.textContent = t(key);
      });
    });
  }

  function bindHTML(selector, key, vars) {
    bindings.push(() => {
      const el = document.querySelector(selector);
      if (!el) return;
      el.innerHTML = t(key, vars);
    });
  }

  function bindAttr(selector, attr, key) {
    bindings.push(() => {
      const el = document.querySelector(selector);
      if (!el) return;
      el.setAttribute(attr, t(key));
    });
  }

  function bindDataTextForSection(sectionId, key) {
    bindings.push(() => {
      const el = document.querySelector(`.section-divider-data[data-section="${sectionId}"]`);
      if (!el) return;
      el.dataset.text = t(key);
    });
  }

  function applyTranslations() {
    // Ensure lang attribute is correct even on first run.
    document.documentElement.setAttribute('lang', currentLang);

    // Update title (simple, no markup)
    document.title = 'Badiani Il Barattolo — Iconic Italian Gelato for Retail';

    // Header / nav
    bindText('#beInspiredText', 'header.beInspired');

    // Desktop nav (story/products/contact)
    bindText('#navMenu a[href="#story"]', 'nav.story');
    bindText('#navMenu a[href="#products"]', 'nav.products');
    bindText('#navMenu a[href="#contact"]', 'nav.contact');

    // Mobile nav (home + more anchors)
    bindText('#navMenu a[href="#hero"]', 'nav.home');
    bindText('#navMenu a[href="#heritage"]', 'nav.heritage');
    bindText('#navMenu a[href="#barattolo"]', 'nav.barattolo');

    // Music button label is controlled by the page script; we just provide keys.

    // Customizer modal
    bindText('.customizer-title', 'customizer.title');
    bindText('.customizer-subtitle', 'customizer.subtitle');
    bindText('#customizerModal .flavor-selector:nth-of-type(1) .flavor-label', 'customizer.leftScoop');
    bindText('#customizerModal .flavor-selector:nth-of-type(2) .flavor-label', 'customizer.rightScoop');
    bindText('#customizerModal .preview-title', 'customizer.previewTitle');
    bindAttr('#customizerClose', 'aria-label', 'customizer.close');

    // Flavor names
    bindTextAll('#customizerModal .flavor-option[data-name="Hazelnut"] .flavor-name', 'flavor.hazelnut');
    bindTextAll('#customizerModal .flavor-option[data-name="Strawberry"] .flavor-name', 'flavor.strawberry');
    bindTextAll('#customizerModal .flavor-option[data-name="Pistachio"] .flavor-name', 'flavor.pistachio');
    bindTextAll('#customizerModal .flavor-option[data-name="Buontalenti"] .flavor-name', 'flavor.buontalenti');
    bindTextAll('#customizerModal .flavor-option[data-name="Mango"] .flavor-name', 'flavor.mango');
    bindTextAll('#customizerModal .flavor-option[data-name="Blueberry"] .flavor-name', 'flavor.blueberry');

    // Hero
    bindText('#hero .hero-subtitle', 'hero.subtitle');
    bindText('#hero .hero-content > p:not(.hero-subtitle)', 'hero.lead');
    bindText('#hero .hero-cta', 'hero.ctaExplore');
    bindAttr('#hero .hero-cta', 'aria-label', 'hero.ctaAria');

    // Banners (data + visible divider paragraphs)
    bindDataTextForSection('hero', 'banner.hero');
    bindDataTextForSection('story', 'banner.story');
    bindDataTextForSection('heritage', 'banner.heritage');
    bindDataTextForSection('barattolo', 'banner.barattolo');
    bindDataTextForSection('products', 'banner.products');
    bindDataTextForSection('mission', 'banner.mission');
    bindDataTextForSection('gallery', 'banner.gallery');
    bindDataTextForSection('locations', 'banner.locations');
    bindDataTextForSection('why', 'banner.why');
    bindDataTextForSection('contact', 'banner.contact');

    // Visible dividers: match by the section immediately following
    bindings.push(() => {
      document.querySelectorAll('.section-divider.visible').forEach((divider) => {
        // Look ahead for the next section-divider-data or section in DOM
        const nextData = divider.nextElementSibling;
        if (nextData && nextData.classList && nextData.classList.contains('section-divider-data')) {
          const keyBySection = {
            hero: 'banner.hero',
            story: 'banner.story',
            heritage: 'banner.heritage',
            barattolo: 'banner.barattolo',
            products: 'banner.products',
            mission: 'banner.mission',
            gallery: 'banner.gallery',
            locations: 'banner.locations',
            why: 'banner.why',
            contact: 'banner.contact'
          };
          const section = nextData.dataset.section;
          const key = section && keyBySection[section];
          if (!key) return;
          const p = divider.querySelector('p');
          if (p) p.textContent = t(key);
        }
      });
    });

    // Story
    bindText('#story .story-title', 'story.title');
    bindHTML('#story .story-lead', 'story.leadHtml');

    bindText('#story .timeline-item:nth-child(1) .timeline-title', 'story.tl.origin');
    bindText('#story .timeline-item:nth-child(2) .timeline-title', 'story.tl.tribute');
    bindText('#story .timeline-item:nth-child(3) .timeline-title', 'story.tl.legacy');

    bindHTML('#story .timeline-item:nth-child(1) .timeline-desc', 'story.tl.originDescHtml');
    bindHTML('#story .timeline-item:nth-child(2) .timeline-desc', 'story.tl.tributeDescHtml');
    bindHTML('#story .timeline-item:nth-child(3) .timeline-desc', 'story.tl.legacyDescHtml');

    // Heritage
    bindText('#heritage > h2', 'heritage.title');
    bindHTML('#heritage .heritage-intro', 'heritage.introHtml');
    bindText('#heritage .stat:nth-child(1) .stat-label', 'heritage.stat.founded');
    bindText('#heritage .stat:nth-child(2) .stat-label', 'heritage.stat.stores');
    bindText('#heritage .stat:nth-child(3) .stat-label', 'heritage.stat.quality');
    bindText('#heritage .stat:nth-child(4) .stat-label', 'heritage.stat.countries');

    // Barattolo paragraphs (keep highlight spans)
    bindings.push(() => {
      const p = Array.from(document.querySelectorAll('#barattolo .barattolo-text p'));
      if (p[0]) p[0].innerHTML = t('barattolo.p1Html');
      if (p[1]) p[1].textContent = t('barattolo.p2');
      if (p[2]) p[2].innerHTML = t('barattolo.p3Html');
    });

    // Products
    bindings.push(() => {
      const h2 = document.querySelector('#products .section-title');
      if (!h2) return;
      const span = h2.querySelector('span');
      if (!span) {
        h2.textContent = `${t('products.titlePrefix')} ${t('products.titleEm')}`;
        return;
      }
      // Keep span styling.
      h2.childNodes.forEach((n) => {
        if (n.nodeType === Node.TEXT_NODE) n.nodeValue = t('products.titlePrefix') + ' ';
      });
      span.textContent = t('products.titleEm');
    });
    bindText('#products .section-subtitle', 'products.subtitle');

    // Card buttons + awards
    bindings.push(() => {
      document.querySelectorAll('.card .card-btn').forEach((btn) => {
        btn.textContent = t('btn.viewSpecs');
      });
    });

    bindText('.card.dolcevita .card-award', 'award.bestFlavour2015');
    bindText('.card.pistacchio .card-award', 'award.worldBestSeller');

    // Card descriptions + features (desktop+mobile)
    bindText('.card.classico .card-description', 'card.classico.desc');
    bindText('.card.classico .card-features li:nth-child(1)', 'card.classico.f1');
    bindText('.card.classico .card-features li:nth-child(2)', 'card.classico.f2');
    bindText('.card.classico .card-features li:nth-child(3)', 'card.classico.f3');
    bindText('.card.classico .card-features li:nth-child(4)', 'card.classico.f4');

    bindText('.card.dolcevita .card-description', 'card.dolcevita.desc');
    bindText('.card.dolcevita .card-features li:nth-child(1)', 'card.dolcevita.f1');
    bindText('.card.dolcevita .card-features li:nth-child(2)', 'card.dolcevita.f2');
    bindText('.card.dolcevita .card-features li:nth-child(3)', 'card.dolcevita.f3');
    bindText('.card.dolcevita .card-features li:nth-child(4)', 'card.dolcevita.f4');

    bindText('.card.pistacchio .card-description', 'card.pistacchio.desc');
    bindText('.card.pistacchio .card-features li:nth-child(1)', 'card.pistacchio.f1');
    bindText('.card.pistacchio .card-features li:nth-child(2)', 'card.pistacchio.f2');
    bindText('.card.pistacchio .card-features li:nth-child(3)', 'card.pistacchio.f3');
    bindText('.card.pistacchio .card-features li:nth-child(4)', 'card.pistacchio.f4');

    // Mission / Vision
    bindText('#mission .mv-tab[data-target="mission-box"]', 'mission.tab.mission');
    bindText('#mission .mv-tab[data-target="vision-box"]', 'mission.tab.vision');

    bindText('#mission .mission-box h2', 'mission.title');
    bindText('#mission .mission-box strong', 'mission.strong');
    bindText('#mission .mission-box p:nth-of-type(2)', 'mission.body');

    bindText('#mission .vision-box h2', 'vision.title');
    bindText('#mission .vision-box strong', 'vision.strong');
    bindText('#mission .vision-box p:nth-of-type(2)', 'vision.body');

    // Gallery
    bindText('#gallery > h2', 'gallery.title');
    bindText('#gallery .gallery-subtitle', 'gallery.subtitle');

    // Locations headline
    bindAttr('#locations .world-means-title', 'aria-label', 'locations.aria');
    bindText('#locations .wmt-top', 'locations.top');
    bindText('#locations .wmt-mid', 'locations.mid');
    bindText('#locations .wmt-bottom', 'locations.bottom');
    bindText('#locations .global-presence-scroll-hint', 'mobile.scrollHint');

    // Why
    bindings.push(() => {
      const h2 = document.querySelector('#why > h2');
      if (!h2) return;
      const span = h2.querySelector('span');
      if (!span) {
        h2.textContent = t('why.title');
        return;
      }
      // Keep the brand span.
      const brand = span.outerHTML;
      const base = t('why.title');
      // Replace the brand word if present; otherwise build from scratch.
      const textOnly = base.replace(/Badiani/i, '').trim();
      h2.innerHTML = `${textOnly} ${brand}`.trim();
    });
    bindText('#why .benefit:nth-child(1) h3', 'why.b1.title');
    bindText('#why .benefit:nth-child(2) h3', 'why.b2.title');
    bindText('#why .benefit:nth-child(3) h3', 'why.b3.title');
    bindText('#why .benefit:nth-child(4) h3', 'why.b4.title');

    bindings.push(() => {
      const p1 = document.querySelector('#why .benefit:nth-child(1) p');
      const p2 = document.querySelector('#why .benefit:nth-child(2) p');
      const p3 = document.querySelector('#why .benefit:nth-child(3) p');
      const p4 = document.querySelector('#why .benefit:nth-child(4) p');

      if (p1) p1.innerHTML = t('why.b1.descHtml');
      if (p2) p2.innerHTML = t('why.b2.descHtml');
      if (p3) p3.textContent = t('why.b3.desc');
      if (p4) p4.innerHTML = t('why.b4.descHtml');
    });

    // Contact
    bindText('#contact > h2', 'contact.title');
    bindText('#contact .highlight', 'contact.highlight');
    bindText('#requestDistributionBtn', 'contact.cta');
    bindAttr('#requestDistributionBtn', 'aria-label', 'contact.ctaAria');

    // Footer
    bindHTML('footer', 'footer.html', { year: new Date().getFullYear() });

    // Apply (run) bindings now
    const run = () => {
      // Recreate bindings list each time to avoid duplicates
      // (bindings are built by calls above; after running, reset for next apply)
      const fns = bindings.splice(0, bindings.length);
      fns.forEach((fn) => {
        try { fn(); } catch { /* ignore */ }
      });
    };

    run();

    // Notify listeners (e.g., other scripts can update).
  }

  // Expose public API
  window.BadianiI18n = {
    t,
    setLang,
    getLang,
    onChange,
    translateSpecLabelLabelToKey,
    translateSpecValue
  };

  function init() {
    document.documentElement.setAttribute('lang', currentLang);
    ensureLanguageSwitcher();
    applyTranslations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
