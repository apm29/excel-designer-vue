import remote from '@/remote'

export function adminLogin({
	adminName, adminPassword, uuid, captcha
}) {
	return remote.postForm({
		url: "/permission/admin/login",
		data: {
			adminName, adminPassword, uuid, captcha
		}
	})
}

export function getAdminUserInfo() {
	return remote.postForm({
		url: "/permission/admin/getAdminByToken",
		showErrorMessage: false
	})
}

export function getAdminMenuInfo({ adminId }) {
	return remote.postForm({
		url: "/permission/admin/getAdminInfo",
		showErrorMessage: false,
		data: { adminId }
	})
}

export const AdminTypes = {
	SUPER_ADMIN: 1,
	COMMUNITY_ADMIN: 2,
	DISTRICT_ADMIN: 3,
}

export const AdminTypesDict = {
	[AdminTypes.SUPER_ADMIN]: "超级管理员",
	[AdminTypes.COMMUNITY_ADMIN]: "社区管理员",
	[AdminTypes.DISTRICT_ADMIN]: "小区管理员"
}
