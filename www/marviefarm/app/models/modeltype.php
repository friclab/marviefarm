<?php
class Modeltype extends AppModel {
	var $name = 'Modeltype';
	//var $displayField = 'code';
	//The Associations below have been created with all possible keys, those that are not needed can be removed
	var $displayField = "full_name";
	var $actsAs = array('MultipleDisplayFields' => array(
        'fields' => array('code', 'description'),
        'pattern' => '%s - %s'));
	
	var $hasAndBelongsToMany = array(
		'Sex' => array(
			'className' => 'Sex',
			'joinTable' => 'modeltypes_sexes',
			'foreignKey' => 'modeltype_id',
			'associationForeignKey' => 'sex_id',
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