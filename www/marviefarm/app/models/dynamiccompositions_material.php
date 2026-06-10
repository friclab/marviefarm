<?php
class DynamiccompositionsMaterial extends AppModel {
	var $name = 'DynamiccompositionsMaterial';
	var $displayField = 'id';
	//The Associations below have been created with all possible keys, those that are not needed can be removed

	var $belongsTo = array(
		'Material' => array(
			'className' => 'Material',
			'foreignKey' => 'material_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Dynamiccomposition' => array(
			'className' => 'Dynamiccomposition',
			'foreignKey' => 'dynamiccomposition_id',
			'conditions' => '',
			'fields' => '',
			'order' => 'Dynamiccomposition.code'
		)
	);
}
?>