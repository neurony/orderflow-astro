import { makeGenericAPIRouteHandler } from '@keystatic/core/api/generic';
import { parseString } from 'set-cookie-parser';
import { config as config$1, singleton, fields, collection } from '@keystatic/core';

function makeHandler(_config) {
  return async function keystaticAPIRoute(context) {
    var _context$locals, _ref, _config$clientId, _ref2, _config$clientSecret, _ref3, _config$secret;
    const envVarsForCf = (_context$locals = context.locals) === null || _context$locals === void 0 || (_context$locals = _context$locals.runtime) === null || _context$locals === void 0 ? void 0 : _context$locals.env;
    const handler = makeGenericAPIRouteHandler({
      ..._config,
      clientId: (_ref = (_config$clientId = _config.clientId) !== null && _config$clientId !== void 0 ? _config$clientId : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_ID) !== null && _ref !== void 0 ? _ref : tryOrUndefined(() => {
        return undefined                                          ;
      }),
      clientSecret: (_ref2 = (_config$clientSecret = _config.clientSecret) !== null && _config$clientSecret !== void 0 ? _config$clientSecret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_GITHUB_CLIENT_SECRET) !== null && _ref2 !== void 0 ? _ref2 : tryOrUndefined(() => {
        return undefined                                              ;
      }),
      secret: (_ref3 = (_config$secret = _config.secret) !== null && _config$secret !== void 0 ? _config$secret : envVarsForCf === null || envVarsForCf === void 0 ? void 0 : envVarsForCf.KEYSTATIC_SECRET) !== null && _ref3 !== void 0 ? _ref3 : tryOrUndefined(() => {
        return undefined                                ;
      })
    }, {
      slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"
    });
    const {
      body,
      headers,
      status
    } = await handler(context.request);
    let headersInADifferentStructure = /* @__PURE__ */ new Map();
    if (headers) {
      if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
          if (!headersInADifferentStructure.has(key.toLowerCase())) {
            headersInADifferentStructure.set(key.toLowerCase(), []);
          }
          headersInADifferentStructure.get(key.toLowerCase()).push(value);
        }
      } else if (typeof headers.entries === "function") {
        for (const [key, value] of headers.entries()) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
        if ("getSetCookie" in headers && typeof headers.getSetCookie === "function") {
          const setCookieHeaders2 = headers.getSetCookie();
          if (setCookieHeaders2 !== null && setCookieHeaders2 !== void 0 && setCookieHeaders2.length) {
            headersInADifferentStructure.set("set-cookie", setCookieHeaders2);
          }
        }
      } else {
        for (const [key, value] of Object.entries(headers)) {
          headersInADifferentStructure.set(key.toLowerCase(), [value]);
        }
      }
    }
    const setCookieHeaders = headersInADifferentStructure.get("set-cookie");
    headersInADifferentStructure.delete("set-cookie");
    if (setCookieHeaders) {
      for (const setCookieValue of setCookieHeaders) {
        var _options$sameSite;
        const {
          name,
          value,
          ...options
        } = parseString(setCookieValue);
        const sameSite = (_options$sameSite = options.sameSite) === null || _options$sameSite === void 0 ? void 0 : _options$sameSite.toLowerCase();
        context.cookies.set(name, value, {
          domain: options.domain,
          expires: options.expires,
          httpOnly: options.httpOnly,
          maxAge: options.maxAge,
          path: options.path,
          sameSite: sameSite === "lax" || sameSite === "strict" || sameSite === "none" ? sameSite : void 0
        });
      }
    }
    return new Response(body, {
      status,
      headers: [...headersInADifferentStructure.entries()].flatMap(([key, val]) => val.map((x) => [key, x]))
    });
  };
}
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}

