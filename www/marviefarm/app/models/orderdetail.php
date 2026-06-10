<?php
class Orderdetail extends AppModel {
	var $name = 'Orderdetail';
	var $displayField = 'id';
	//The Associations below have been created with all possible keys, those that are not needed can be removed
 
	
	var $belongsTo = array(
		'Orderheader' => array(
			'className' => 'Orderheader',
			'foreignKey' => 'orderheader_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Article' => array(
			'className' => 'Article',
			'foreignKey' => 'article_id',
			'conditions' => '',
			'fields' => '',
			'order' => 'Article.name'
		),
		'Fabric' => array(
			'className' => 'Fabric',
			'foreignKey' => 'fabric_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'ModeltypessexesSize' => array(
			'className' => 'ModeltypessexesSize',
			'foreignKey' => 'modeltypessexessize_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);
}
?>