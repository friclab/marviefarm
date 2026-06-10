<?php
class ModeltypesSex extends AppModel {
	var $name = 'ModeltypesSex';
	var $displayField = 'id';
	//The Associations below have been created with all possible keys, those that are not needed can be removed

	var $belongsTo = array(
		'Modeltype' => array(
			'className' => 'Modeltype',
			'foreignKey' => 'modeltype_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Sex' => array(
			'className' => 'Sex',
			'foreignKey' => 'sex_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);

	var $hasMany = array(
		'Article' => array(
			'className' => 'Article',
			'foreignKey' => 'modeltypes_sex_id',
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


	var $hasAndBelongsToMany = array(
		'ModeltypessexesSizze' => array(
			'className' => 'ModeltypessexesSize',
			'joinTable' => 'modeltypessexes_sizes',
			'foreignKey' => 'modeltypessex_id',
			'associationForeignKey' => 'size_id',
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