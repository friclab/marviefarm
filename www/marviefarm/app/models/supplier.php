<?php
class Supplier extends AppModel {
	var $name = 'Supplier';
	//var $displayField = 'company';
	//The Associations below have been created with all possible keys, those that are not needed can be removed
	var $displayField = "full_name";
	var $actsAs = array('MultipleDisplayFields' => array(
        'fields' => array('company','name', 'surname'),
        'pattern' => '%s - %s %s'
        ));

        var $hasMany = array(
		'Material' => array(
			'className' => 'Material',
			'foreignKey' => 'supplier_id',
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