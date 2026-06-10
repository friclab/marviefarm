<?php
/* Article Fixture generated on: 2011-02-10 00:09:57 : 1297292997 */
class ArticleFixture extends CakeTestFixture {
	var $name = 'Article';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary'),
		'name' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 50, 'collate' => 'latin1_swedish_ci', 'charset' => 'latin1'),
		'description' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 512, 'collate' => 'latin1_swedish_ci', 'charset' => 'latin1'),
		'modeltypes_sex_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'image' => array('type' => 'binary', 'null' => true, 'default' => NULL),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1), 'fk_mod_mod_tipo' => array('column' => 'modeltypes_sex_id', 'unique' => 0)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);

	var $records = array(
		array(
			'id' => 1,
			'name' => 'Lorem ipsum dolor sit amet',
			'description' => 'Lorem ipsum dolor sit amet',
			'modeltypes_sex_id' => 1,
			'image' => 'Lorem ipsum dolor sit amet'
		),
	);
}
?>