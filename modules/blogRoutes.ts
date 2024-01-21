import { createResolver, defineNuxtModule, extendRouteRules, extendPages } from "@nuxt/kit";

export default defineNuxtModule({
	meta: {
		name: "my-module",
		configKey: "myModule",
	},
	defaults: {
		test: 123,
	},
	/* setup (options, nuxt) {
		nuxt.hook('pages:extend', () => {
		  console.log('My module is ready with current test option: ', options.test)
		})
	  } */
	setup(options) {
		const resolver = createResolver(import.meta.url);

		extendPages((pages) => {
			console.log(pages);
			/* pages.unshift({
			name: 'preview-new',
			path: '/preview-new',
			file: resolver.resolve('runtime/preview.vue')
		   }) */
		});

		/* extendRouteRules('/preview', {
		  redirect: {
			to: '/preview-new',
			statusCode: 302
		  }
		})

		extendRouteRules('/preview-new', {
		  cache: {
			maxAge: 60 * 60 * 24 * 7
		  }
		}) */
	},
});
