<?php
class Material extends AppModel {
	var $name = 'Material';
	var $displayField = 'code';
	//The Associations below have been created with all possible keys, those that are not needed can be removed

	var $belongsTo = array(
		'Supplier' => array(
			'className' => 'Supplier',
			'foreignKey' => 'supplier_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Unitmeasurement' => array(
			'className' => 'Unitmeasurement',
			'foreignKey' => 'unitmeasurement_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);

	var $hasAndBelongsToMany = array(
		'Dynamiccomposition' => array(
			'className' => 'Dynamiccomposition',
			'joinTable' => 'dynamiccompositions_materials',
			'foreignKey' => 'material_id',
			'associationForeignKey' => 'dynamiccomposition_id',
			'unique' => true,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'finderQuery' => '',
			'deleteQuery' => '',
			'insertQuery' => ''
		),
		'Fixedcomposition' => array(
			'className' => 'Fixedcomposition',
			'joinTable' => 'fixedcompositions_materials',
			'foreignKey' => 'material_id',
			'associationForeignKey' => 'fixedcomposition_id',
			'unique' => true,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'finderQuery' => '',
			'deleteQuery' => '',
			'insertQuery' => ''
		),
		'Materialtype' => array(
			'className' => 'Materialtype',
			'joinTable' => 'materials_materialtypes',
			'foreignKey' => 'material_id',
			'associationForeignKey' => 'materialtype_id',
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

}
?>