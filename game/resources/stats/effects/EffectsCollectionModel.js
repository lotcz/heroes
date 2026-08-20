import ModelNodeCollection from "wgge/core/model/collection/ModelNodeCollection";

export default class EffectsCollectionModel extends ModelNodeCollection {

	constructor(persistent = true) {
		super(persistent);

		this.statChangedHandler = () => this.triggerEvent('stat-change');

		this.addEventListener(
			'add',
			(effect) => effect.amount.addEventListener('change', this.statChangedHandler)
		);

		this.addEventListener(
			'remove',
			(effect) => effect.amount.removeEventListener('change', this.statChangedHandler)
		);
	}

}
