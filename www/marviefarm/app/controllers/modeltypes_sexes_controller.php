<?php
class ModeltypesSexesController extends AppController {

	var $name = 'ModeltypesSexes';

	function index() {
		$this->ModeltypesSex->recursive = 0;
		$this->set('modeltypesSexes', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid modeltypes sex', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('modeltypesSex', $this->ModeltypesSex->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->ModeltypesSex->create();
			if ($this->ModeltypesSex->save($this->data)) {
				$this->Session->setFlash(__('The modeltypes sex has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The modeltypes sex could not be saved. Please, try again.', true));
			}
		}
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid modeltypes sex', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->ModeltypesSex->save($this->data)) {
				$this->Session->setFlash(__('The modeltypes sex has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The modeltypes sex could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->ModeltypesSex->read(null, $id);
		}
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for modeltypes sex', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->ModeltypesSex->delete($id)) {
			$this->Session->setFlash(__('Modeltypes sex deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Modeltypes sex was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
?>