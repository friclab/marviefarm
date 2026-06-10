<div class="customers form">
<?php echo $this->Form->create('Customer');?>
	<fieldset>
 		<legend><?php __('Add Customer'); ?></legend>
	<?php
		echo $this->Form->input('name');
		echo $this->Form->input('surname');
		echo $this->Form->input('company');
		echo $this->Form->input('vat');
		echo $this->Form->input('fiscal_code');
		echo $this->Form->input('email');
		echo $this->Form->input('phone1');
		echo $this->Form->input('phone2');
		echo $this->Form->input('fax');
		echo $this->Form->input('mobile');
		echo $this->Form->input('address');
		echo $this->Form->input('zip_code');
		echo $this->Form->input('city');
		echo $this->Form->input('district');
		echo $this->Form->input('country');
		echo $this->Form->input('vat_applied',array( 'value'=>0));
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('List Customers', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Orderheaders', true), array('controller' => 'orderheaders', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Orderheader', true), array('controller' => 'orderheaders', 'action' => 'add')); ?> </li>
	</ul>
</div>