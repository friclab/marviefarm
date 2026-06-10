<?php
class ArticlesFabric extends AppModel {
	var $name = 'ArticlesFabric';
	var $displayField = 'id';
	//The Associations below have been created with all possible keys, those that are not needed can be removed

	var $belongsTo = array(
		'Fabric' => array(
			'className' => 'Fabric',
			'foreignKey' => 'fabric_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		),
		'Article' => array(
			'className' => 'Article',
			'foreignKey' => 'article_id',
			'conditions' => '',
			'fields' => '',
			'order' => ''
		)
	);
}
?>