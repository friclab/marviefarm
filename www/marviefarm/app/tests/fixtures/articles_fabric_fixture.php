<?php
/* ArticlesFabric Fixture generated on: 2011-02-10 00:10:47 : 1297293047 */
class ArticlesFabricFixture extends CakeTestFixture {
	var $name = 'ArticlesFabric';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary'),
		'fabric_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'article_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'price' => array('type' => 'float', 'null' => true, 'default' => NULL, 'length' => '10,2'),
		'cost' => array('type' => 'float', 'null' => true, 'default' => NULL, 'length' => '10,2'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1), 'fk_mod_comp_comp' => array('column' => 'fabric_id', 'unique' => 0), 'fk_mod_comp_mod' => array('column' => 'article_id', 'unique' => 0)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);

	var $records = array(
		array(
			'id' => 1,
			'fabric_id' => 1,
			'article_id' => 1,
			'price' => 1,
			'cost' => 1
		),
	);
}
?>