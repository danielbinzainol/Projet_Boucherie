// studio/schemaTypes/product.js
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Produits',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nom du produit',
      type: 'string',
      validation: Rule => Rule.required().error('Le nom est obligatoire.')
    }),
    defineField({
      name: 'price',
      title: 'Prix (€)',
      type: 'number',
      description: 'Mettez juste le chiffre (ex: 12.50)',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'unitType',
      title: 'Unité de vente',
      type: 'string',
      options: {
        list: [
          { title: 'Au Kilo (kg)', value: 'kg' },
          { title: 'À la pièce', value: 'piece' },
          { title: 'Le colis', value: 'colis' }
        ],
        layout: 'radio',
        direction: 'horizontal'
      },
      initialValue: 'kg'
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Bœuf', value: 'Bœuf' },
          { title: 'Agneau', value: 'Agneau' },
          { title: 'Volaille', value: 'Volaille' },
          { title: 'Spécialités', value: 'Spécialité' },
          { title: 'Promotions', value: 'Promotions' },
          { title: 'Épicerie & Sec', value: 'Produits Secs' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true, // Permet le recadrage intelligent
      }
    }),
    defineField({
      name: 'inStock',
      title: 'En Stock ?',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'featured',
      title: 'Produit Vedette ?',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 3
    })
  ]
})