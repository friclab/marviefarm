<?php
/* Modeltypes Test cases generated on: 2011-02-10 00:39:23 : 1297294763*/
App::import('Controller', 'Modeltypes');

class TestModeltypesController extends ModeltypesController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class ModeltypesControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.modeltype', 'app.sex', 'app.modeltypes_sex');

	function startTest() {
		$this->Modeltypes =& new TestModeltypesController();
		$this->Modeltypes->constructClasses();
	}

	function endTest() {
		unset($this->Modeltypes);
		ClassRegistry::flush();
	}

	function testIndex() {

	}

	function testView() {

	}

	function testAdd() {

	}

	function testEdit() {

	}

	function testDelete() {

	}

}
?>