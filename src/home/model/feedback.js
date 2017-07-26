/**
 * Created by fuyazhou on 17/7/24.
 */

'use strict'

export default class extends think.model.base {
	init(...args) {
		super.init(...args)
		this.tableName = 'feedback'
	}
	
	async storeFeedback(feedback) {
		let res = await this.add({
			type: feedback.type,
			content: feedback.content,
			contact: feedback.contact,
			userId: feedback.userId,
			nickname: feedback.nickname,
			phoneNumber: feedback.phoneNumber
		})
		
		return think.isEmpty(res) ? false : true
	}
}