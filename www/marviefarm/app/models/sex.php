<?php
class Sex extends AppModel {
	var $name = 'Sex';
	var $displayField = 'code';
	//The Associations below have been created with all possible keys, those that are not needed can be removed

	var $hasAndBelongsToMany = array(
		'Modeltype' => array(
			'className' => 'Modeltype',
			'joinTable' => 'modeltypes_sexes',
			'foreignKey' => 'sex_id',
			'associationForeignKey' => 'modeltype_id',
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