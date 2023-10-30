import { analyticsTrackPage } from "@/composables/useGTM";

export default defineNuxtRouteMiddleware((to, from) => {
	analyticsTrackPage(to.fullPath);
});
