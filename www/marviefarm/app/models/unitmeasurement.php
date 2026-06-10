<?php
class Unitmeasurement extends AppModel {
	var $name = 'Unitmeasurement';
	//var $displayField = 'code';
	//The Associations below have been created with all possible keys, those that are not needed can be removed
	var $displayField = "full_name";
	var $actsAs = array('MultipleDisplayFields' => array(
        'fields' => array('code', 'description'),
        'pattern' => '%s - %s'));
	

	var $hasMany = array(
		'Material' => array(
			'className' => 'Material',
			'foreignKey' => 'unitmeasurement_id',
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