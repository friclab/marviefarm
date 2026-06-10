<?php
class DynamiccompositionsController extends AppController {

	var $name = 'Dynamiccompositions';

	function index() {
		$this->Dynamiccomposition->recursive = 0;
		$this->set('dynamiccompositions', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid dynamiccomposition', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->Dynamiccomposition->recursive = 2;
		$this->set('dynamiccomposition', $this->Dynamiccomposition->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Dynamiccomposition->create();
			if ($this->Dynamiccomposition->save($this->data)) {
				$this->Session->setFlash(__('The dynamiccomposition has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The dynamiccomposition could not be saved. Please, try again.', true));
			}
		}
		$materials = $this->Dynamiccomposition->Material->find('list');
		$this->set(compact('materials'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid dynamiccomposition', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->Dynamiccomposition->save($this->data)) {
				$this->Session->setFlash(__('The dynamiccomposition has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The dynamiccomposition could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Dynamiccomposition->read(null, $id);
		}
		$materials = $this->Dynamiccomposition->Material->find('list');
		$this->set(compact('materials'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for dynamiccomposition', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Dynamiccomposition->delete($id)) {
			$this->Session->setFlash(__('Dynamiccomposition deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Dynamiccomposition was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
?>