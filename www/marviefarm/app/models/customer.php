<?php
class Customer extends AppModel {
	var $name = 'Customer';
	//var $displayField = 'full_name';
	//The Associations below have been created with all possible keys, those that are not needed can be removed
	var $displayField = "full_name";
    var $actsAs = array('MultipleDisplayFields' => array(
        'fields' => array('company','name', 'surname'),
        'pattern' => '%s - %s %s'
    )); 
    
	var $hasMany = array(
		'Orderheader' => array(
			'className' => 'Orderheader',
			'foreignKey' => 'customer_id',
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