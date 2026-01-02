import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2, ReceiptText, X, Share2, Copy, Check } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice, formatWeight } from "@/lib/utils";

interface CartSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSummaryModal = ({ isOpen, onClose }: CartSummaryModalProps) => {
  const { items, removeFromCart, updateQuantity, clearCart, cartTotal } = useCartStore();
  const [hasCopied, setHasCopied] = useState(false);

  const SHOP_NAME = "Boucherie Artisanale";

  // --- LOGIQUE (Inchangée) ---
  const handleIncrement = (item: any) => {
    const newQuantity = Math.round((item.quantity + item.step) * 1000) / 1000;
    const newPrice = newQuantity * item.pricePerUnit;
    updateQuantity(item.id, newQuantity, newPrice);
  };

  const handleDecrement = (item: any) => {
    const newQuantity = Math.round((item.quantity - item.step) * 1000) / 1000;
    if (newQuantity < item.minQuantity) return;
    const newPrice = newQuantity * item.pricePerUnit;
    updateQuantity(item.id, newQuantity, newPrice);
  };

  // --- GÉNÉRATEUR DE TEXTE (Pour l'export) ---
  const generateListText = () => {
    const date = new Date().toLocaleDateString('fr-FR');
    let text = `🥩 MA LISTE DE COURSES (${date})\n`;
    text += `📍 ${SHOP_NAME}\n`;
    text += "------------------------------\n";

    items.forEach(item => {
      text += `- ${formatWeight(item.quantity, item.unitType)} ${item.title}`;
      text += ` (env. ${formatPrice(item.totalPrice)})\n`;
    });

    text += "------------------------------\n";
    text += `💰 BUDGET ESTIMÉ : ${formatPrice(cartTotal())}\n`;
    
    return text;
  };

  // Action : Partager ou Copier
  const handleShareOrCopy = async () => {
    const textToShare = generateListText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Liste - ${SHOP_NAME}`,
          text: textToShare,
        });
      } catch (error) { console.log("Annulé"); }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    const text = generateListText();
    navigator.clipboard.writeText(text).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white p-0 gap-0 overflow-hidden shadow-2xl border-none">
        
        {/* --- RETOUR DU DESIGN "TICKET DE CAISSE" (Style Slate/Noir) --- */}
        <div className="bg-slate-900 p-6 text-white text-center relative">
           <Button 
            onClick={onClose} 
            variant="ghost" 
            className="absolute right-2 top-2 text-white/50 hover:text-white hover:bg-white/10 p-0 h-8 w-8 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
             <ReceiptText className="w-6 h-6 text-white" />
          </div>
          <DialogTitle className="text-xl font-serif tracking-wide">MA LISTE</DialogTitle>
          <p className="text-white/60 text-xs mt-1 uppercase tracking-widest">Estimation Budget</p>
        </div>

        {/* --- EFFET PAPIER DENTELÉ (Le retour !) --- */}
        <div className="h-4 bg-slate-900 relative">
            <div className="absolute top-0 w-full h-4 bg-white" style={{
                clipPath: "polygon(0 100%, 2% 0, 4% 100%, 6% 0, 8% 100%, 10% 0, 12% 100%, 14% 0, 16% 100%, 18% 0, 20% 100%, 22% 0, 24% 100%, 26% 0, 28% 100%, 30% 0, 32% 100%, 34% 0, 36% 100%, 38% 0, 40% 100%, 42% 0, 44% 100%, 46% 0, 48% 100%, 50% 0, 52% 100%, 54% 0, 56% 100%, 58% 0, 60% 100%, 62% 0, 64% 100%, 66% 0, 68% 100%, 70% 0, 72% 100%, 74% 0, 76% 100%, 78% 0, 80% 100%, 82% 0, 84% 100%, 86% 0, 88% 100%, 90% 0, 92% 100%, 94% 0, 96% 100%, 98% 0, 100% 100%)"
            }}></div>
        </div>

        {/* LISTE DES ARTICLES */}
        <ScrollArea className="max-h-[50vh] px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
                <p>Votre liste est vide.</p>
                <p className="text-xs mt-2">Ajoutez des produits pour calculer le total.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col gap-2 border-b border-dashed border-gray-200 pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800 text-sm uppercase">{item.title}</h3>
                    <span className="font-mono font-medium text-gray-900">{formatPrice(item.totalPrice)}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <div>{formatPrice(item.pricePerUnit)} / {item.unitType}</div>
                    
                    <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-100 shadow-sm">
                       <button 
                         onClick={() => handleDecrement(item)} 
                         disabled={item.quantity <= item.minQuantity}
                         className="p-1 hover:text-primary disabled:opacity-30 transition-colors"
                       >
                         <Minus className="w-3 h-3" />
                       </button>
                       <span className="min-w-[3rem] text-center font-mono font-bold text-gray-700">
                         {formatWeight(item.quantity, item.unitType)}
                       </span>
                       <button onClick={() => handleIncrement(item)} className="p-1 hover:text-primary transition-colors">
                         <Plus className="w-3 h-3" />
                       </button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* PIED DE PAGE : Total et Actions (Style Clean) */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
           <div className="flex justify-between items-end mb-6">
              <span className="font-bold text-gray-500 text-sm uppercase">Total Estimé</span>
              <span className="font-bold text-primary text-2xl font-mono">{formatPrice(cartTotal())}</span>
           </div>

           <div className="grid grid-cols-4 gap-3">
               <Button 
                  variant="outline" 
                  onClick={() => { if(confirm('Vider la liste ?')) clearCart(); }} 
                  className="col-span-1 border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600"
                  title="Vider"
               >
                  <Trash2 className="w-4 h-4" />
               </Button>

               <Button 
                  variant="outline" 
                  onClick={handleCopy} 
                  className="col-span-1 border-gray-200 text-gray-600 hover:bg-white"
                  title="Copier"
               >
                  {hasCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
               </Button>

               <Button 
                  onClick={handleShareOrCopy} 
                  className="col-span-2 bg-slate-900 hover:bg-slate-800 text-white shadow-lg font-bold gap-2"
                  disabled={items.length === 0}
               >
                  <Share2 className="w-4 h-4" />
                  Exporter
               </Button>
           </div>
           
           <p className="text-[10px] text-gray-400 text-center mt-4">
             * Prix estimatifs selon le poids réel à la pesée en boutique.
           </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};