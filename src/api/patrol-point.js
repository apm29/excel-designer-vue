import remote from "@/remote";

export function getPatrolPoints({ district_id }) {
	return remote.postForm({
		url: "/Php/Home/Patrol/nightWatchPointSearch",
		data: { district_id }
	})
}

export function editPatrolPoint({
	watchpoint_id,
	district_id,
	longitude,
	latitude,
	nfc_code,
	title,
	description,
}) {
	return remote.postForm({
		url: "/Php/Home/Patrol/nightWatchPointEdit",
		data: {
			watchpoint_id,
			district_id,
			longitude,
			latitude,
			nfc_code,
			title,
			description,
		}
	})
}
export function addPatrolPoint({
	district_id,
	longitude,
	latitude,
	nfc_code,
	title,
	description,
}) {
	return remote.postForm({
		url: "/Php/Home/Patrol/nightWatchPointAdd",
		data: {
			district_id,
			longitude,
			latitude,
			nfc_code,
			title,
			description,
		}
	})
}

export function deletePatrolPoint({
	watchpoint_id,
}) {
	return remote.postForm({
		url: "/Php/Home/Patrol/nightWatchPointDelete",
		data: {
			watchpoint_id,
		}
	})
}