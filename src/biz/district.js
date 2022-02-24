import { useDistrictStore } from "@/store"
import { getPagedCommunity, getAllDistrict } from "@/api/district"
export function useDistrict(refresh) {
	const districtStore = useDistrictStore()
	const refreshCommunity = async function () {
		const res = await getPagedCommunity({
			page: 1, rows: 1000
		})
		districtStore.communityDict = res.data?.rows ?? []
	}
	const refreshDistrict = async function () {
		const res = await getAllDistrict()
		districtStore.districtDict = res.data ?? []
	}
	if (!districtStore.communityDict || !districtStore.communityDict.length || refresh) {
		console.log("重新加载社区字典");
		refreshCommunity()
	}
	if (!districtStore.districtDict || !districtStore.districtDict.length || refresh) {
		console.log("重新加载小区字典");
		refreshDistrict()
	}
	return districtStore
}