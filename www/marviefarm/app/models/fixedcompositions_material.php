<?php
class FixedcompositionsMaterial extends AppModel {
	var $name = 'FixedcompositionsMaterial';
	var $displayField = 'id';
	//The Associations below have been created with all possible keys, those that are not needed can be removed

	var $belongsTo = array(
		'Fixedcomposition' => array(
			'className' => 'Fixedcomposition',
			'foreignKey' => 'fixedcomposition_id',
			'conditions' => '',
			'fields' => '',
			'order' => 'Fixedcomposition.code'
		),
		'Material' => array(
			'className' => 'Material',
			'foreignKey' => 'material_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);
}
?>