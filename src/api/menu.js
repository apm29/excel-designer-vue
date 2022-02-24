import remote from '@/remote'

export function getAllMenu({ page, rows }) {
	return remote.postForm({
		url: "/permission/menu/getAllMenu",
		data: {
			page, rows
		}
	})
}

export function saveMenu({ id, name, url, pid, sort }) {
	return remote.postForm({
		url: "/permission/menu/saveMenu",
		data: {
			id, name, url, pid, sort
		},
		showSuccessMessage: true
	})
}

export function deleteMenu({ id }) {
	return remote.postForm({
		url: "/permission/menu/deleteMenu",
		data: {
			id
		},
		showSuccessMessage: true
	})
}