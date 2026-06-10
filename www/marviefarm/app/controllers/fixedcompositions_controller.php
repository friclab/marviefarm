<?php
class FixedcompositionsController extends AppController {

	var $name = 'Fixedcompositions';

	function index() {
		$this->Fixedcomposition->recursive = 0;
		$this->set('fixedcompositions', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid fixedcomposition', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->Fixedcomposition->recursive = 2;
		$this->set('fixedcomposition', $this->Fixedcomposition->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Fixedcomposition->create();
			if ($this->Fixedcomposition->save($this->data)) {
				$this->Session->setFlash(__('The fixedcomposition has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The fixedcomposition could not be saved. Please, try again.', true));
			}
		}
		$materials = $this->Fixedcomposition->Material->find('list');
		$this->set(compact('materials'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid fixedcomposition', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->Fixedcomposition->save($this->data)) {
				$this->Session->setFlash(__('The fixedcomposition has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The fixedcomposition could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Fixedcomposition->read(null, $id);
		}
		$materials = $this->Fixedcomposition->Material->find('list');
		$this->set(compact('materials'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for fixedcomposition', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Fixedcomposition->delete($id)) {
			$this->Session->setFlash(__('Fixedcomposition deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Fixedcomposition was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
?>