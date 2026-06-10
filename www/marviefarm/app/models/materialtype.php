<?php
class Materialtype extends AppModel {
	var $name = 'Materialtype';
	//var $displayField = 'code';
	//The Associations below have been created with all possible keys, those that are not needed can be removed
	var $displayField = "full_name";
	var $actsAs = array('MultipleDisplayFields' => array(
        'fields' => array('code', 'description'),
        'pattern' => '%s - %s'));
	
	var $hasAndBelongsToMany = array(
		'Material' => array(
			'className' => 'Material',
			'joinTable' => 'materials_materialtypes',
			'foreignKey' => 'materialtype_id',
			'associationForeignKey' => 'material_id',
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