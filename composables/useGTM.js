import { useGtm } from "@gtm-support/vue-gtm";

export function analyticsTrackPage(newRoute = "") {
	const gtm = useGtm();
	const route = useRoute();
	const trackRoute = newRoute === "" ? route : newRoute;
	gtm.trackView(route.name, trackRoute);

	return;
}
