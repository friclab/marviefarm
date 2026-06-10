<?php
class MaterialtypesController extends AppController {

	var $name = 'Materialtypes';

	function index() {
		$this->Materialtype->recursive = 0;
		$this->set('materialtypes', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid materialtype', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('materialtype', $this->Materialtype->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Materialtype->create();
			if ($this->Materialtype->save($this->data)) {
				$this->Session->setFlash(__('The materialtype has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The materialtype could not be saved. Please, try again.', true));
			}
		}
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid materialtype', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->Materialtype->save($this->data)) {
				$this->Session->setFlash(__('The materialtype has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The materialtype could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Materialtype->read(null, $id);
		}
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for materialtype', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Materialtype->delete($id)) {
			$this->Session->setFlash(__('Materialtype deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Materialtype was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
?>