import remote from "@/remote";

//社区分页
export function getPagedCommunity({
	name, page, rows
}) {
	return remote.postForm({
		url: "/business/community/query",
		data: { name, page, rows }
	})
}
export function getAllDistrict() {
	return remote.postForm({
		url:"/business/district/getAllDistrictInfo"
	})
}