const config = config$1({
  storage: { kind: "local" },
  collections: {
    articles: collection({
      label: "Articles",
      slugField: "title",
      path: "src/content/articles/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Meta Description", multiline: true }),
        date: fields.date({ label: "Publish Date" }),
        category: fields.text({ label: "Category" }),
        image: fields.image({
          label: "Featured Image",
          directory: "public/images/articles",
          publicPath: "/images/articles/"
        }),
        heroImage: fields.image({
          label: "Hero Image (16:9)",
          directory: "public/images/articles",
          publicPath: "/images/articles/"
        }),
        author: fields.object({
          name: fields.text({ label: "Author Name" }),
          role: fields.text({ label: "Author Role" }),
          avatar: fields.image({
            label: "Avatar",
            directory: "public/images/authors",
            publicPath: "/images/authors/"
          })
        }),
        seoTitle: fields.text({ label: "SEO Title (50-60 chars)" }),
        seoDescription: fields.text({ label: "SEO Meta Description (140-155 chars)", multiline: true }),
        canonicalUrl: fields.text({ label: "Canonical URL" }),
        updatedDate: fields.date({ label: "Updated Date" }),
        funnel: fields.select({
          label: "Funnel Stage",
          options: [
            { label: "Top of Funnel", value: "TOFU" },
            { label: "Middle of Funnel", value: "MOFU" },
            { label: "Bottom of Funnel", value: "BOFU" }
          ],
          defaultValue: "TOFU"
        }),
        primaryKeyword: fields.text({ label: "Primary Keyword" }),
        schemaType: fields.select({
          label: "Schema Type",
          options: [
            { label: "Article", value: "Article" },
            { label: "FAQ Page", value: "FAQPage" }
          ],
          defaultValue: "Article"
        }),
        contentType: fields.select({
          label: "Content Type",
          options: [
            { label: "Blog", value: "blog" },
            { label: "Pillar", value: "pillar" },
            { label: "Educational", value: "educational" }
          ],
          defaultValue: "blog"
        }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true })
          }),
          {
            label: "FAQ Items",
            itemLabel: (props) => props.fields.question.value || "FAQ Item"
          }
        ),
        content: fields.markdoc({ label: "Content" })
      }
    }),
    testimonials: collection({
      label: "Testimonials",
      slugField: "name",
      path: "src/content/testimonials/*",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        role: fields.text({ label: "Role" }),
        company: fields.text({ label: "Company" }),
        quote: fields.text({ label: "Quote", multiline: true }),
        avatar: fields.image({
          label: "Avatar",
          directory: "public/images/testimonials",
          publicPath: "/images/testimonials/"
        })
      }
    }),
    pages: collection({
      label: "Pages",
      slugField: "title",
      path: "src/content/pages/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        seoTitle: fields.text({ label: "SEO Title (50-60 chars)" }),
        seoDescription: fields.text({ label: "SEO Meta Description (140-155 chars)", multiline: true }),
        canonicalUrl: fields.text({ label: "Canonical URL" }),
        ogImage: fields.image({
          label: "OG Image",
          directory: "public/images/pages",
          publicPath: "/images/pages/"
        }),
        heroImage: fields.image({
          label: "Hero Image (16:9)",
          directory: "public/images/pages",
          publicPath: "/images/pages/"
        }),
        ogType: fields.select({
          label: "OG Type",
          options: [
            { label: "Website", value: "website" },
            { label: "Article", value: "article" }
          ],
          defaultValue: "website"
        }),
        noindex: fields.checkbox({ label: "No Index", defaultValue: false }),
        schemaType: fields.select({
          label: "Schema Type",
          options: [
            { label: "Software Application", value: "SoftwareApplication" },
            { label: "Article", value: "Article" },
            { label: "FAQ Page", value: "FAQPage" }
          ],
          defaultValue: "SoftwareApplication"
        }),
        pubDate: fields.date({ label: "Publish Date" }),
        updatedDate: fields.date({ label: "Updated Date" }),
        funnel: fields.select({
          label: "Funnel Stage",
          options: [
            { label: "Top of Funnel", value: "TOFU" },
            { label: "Middle of Funnel", value: "MOFU" },
            { label: "Bottom of Funnel", value: "BOFU" }
          ],
          defaultValue: "TOFU"
        }),
        primaryKeyword: fields.text({ label: "Primary Keyword" }),
        author: fields.text({ label: "Author", defaultValue: "OrderFlow Team" }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true })
          }),
          {
            label: "FAQ Items",
            itemLabel: (props) => props.fields.question.value || "FAQ Item"
          }
        ),
        content: fields.markdoc({ label: "Content" })
      }
    }),
    caseStudies: collection({
      label: "Case Studies",
      slugField: "title",
      path: "src/content/case-studies/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        seoTitle: fields.text({ label: "SEO Title (50-60 chars)" }),
        seoDescription: fields.text({ label: "SEO Meta Description (140-155 chars)", multiline: true }),
        canonicalUrl: fields.text({ label: "Canonical URL" }),
        ogImage: fields.image({
          label: "OG Image",
          directory: "public/images/case-studies",
          publicPath: "/images/case-studies/"
        }),
        heroImage: fields.image({
          label: "Hero Image (16:9)",
          directory: "public/images/case-studies",
          publicPath: "/images/case-studies/"
        }),
        pubDate: fields.date({ label: "Publish Date" }),
        updatedDate: fields.date({ label: "Updated Date" }),
        clientName: fields.text({ label: "Client Name" }),
        clientRole: fields.text({ label: "Client Role" }),
        clientCompany: fields.text({ label: "Client Company" }),
        industry: fields.text({ label: "Industry" }),
        stats: fields.array(
          fields.object({
            label: fields.text({ label: "Stat Label" }),
            value: fields.text({ label: "Stat Value" })
          }),
          {
            label: "Key Stats",
            itemLabel: (props) => props.fields.label.value || "Stat"
          }
        ),
        funnel: fields.select({
          label: "Funnel Stage",
          options: [
            { label: "Top of Funnel", value: "TOFU" },
            { label: "Middle of Funnel", value: "MOFU" },
            { label: "Bottom of Funnel", value: "BOFU" }
          ],
          defaultValue: "BOFU"
        }),
        primaryKeyword: fields.text({ label: "Primary Keyword" }),
        author: fields.text({ label: "Author", defaultValue: "OrderFlow Team" }),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: "Question" }),
            answer: fields.text({ label: "Answer", multiline: true })
          }),
          {
            label: "FAQ Items",
            itemLabel: (props) => props.fields.question.value || "FAQ Item"
          }
        ),
        content: fields.markdoc({ label: "Content" })
      }
    })
  },
  singletons: {
    siteSettings: singleton({
      label: "Site Settings",
      path: "src/content/site-settings",
      schema: {
        siteTitle: fields.text({ label: "Site Title", defaultValue: "Orderflow" }),
        siteDescription: fields.text({ label: "Site Description", multiline: true }),
        ogImage: fields.image({
          label: "Default OG Image",
          directory: "public/images",
          publicPath: "/images/"
        }),
        gtmId: fields.text({ label: "Google Tag Manager ID" }),
        ga4Id: fields.text({ label: "GA4 Measurement ID" })
      }
    }),
    homepage: singleton({
      label: "Homepage",
      path: "src/content/homepage",
      schema: {
        heroTitle: fields.text({ label: "Hero Title" }),
        heroSubtitle: fields.text({ label: "Hero Subtitle" }),
        heroCtaText: fields.text({ label: "Hero CTA Text" }),
        heroCtaUrl: fields.text({ label: "Hero CTA URL" }),
        performanceTitle: fields.text({ label: "Performance Section Title" }),
        performanceDescription: fields.text({
          label: "Performance Description",
          multiline: true
        }),
        testimonialTitle: fields.text({ label: "Testimonial Section Title" }),
        ctaTitle: fields.text({ label: "CTA Title" }),
        ctaSubtitle: fields.text({ label: "CTA Subtitle" })
      }
    })
  }
});

const all = makeHandler({ config });
const ALL = all;

const prerender = false;

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ALL,
  all,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
