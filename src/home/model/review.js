/**
 * Created by fuyazhou on 17/8/1.
 */
'use strict'

export default class extends think.model.base {
	init(...args) {
		super.init(...args)
		this.tableName = 'review'
	}
	
	async addReview(review) {
		let res = await this.add({
			authorId: review.userId,
			authorName: review.authorName,
			authorAvatar: review.avatar,
			stars: review.stars,
			time: ['exp', 'CURRENT_TIMESTAMP()'],
			position: review.position,
			content: review.content,
			facilityId: review.facilityId
		})
		return res
	}
	
	async getReview(facilityId, page, count) {
		let res = this.where({facilityId: facilityId}).page(page, count).countSelect()
		return res
	}
}