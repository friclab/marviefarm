<?php
class ModeltypessexesSize extends AppModel {
	var $name = 'ModeltypessexesSize';
	var $displayField = 'id';
	//The Associations below have been created with all possible keys, those that are not needed can be removed

	var $belongsTo = array(
		'Size' => array(
			'className' => 'Size',
			'foreignKey' => 'size_id',
			'conditions' => '',
			'fields' => '',
			'order' => 'Size.code'
		),
		'ModeltypesSex' => array(
			'className' => 'ModeltypesSex',
			'foreignKey' => 'modeltypessex_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);
	
	
}
?>