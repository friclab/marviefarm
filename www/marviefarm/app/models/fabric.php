<?php
class Fabric extends AppModel {
	var $name = 'Fabric';
	//var $displayField = 'code';
	//The Associations below have been created with all possible keys, those that are not needed can be removed
	var $displayField = "full_name";
	var $actsAs = array('MultipleDisplayFields' => array(
        'fields' => array('code', 'description'),
        'pattern' => '%s - %s'));

	var $belongsTo = array(
		'Fixedcomposition' => array(
			'className' => 'Fixedcomposition',
			'foreignKey' => 'fixedcomposition_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
			),
		'Dynamiccomposition' => array(
			'className' => 'Dynamiccomposition',
			'foreignKey' => 'dynamiccomposition_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
			),
			'Article' => array(
			'className' => 'Article',
			'foreignKey' => 'article_id',
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

			var $hasMany = array(
		'Orderdetail' => array(
			'className' => 'Orderdetail',
			'foreignKey' => 'fabric_id',
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


	/* var $hasAndBelongsToMany = array(
		'Article' => array(
			'className' => 'Article',
			'joinTable' => 'articles_fabrics',
			'foreignKey' => 'fabric_id',
			'associationForeignKey' => 'article_id',
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
			); */

}
?>