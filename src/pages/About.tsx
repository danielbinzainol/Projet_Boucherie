import { MapPin, Phone, Mail, Clock, ShieldCheck, Award } from 'lucide-react';
import { SimpleHeader } from '@/components/headers/SimpleHeader';
import { Button } from '@/components/ui/button';
import { clientConfig } from '@/config/clientConfig';

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <SimpleHeader />

      <main className="container mx-auto px-4 py-12 pb-32">
        {/* Section Héro */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Notre Histoire & <span className="text-primary">Savoir-Faire</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Depuis plus de 20 ans, la boucherie {clientConfig.shopName} s'engage à vous offrir des viandes d'exception, sélectionnées directement auprès des éleveurs locaux respectueux du terroir.
          </p>
        </div>

        {/* Grille d'Informations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Carte Contact */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Nous Contacter</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">Une commande spéciale ? Une question ?</p>
            <p className="font-mono text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">{clientConfig.phone}</p>
            <Button variant="outline" className="w-full mt-auto" onClick={() => window.open(`tel:${clientConfig.phone}`)}>
              Appeler
            </Button>
          </div>

          {/* Carte Localisation */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Nous Trouver</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm max-w-[200px]">{clientConfig.address}</p>
            
            {/* Bouton Google Maps */}
            <Button className="w-full mt-auto gap-2" onClick={() => window.open(clientConfig.googleMapLink, '_blank')}>
            Voir l'itinéraire
            </Button>
          </div>

          {/* Carte Horaires */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Nos Horaires</h3>
            <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300 w-full">
               {/* Vous pouvez dynamiser ceci via clientConfig plus tard */}
               <li className="flex justify-between w-full border-b border-dashed border-gray-200 dark:border-slate-700 pb-1">
                 <span>Mar - Sam</span>
                 <span className="font-medium">08:30 - 19:30</span>
               </li>
               <li className="flex justify-between w-full border-b border-dashed border-gray-200 dark:border-slate-700 pb-1">
                 <span>Dimanche</span>
                 <span className="font-medium">09:00 - 13:00</span>
               </li>
               <li className="flex justify-between w-full text-red-500 font-medium pt-1">
                 <span>Lundi</span>
                 <span>Fermé</span>
               </li>
            </ul>
          </div>
        </div>

        {/* Section Collaborations / Valeurs */}
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-slate-800 shadow-sm">
           <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Collaborations & Pros</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Vous êtes restaurateur, traiteur ou organisateur d'événements ? 
                Nous proposons des tarifs préférentiels et des découpes sur-mesure pour vos besoins professionnels.
              </p>
              
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <ShieldCheck className="text-primary h-5 w-5" />
                    <span className="text-sm font-medium dark:text-gray-300">Viande certifiée origine France</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Award className="text-primary h-5 w-5" />
                    <span className="text-sm font-medium dark:text-gray-300">Maturation artisanale sur place</span>
                 </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
                 <p className="text-sm text-gray-500 mb-2">Email direct pour les pros :</p>
                 <a href="mailto:contact@maboucherie.fr" className="flex items-center gap-2 text-primary font-bold hover:underline">
                    <Mail className="h-4 w-4" />
                    contact@{clientConfig.shopName.toLowerCase().replace(/\s/g, '')}.fr
                 </a>
              </div>
           </div>
           
           {/* Image illustrative (Placeholder) */}
           <div className="h-64 md:h-full bg-gray-100 dark:bg-slate-800 rounded-2xl overflow-hidden relative min-h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80" 
                alt="Boucher au travail" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                 <p className="text-white font-serif italic text-lg">"La qualité ne se négocie pas."</p>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
};