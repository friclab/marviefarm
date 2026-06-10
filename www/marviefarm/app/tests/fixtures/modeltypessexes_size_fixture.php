<?php
/* ModeltypessexesSize Fixture generated on: 2011-02-10 00:22:01 : 1297293721 */
class ModeltypessexesSizeFixture extends CakeTestFixture {
	var $name = 'ModeltypessexesSize';

	var $fields = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary'),
		'modeltypessex_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'size_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'index'),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1), 'fk1' => array('column' => 'modeltypessex_id', 'unique' => 0), 'fk3' => array('column' => 'size_id', 'unique' => 0)),
		'tableParameters' => array('charset' => 'latin1', 'collate' => 'latin1_swedish_ci', 'engine' => 'InnoDB')
	);

	var $records = array(
		array(
			'id' => 1,
			'modeltypessex_id' => 1,
			'size_id' => 1
		),
	);
}
?>