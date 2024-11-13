import { defineStore } from 'pinia';

interface UserInfo{
	token: string;
}
export const useUserStore = defineStore('user', {
	state: () => {
		const userInfo: UserInfo = JSON.parse(localStorage.getItem('userInfo')) || {token:''};
		return {
			userInfo
		};
	},
	getters: {},
	actions: {
		setUserInfo(data:any) {
			this.userInfo = data;
			localStorage.setItem('userInfo', JSON.stringify(data));
		},
		clearUserInfo() {
			this.userInfo = {};
			localStorage.removeItem('userInfo');
		}
	}
});
