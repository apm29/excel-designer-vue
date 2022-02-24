import remote from '@/remote'

export function getPagedMapPoints({ page, rows, typeId, name }) {
	return remote.postForm({
		url: "/business/ConvenientMap/getPiontByType",
		data: {
			page, rows, typeId, name
		}
	})
}

export function getAllMapTypes() {
	return remote.postForm({
		url: "/business/ConvenientMap/getAllType",
	})
}


export function saveMapPoint({ id, name, addr, lng, lat, time, phone, type }) {
	return remote.postForm({
		url: "/business/ConvenientMap/savePiont",
		data: {
			id, name, addr, lng, lat, time, phone, type
		},
		showSuccessMessage: true
	})
}

export function deleteMapPoint({ id }) {
	return remote.postForm({
		url: "/business/ConvenientMap/deleteOnePiont",
		data: {
			id
		},
		showSuccessMessage: true
	})
}
