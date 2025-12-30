export const clientConfig = {
  // --- IDENTITÉ ---
  shopName: 'Boucherie du Centre',
  tagline: 'Tradition & Qualité depuis 1998',
  
  // --- CONTACT ---
  phone: '01 23 45 67 89',
  address: '12 Rue de la République, 75001 Paris',
  email: 'contact@boucherie-centre.fr',
  
  // --- HORAIRES D'OUVERTURE (Nouveau) ---
  // Format : [Heure ouverture, Heure fermeture]
  // Vous pouvez mettre plusieurs créneaux par jour (ex: matin et après-midi)
  openingHours: {
    1: [], // Lundi : Fermé
    2: [{ open: '08:30', close: '12:30' }, { open: '15:30', close: '19:30' }], // Mardi
    3: [{ open: '08:30', close: '12:30' }, { open: '15:30', close: '19:30' }], // Mercredi
    4: [{ open: '08:30', close: '12:30' }, { open: '15:30', close: '19:30' }], // Jeudi
    5: [{ open: '08:30', close: '12:30' }, { open: '15:30', close: '19:30' }], // Vendredi
    6: [{ open: '08:00', close: '19:30' }], // Samedi (Journée continue)
    0: [{ open: '09:00', close: '13:00' }], // Dimanche (Matin uniquement)
  },


  // --- LE LIEN GOOGLE MAPS ---
  // Astuce : J'ai mis un lien de recherche générique qui pointera vers l'adresse ci-dessus.
  // Vous pourrez le remplacer par votre lien précis plus tard.
  googleMapLink: 'https://www.google.com/maps/search/?api=1&query=12+Rue+de+la+République+75001+Paris',
  
  // --- FEATURES (Pour activer/désactiver des parties du site) ---
  features: {
    enableSimulator: true,   // Active le panier
    enableSearch: true,      // Active la barre de recherche
    enablePromos: true,      // Active l'affichage des promos
  },
  
  // --- LOCALISATION ---
  currency: 'EUR',
  locale: 'fr-FR',
};