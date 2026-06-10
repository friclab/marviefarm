<?php
class Size extends AppModel {
	var $name = 'Size';
	var $displayField = 'code';
	var $order = "code";
	//The Associations below have been created with all possible keys, those that are not needed can be removed

	var $hasAndBelongsToMany = array(
		'ModeltypesSex' => array(
			'className' => 'ModeltypesSex',
			'joinTable' => 'modeltypessexes_sizes',
			'foreignKey' => 'size_id',
			'associationForeignKey' => 'modeltypessex_id',
			'unique' => true,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'finderQuery' => '',
			'deleteQuery' => '',
			'insertQuery' => ''
		)
	);
	
	var $hasMany = array(
		'ModeltypessexesSize' => array(
			'className' => 'ModeltypessexesSize',
			'foreignKey' => 'size_id',
			'dependent' => false,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'exclusive' => '',
			'finderQuery' => '',
			'counterQuery' => ''
		)
	);

}
?>