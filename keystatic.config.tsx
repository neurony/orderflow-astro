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
        seoTitle: fields.text({ label: 'SEO Title (50-60 chars)' }),
        seoDescription: fields.text({ label: 'SEO Meta Description (140-155 chars)', multiline: true }),
        canonicalUrl: fields.text({ label: 'Canonical URL' }),
        updatedDate: fields.date({ label: 'Updated Date' }),
        funnel: fields.select({
          label: 'Funnel Stage',
          options: [
            { label: 'Top of Funnel', value: 'TOFU' },
            { label: 'Middle of Funnel', value: 'MOFU' },
            { label: 'Bottom of Funnel', value: 'BOFU' },
          ],
          defaultValue: 'TOFU',
        }),
        primaryKeyword: fields.text({ label: 'Primary Keyword' }),
        schemaType: fields.select({
          label: 'Schema Type',
          options: [
            { label: 'Article', value: 'Article' },
            { label: 'FAQ Page', value: 'FAQPage' },
          ],
          defaultValue: 'Article',
        }),
        contentType: fields.select({
          label: 'Content Type',
          options: [
            { label: 'Blog', value: 'blog' },
            { label: 'Pillar', value: 'pillar' },
            { label: 'Educational', value: 'educational' },
          ],
          defaultValue: 'blog',
        }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          {
            label: 'FAQ Items',
            itemLabel: (props) => props.fields.question.value || 'FAQ Item',
          }
        ),
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
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        seoTitle: fields.text({ label: 'SEO Title (50-60 chars)' }),
        seoDescription: fields.text({ label: 'SEO Meta Description (140-155 chars)', multiline: true }),
        canonicalUrl: fields.text({ label: 'Canonical URL' }),
        ogImage: fields.image({
          label: 'OG Image',
          directory: 'public/images/pages',
          publicPath: '/images/pages/',
        }),
        ogType: fields.select({
          label: 'OG Type',
          options: [
            { label: 'Website', value: 'website' },
            { label: 'Article', value: 'article' },
          ],
          defaultValue: 'website',
        }),
        noindex: fields.checkbox({ label: 'No Index', defaultValue: false }),
        schemaType: fields.select({
          label: 'Schema Type',
          options: [
            { label: 'Software Application', value: 'SoftwareApplication' },
            { label: 'Article', value: 'Article' },
            { label: 'FAQ Page', value: 'FAQPage' },
          ],
          defaultValue: 'SoftwareApplication',
        }),
        pubDate: fields.date({ label: 'Publish Date' }),
        updatedDate: fields.date({ label: 'Updated Date' }),
        funnel: fields.select({
          label: 'Funnel Stage',
          options: [
            { label: 'Top of Funnel', value: 'TOFU' },
            { label: 'Middle of Funnel', value: 'MOFU' },
            { label: 'Bottom of Funnel', value: 'BOFU' },
          ],
          defaultValue: 'TOFU',
        }),
        primaryKeyword: fields.text({ label: 'Primary Keyword' }),
        author: fields.text({ label: 'Author', defaultValue: 'OrderFlow Team' }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          {
            label: 'FAQ Items',
            itemLabel: (props) => props.fields.question.value || 'FAQ Item',
          }
        ),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
    caseStudies: collection({
      label: 'Case Studies',
      slugField: 'title',
      path: 'src/content/case-studies/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        seoTitle: fields.text({ label: 'SEO Title (50-60 chars)' }),
        seoDescription: fields.text({ label: 'SEO Meta Description (140-155 chars)', multiline: true }),
        canonicalUrl: fields.text({ label: 'Canonical URL' }),
        ogImage: fields.image({
          label: 'OG Image',
          directory: 'public/images/case-studies',
          publicPath: '/images/case-studies/',
        }),
        pubDate: fields.date({ label: 'Publish Date' }),
        updatedDate: fields.date({ label: 'Updated Date' }),
        clientName: fields.text({ label: 'Client Name' }),
        clientRole: fields.text({ label: 'Client Role' }),
        clientCompany: fields.text({ label: 'Client Company' }),
        industry: fields.text({ label: 'Industry' }),
        stats: fields.array(
          fields.object({
            label: fields.text({ label: 'Stat Label' }),
            value: fields.text({ label: 'Stat Value' }),
          }),
          {
            label: 'Key Stats',
            itemLabel: (props) => props.fields.label.value || 'Stat',
          }
        ),
        funnel: fields.select({
          label: 'Funnel Stage',
          options: [
            { label: 'Top of Funnel', value: 'TOFU' },
            { label: 'Middle of Funnel', value: 'MOFU' },
            { label: 'Bottom of Funnel', value: 'BOFU' },
          ],
          defaultValue: 'BOFU',
        }),
        primaryKeyword: fields.text({ label: 'Primary Keyword' }),
        author: fields.text({ label: 'Author', defaultValue: 'OrderFlow Team' }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          {
            label: 'FAQ Items',
            itemLabel: (props) => props.fields.question.value || 'FAQ Item',
          }
        ),
        content: fields.markdoc({ label: 'Content' }),
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
