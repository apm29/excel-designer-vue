export const LOGIN_PATH = "/login"
export const WEB_LINK_PATH = "/web/link"

export const IMAGE_BASE_URL =
	process.env.NODE_ENV === "development"
		? "http://axj.ciih.net"
		: `${window.location.protocol}//${window.location.host}`;

