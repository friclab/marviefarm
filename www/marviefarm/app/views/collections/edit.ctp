<div class="collections form">
<?php echo $this->Form->create('Collection');?>
	<fieldset>
 		<legend><?php __('Edit Collection'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('name');
		echo $this->Form->input('description');
		echo $this->Form->input('date');
		echo $this->Form->input('yr');
		echo $this->Form->input('Project');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('Collection.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('Collection.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Collections', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Orderheaders', true), array('controller' => 'orderheaders', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Orderheader', true), array('controller' => 'orderheaders', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Projects', true), array('controller' => 'projects', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Project', true), array('controller' => 'projects', 'action' => 'add')); ?> </li>
	</ul>
</div>