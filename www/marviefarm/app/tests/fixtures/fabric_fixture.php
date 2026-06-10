<?php
/* Fabric Fixture generated on: 2011-02-10 00:16:07 : 1297293367 */
class FabricFixture extends CakeTestFixture {
	var $name = 'Fabric';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary'),
		'code' => array('type' => 'string', 'null' => false, 'default' => NULL, 'length' => 5, 'collate' => 'latin1_swedish_ci', 'charset' => 'latin1'),
		'description' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 256, 'collate' => 'latin1_swedish_ci', 'charset' => 'latin1'),
		'fixedcomposition_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'dynamiccomposition_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1), 'qwrqwr' => array('column' => 'fixedcomposition_id', 'unique' => 0), 'hedsdfh' => array('column' => 'dynamiccomposition_id', 'unique' => 0)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);

	var $records = array(
		array(
			'id' => 1,
			'code' => 'Lor',
			'description' => 'Lorem ipsum dolor sit amet',
			'fixedcomposition_id' => 1,
			'dynamiccomposition_id' => 1
		),
	);
}
?>