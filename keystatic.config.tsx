import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Meta Description', multiline: true }),
        date: fields.date({ label: 'Publish Date' }),
        category: fields.text({ label: 'Category' }),
        image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/articles',
          publicPath: '/images/articles/',
        }),
        author: fields.object({
          name: fields.text({ label: 'Author Name' }),
          role: fields.text({ label: 'Author Role' }),
          avatar: fields.image({
            label: 'Avatar',
            directory: 'public/images/authors',
            publicPath: '/images/authors/',
          }),
        }),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role' }),
        company: fields.text({ label: 'Company' }),
        quote: fields.text({ label: 'Quote', multiline: true }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'public/images/testimonials',
          publicPath: '/images/testimonials/',
        }),
      },
    }),
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'src/content/site-settings',
      schema: {
        siteTitle: fields.text({ label: 'Site Title', defaultValue: 'Orderflow' }),
        siteDescription: fields.text({ label: 'Site Description', multiline: true }),
        ogImage: fields.image({
          label: 'Default OG Image',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        gtmId: fields.text({ label: 'Google Tag Manager ID' }),
        ga4Id: fields.text({ label: 'GA4 Measurement ID' }),
      },
    }),
    homepage: singleton({
      label: 'Homepage',
      path: 'src/content/homepage',
      schema: {
        heroTitle: fields.text({ label: 'Hero Title' }),
        heroSubtitle: fields.text({ label: 'Hero Subtitle' }),
        heroCtaText: fields.text({ label: 'Hero CTA Text' }),
        heroCtaUrl: fields.text({ label: 'Hero CTA URL' }),
        performanceTitle: fields.text({ label: 'Performance Section Title' }),
        performanceDescription: fields.text({
          label: 'Performance Description',
          multiline: true,
        }),
        testimonialTitle: fields.text({ label: 'Testimonial Section Title' }),
        ctaTitle: fields.text({ label: 'CTA Title' }),
        ctaSubtitle: fields.text({ label: 'CTA Subtitle' }),
      },
    }),
  },
});
