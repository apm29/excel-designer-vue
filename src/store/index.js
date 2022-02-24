import { defineStore } from 'pinia'
import { getToken, setToken } from '@/local-storage'
import { AdminTypes } from '@/api/auth'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useCounterStore = defineStore('counter', {
	// other options...
	state: () => {
		return {
			// all these properties will have their type inferred automatically
			counter: 0,
		}
	},
	getters: {
		doubleCount: (state) => state.counter * 2,
	},
	actions: {
		increment() {
			this.counter++
		},
		randomizeCounter() {
			this.counter = Math.round(100 * Math.random())
		},
	},
})

export const useSessionStore = defineStore('session', {
	state: () => {
		return {
			token: getToken(),
			adminInfo: null,
			menu: null
		}
	},
	getters: {
		isSuperAdmin() {
			return this.adminInfo?.typeId === AdminTypes.SUPER_ADMIN
		},
		isCommunityAdmin() {
			return this.adminInfo?.typeId === AdminTypes.COMMUNITY_ADMIN
		},
		isDistrictAdmin() {
			return this.adminInfo?.typeId === AdminTypes.DISTRICT_ADMIN
		},
		communityId() {
			return this.adminInfo?.communityId
		},
		districtId() {
			return this.adminInfo?.districtId
		}
	},
	actions: {
		handleLogin(adminInfo, token) {
			this.adminInfo = adminInfo
			if (token) {
				this.token = token
				setToken(token)
			}
		},
		handleLogout() {
			this.adminInfo = null
			this.menu = null
			this.token = null
			setToken(null)
		}
	},
})

//社区/小区store
export const useDistrictStore = defineStore('dsitrict', {
	state: () => {
		return {
			communityDict: [],
			districtDict: [],
		}
	},
})