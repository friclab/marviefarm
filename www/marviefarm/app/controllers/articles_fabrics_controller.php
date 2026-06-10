<?php
class ArticlesFabricsController extends AppController {

	var $name = 'ArticlesFabrics';

	function index() {
		$this->ArticlesFabric->recursive = 0;
		$this->set('articlesFabrics', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid articles fabric', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('articlesFabric', $this->ArticlesFabric->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->ArticlesFabric->create();
			if ($this->ArticlesFabric->save($this->data)) {
				$this->Session->setFlash(__('The articles fabric has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The articles fabric could not be saved. Please, try again.', true));
			}
		}
		$fabrics = $this->ArticlesFabric->Fabric->find('list');
		$articles = $this->ArticlesFabric->Article->find('list');
		$this->set(compact('fabrics', 'articles'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid articles fabric', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->ArticlesFabric->save($this->data)) {
				$this->Session->setFlash(__('The articles fabric has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The articles fabric could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->ArticlesFabric->read(null, $id);
		}
		$fabrics = $this->ArticlesFabric->Fabric->find('list');
		$articles = $this->ArticlesFabric->Article->find('list');
		$this->set(compact('fabrics', 'articles'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for articles fabric', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->ArticlesFabric->delete($id)) {
			$this->Session->setFlash(__('Articles fabric deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Articles fabric was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
?>