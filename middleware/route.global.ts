import { analyticsTrackPage } from "@/composables/useGTM";

export default defineNuxtRouteMiddleware((to, from) => {
	/* const gtm = useGtm();
	analyticsTrackPage(to.fullPath);
	console.log($gtm);
	gtm.trackView("", to.fullPath); */
});
