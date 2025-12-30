export const clientConfig = {
  shopName: 'The Artisan Butcher',
  tagline: 'Premium Cuts, Crafted with Care',
  currency: 'USD',
  currencySymbol: '$',
  deliveryNote: 'Free delivery on orders over $100',
  phone: '(555) 123-4567',
  address: '123 Main Street, Meatville, MT 12345',
};

export const formatPrice = (price: number): string => {
  return `${clientConfig.currencySymbol}${price.toFixed(2)}`;
};