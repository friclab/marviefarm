<?php
class Dynamiccomposition extends AppModel {
	var $name = 'Dynamiccomposition';
	//var $displayField = 'code';
	//The Associations below have been created with all possible keys, those that are not needed can be removed
	var $displayField = "full_name";
	var $actsAs = array('MultipleDisplayFields' => array(
        'fields' => array('code', 'description'),
        'pattern' => '%s - %s'
        ));
        var $hasMany = array(
		'Fabric' => array(
			'className' => 'Fabric',
			'foreignKey' => 'dynamiccomposition_id',
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
		'Material' => array(
			'className' => 'Material',
			'joinTable' => 'dynamiccompositions_materials',
			'foreignKey' => 'dynamiccomposition_id',
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