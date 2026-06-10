<div class="orderheaders form">
<?php echo $this->Form->create('Orderheader');?>
	<fieldset>
 		<legend><?php __('Add Orderheader'); ?></legend>
	<?php
		echo $this->Form->input('order_number', array( 'readonly' => 'readonly',  'value'=>$next_id));
		echo $this->Form->input('description');
		echo $this->Form->input('customer_id');
		echo $this->Form->input('collection_id');
		echo $this->Form->input('date');
		echo $this->Form->input('discount',array( 'value'=>0));
		echo $this->Form->input('note', array('type' => 'textarea'));
		echo $this->Form->input('payment', array('type' => 'textarea'));
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('List Orderheaders', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Customers', true), array('controller' => 'customers', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Customer', true), array('controller' => 'customers', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Collections', true), array('controller' => 'collections', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Collection', true), array('controller' => 'collections', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Orderdetails', true), array('controller' => 'orderdetails', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Orderdetail', true), array('controller' => 'orderdetails', 'action' => 'add')); ?> </li>
	</ul>
</div>